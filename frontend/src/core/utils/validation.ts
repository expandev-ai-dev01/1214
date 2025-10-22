/**
 * @utility isValidEmail
 * @summary Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * @utility isValidPassword
 * @summary Validates password strength
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};
