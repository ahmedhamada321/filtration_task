export const asyncHndler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      next(new Error(error.message));
    });
  };
};

export const globalErrorHandling = (err, req, res, next) => {
  res.status(400).json({ message: err.message, stack: err.stack });
};
