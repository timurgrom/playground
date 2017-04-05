export const PATTERNS = {
  // 1 digit, 1 letter, minimum 8 chars and maximum 12 chars
  password: /^(?=.*\d)(?=.*[a-zA-Z]).{8,12}$/,
  // 4 digits
  passcode: /^\d{4}$/,
  httpUrl: /^https?:\/\//
};
