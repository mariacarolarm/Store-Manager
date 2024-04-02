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
    SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products sp
    JOIN sales s ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY sp.product_id ASC
  `;
  const [results] = await connection.execute(query, [id]);
  if (results.length === 0) return null;
  return results;
};

const newSale = async (sale) => {
  const query = 'INSERT INTO sales (date) VALUES (NOW())';
  const [{ insertId }] = await connection.execute(query);

  const query2 = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  
  await Promise
    .all(sale
      .map(async (product) => connection
        .execute(query2, [insertId, product.productId, product.quantity])));

  return { id: insertId, itemsSold: sale };
};

const deleteSale = async (id) => {
  const [result] = await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAll,
  getById,
  newSale,
  deleteSale,
};