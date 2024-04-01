const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return (products); 
};

const findById = async (productId) => {
  const [[products]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return (products);
};

const createProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return { id: insertId, name };
};

const updateProductById = async (productId, newName) => {
  try {
    const [result] = await connection.execute(
      'UPDATE products SET name = ? WHERE id = ?',
      [newName, productId],
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProductById,
};