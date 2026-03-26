// 🧠 Wrap async functions to auto-handle errors
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};