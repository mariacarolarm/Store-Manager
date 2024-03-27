const connection = require('./connection');

const getAll = async () => {
  const query = `
    SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products sp
    JOIN sales s ON sp.sale_id = s.id
    ORDER BY sp.sale_id ASC, sp.product_id ASC
  `;
  const [results] = await connection.execute(query);
  return results;
};

const getById = async (id) => {
  const query = `
    SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products sp
    JOIN sales s ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY sp.product_id ASC
  `;
  const [results] = await connection.execute(query, [id]);
  if (results.length === 0) return null;
  return results;
};

module.exports = {
  getAll,
  getById,
};