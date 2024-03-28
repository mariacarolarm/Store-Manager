const validateProductName = require('../services/validations/schemas');

const validProduct = (req, res, next) => {
  const validationResult = validateProductName.validate(req.body);
  if (validationResult.error) {
    const errorMessage = validationResult.error.details[0].message;
    if (validationResult.error.details[0].type === 'any.required') {
      return res.status(400).json({ message: errorMessage });
    }
    return res.status(422).json({ message: errorMessage });
  }
  next();
};

module.exports = validProduct;
