const validateId = (req, res, next) => {
  const sale = req.body;

  const checkId = sale.every((item) => 'productId' in item);
  if (!checkId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const validateQuantity = (req, res, next) => {
  const sale = req.body;

  const checkQuantity = sale.every((item) => 'quantity' in item);
  if (!checkQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  const positiveQuantity = sale.every((item) => item.quantity > 0);
  if (!positiveQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = { validateId, validateQuantity };