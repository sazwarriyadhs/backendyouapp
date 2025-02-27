export const measurePerformance = (componentName: string) => {

  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    // Report to monitoring service
    if (process.env.NODE_ENV === 'production') {
      console.log(`[Performance] ${componentName}: ${duration}ms`);
      
      // Example: Send to analytics
      if (window.gtag) {
        window.gtag('event', 'performance', {
          event_category: 'Component Render',
          event_label: componentName,
          value: Math.round(duration),
        });
      }
    }
  };
};