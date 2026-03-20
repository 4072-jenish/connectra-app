const validateBody = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      errors: error.errors.map(e => ({
        field: e.path[0],
        message: e.message
      }))
    });
  }
};

const validateParams = (schema) => (req, res, next) => {
  try {
    req.params = schema.parse(req.params);
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Invalid params"
    });
  }
};

module.exports = { validateBody, validateParams };