import { UserProfile } from '@/types/auth';

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
] as const;

const CHINESE_ZODIAC = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
] as const;

interface ValidationError {
  field: keyof UserProfile;
  message: string;
}

// Helper functions for specific validations
const validateName = (name: string): string | null => {
  const trimmedName = name.trim();
  if (trimmedName.length < 2) return 'Name must be at least 2 characters';
  if (trimmedName.length > 50) return 'Name cannot exceed 50 characters';
  if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) return 'Name can only contain letters, spaces, hyphens and apostrophes';
  return null;
};

const validateAge = (birthday: string): string | null => {
  const birthDate = new Date(birthday);
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
  const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());

  if (isNaN(birthDate.getTime())) return 'Invalid date format';
  if (birthDate < minDate) return 'Age cannot exceed 100 years';
  if (birthDate > maxDate) return 'Must be at least 13 years old';
  return null;
};

const validateMeasurement = (value: number, field: 'height' | 'weight'): string | null => {
  const limits = {
    height: { min: 100, max: 250, unit: 'cm' },
    weight: { min: 30, max: 300, unit: 'kg' }
  };

  const { min, max, unit } = limits[field];
  
  if (!Number.isFinite(value)) return `${field} must be a number`;
  if (value < min) return `${field} must be at least ${min} ${unit}`;
  if (value > max) return `${field} cannot exceed ${max} ${unit}`;
  return null;
};

const validateInterest = (interest: string): boolean => {
  const trimmed = interest.trim();
  return (
    trimmed.length >= 2 &&
    trimmed.length <= 30 &&
    /^[a-zA-Z0-9\s'-]+$/.test(trimmed)
  );
};

const validateInterests = (interests: string[]): string | null => {
  if (interests.length === 0) return 'At least one interest is required';
  if (interests.length > 10) return 'Maximum 10 interests allowed';
  if (!interests.every(validateInterest)) {
    return 'Each interest must be 2-30 characters and contain only letters, numbers, spaces, hyphens and apostrophes';
  }
  return null;
};

export const validateUserProfile = (data: Partial<UserProfile>): ValidationError[] => {
  const errors: ValidationError[] = [];

  // ID validation
  if (data.id !== undefined) {
    if (typeof data.id !== 'string' || data.id.trim().length === 0) {
      errors.push({ field: 'id', message: 'ID is required and must be a string' });
    }
  }

  // Name validation
  if (data.name !== undefined) {
    const nameError = validateName(data.name);
    if (nameError) errors.push({ field: 'name', message: nameError });
  }

  // Gender validation
  if (data.gender !== undefined && data.gender !== null) {
    if (!['male', 'female'].includes(data.gender)) {
      errors.push({ field: 'gender', message: 'Gender must be either male or female' });
    }
  }

  // Birthday validation
  if (data.birthday !== undefined && data.birthday !== null) {
    const birthdayError = validateAge(data.birthday);
    if (birthdayError) errors.push({ field: 'birthday', message: birthdayError });
  }

  // Horoscope validation
  if (data.horoscope !== undefined && data.horoscope !== null) {
    if (!ZODIAC_SIGNS.includes(data.horoscope as any)) {
      errors.push({ field: 'horoscope', message: 'Invalid horoscope sign' });
    }
  }

  // Zodiac validation
  if (data.zodiac !== undefined && data.zodiac !== null) {
    if (!CHINESE_ZODIAC.includes(data.zodiac as any)) {
      errors.push({ field: 'zodiac', message: 'Invalid Chinese zodiac sign' });
    }
  }

  // Height validation
  if (data.height !== undefined && data.height !== null) {
    const heightError = validateMeasurement(data.height, 'height');
    if (heightError) errors.push({ field: 'height', message: heightError });
  }

  // Weight validation
  if (data.weight !== undefined && data.weight !== null) {
    const weightError = validateMeasurement(data.weight, 'weight');
    if (weightError) errors.push({ field: 'weight', message: weightError });
  }

  // Interests validation
  if (data.interests !== undefined) {
    if (!Array.isArray(data.interests)) {
      errors.push({ field: 'interests', message: 'Interests must be an array' });
    } else {
      const interestsError = validateInterests(data.interests);
      if (interestsError) errors.push({ field: 'interests', message: interestsError });
    }
  }

  return errors;
};