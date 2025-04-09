import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format price from cents to dollars with 2 decimal places
export function formatPrice(price: number): string {
  return (price / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

// Truncate text to a specified length with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Generate a random session ID for cart
export function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Get session ID from local storage or create a new one
export function getSessionId(): string {
  let sessionId = localStorage.getItem('cartSessionId');
  
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('cartSessionId', sessionId);
  }
  
  return sessionId;
}

// Utility to transform star rating to an array for rendering
export function ratingToArray(rating: number): (number | 0.5)[] {
  const result: (number | 0.5)[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    result.push(1);
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    result.push(0.5);
  }
  
  // Fill the rest with empty stars (0) to make it 5 stars total
  while (result.length < 5) {
    result.push(0);
  }
  
  return result;
}

// Helper to safely parse HTML content
export function createMarkup(html: string) {
  return { __html: html };
}
