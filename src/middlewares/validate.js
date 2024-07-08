export const validtionSchema = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(
        { ...req.body, ...req.params },
        { abortEarly: false }
      );

      return next();
    } catch (err) {
      res.status(400).json(err.details);
    }
  };
};
