const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validate;
