const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { returnAllProducts, returnProductById } = require('../mocks/products.mock');

describe('Realizando testes - PRODUCTS MODEL', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testa se a rota /products retorna todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves(returnAllProducts);

    const result = await connection.execute('SELECT * FROM StoreManager.products');

    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(returnAllProducts);
  });

  it('Testa se retorna produto por id', async function () {
    sinon.stub(connection, 'execute').resolves(returnProductById);

    const result = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?', [1]);

    expect(result).to.be.an('object');
    expect(result).to.be.deep.equal(returnProductById);
  });

  it('Testa se retorna erro ao não encontrar produto', async function () {
    sinon.stub(connection, 'execute').resolves(null);

    const result = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?', [5]);

    expect(result).to.equal(null);
  });
});