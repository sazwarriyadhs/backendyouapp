/**
 * Represents a user profile in the application
 */
export interface UserProfile {
  /** The user's unique identifier */
  id: string;
  /** The user's display name */
  name: string;
  /** The user's gender */
  gender?: 'male' | 'female';
  /** The user's birthday in ISO format */
  birthday?: string;
  /** The user's horoscope sign */
  horoscope?: string;
  /** The user's zodiac sign */
  zodiac?: string;
  /** The user's height in centimeters */
  height?: number;
  /** The user's weight in kilograms */
  weight?: number;
  /** Array of user's interests */
  interests?: string[];
}

/**
 * Configuration options for the application
 */
export interface AppConfig {
  /** The API base URL */
  apiUrl: string;
  /** Maximum file upload size in bytes */
  maxUploadSize: number;
  /** Supported image formats */
  supportedImageFormats: string[];
}