export type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 
  'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export const formatDate = (date: string | Date | null): string => {
  if (!date) return '';
  
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) throw new Error('Invalid date');
    
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

export const calculateAge = (birthday: string | null): number | null => {
  if (!birthday) return null;
  
  try {
    const birthDate = new Date(birthday);
    if (isNaN(birthDate.getTime())) throw new Error('Invalid birthday');

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 0 || age > 120) throw new Error('Invalid age range');
    return age;
  } catch (error) {
    console.error('Age calculation error:', error);
    return null;
  }
};

export const getZodiacSign = (birthday: string | null): ZodiacSign | null => {
  if (!birthday) return null;
  
  try {
    const date = new Date(birthday);
    if (isNaN(date.getTime())) throw new Error('Invalid birthday');

    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (day < 1 || day > 31) throw new Error('Invalid day');
    if (month < 1 || month > 12) throw new Error('Invalid month');

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    return 'Pisces';
  } catch (error) {
    console.error('Zodiac calculation error:', error);
    return null;
  }
};

export const isValidDate = (date: string | Date): boolean => {
  try {
    const d = new Date(date);
    return !isNaN(d.getTime());
  } catch {
    return false;
  }
};