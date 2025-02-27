'use client';

import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastOptions {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface Toast extends ToastOptions {
  id: string;
}

interface ToastContextType {
  toast: (options: ToastOptions) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const TOAST_LIMIT = 5;
const DEFAULT_DURATION = 5000;

const toastIcons = {
  success: <CheckCircle className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  warning: <AlertCircle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastTimers = useRef(new Map<string, NodeJS.Timeout>());

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
    if (toastTimers.current.has(id)) {
      clearTimeout(toastTimers.current.get(id));
      toastTimers.current.delete(id);
    }
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
    toastTimers.current.forEach(timer => clearTimeout(timer));
    toastTimers.current.clear();
  }, []);

  const toast = useCallback(({ message, type, duration = DEFAULT_DURATION, action }: ToastOptions) => {
    const id = crypto.randomUUID();
    
    setToasts(prev => {
      const nextToasts = [...prev, { id, message, type, action }];
      return nextToasts.slice(-TOAST_LIMIT);
    });

    if (duration > 0) {
      const timer = setTimeout(() => dismiss(id), duration);
      toastTimers.current.set(id, timer);
    }

    return id;
  }, [dismiss]);

  useEffect(() => {
    return () => {
      toastTimers.current.forEach(timer => clearTimeout(timer));
      toastTimers.current.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md w-full"
        role="region"
        aria-label="Notifications"
      >
        <AnimatePresence mode="sync">
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.4 }}
              className={`flex items-center gap-3 p-4 rounded-lg shadow-lg backdrop-blur-sm ${
                toast.type === 'error' ? 'bg-red-500/90' :
                toast.type === 'success' ? 'bg-green-500/90' :
                toast.type === 'warning' ? 'bg-yellow-500/90' : 'bg-blue-500/90'
              } text-white`}
              role="alert"
              aria-live="polite"
            >
              <span className="shrink-0">{toastIcons[toast.type]}</span>
              <p className="flex-1">{toast.message}</p>
              {toast.action && (
                <button
                  onClick={toast.action.onClick}
                  className="px-3 py-1 text-sm font-medium rounded-md bg-white/20 hover:bg-white/30 transition-colors"
                >
                  {toast.action.label}
                </button>
              )}
              <button
                onClick={() => dismiss(toast.id)}
                className="shrink-0 rounded-full p-1 hover:bg-white/20 transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};