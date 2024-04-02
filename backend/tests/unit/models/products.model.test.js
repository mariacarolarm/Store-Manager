const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { returnAllProducts, returnProductById } = require('../mocks/products.mock');
const { createProduct, deleteProductById, updateProductById } = require('../../../src/models/products.model');

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
  it('Testa inserção de novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const productName = 'ProdutoX';
    const result = await createProduct(productName);

    expect(result).to.have.property('id');
    expect(result).to.have.property('name');
    expect(result.name).to.equal(productName);
  });
  it('Testa se atualiza um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const id = 1;
    const name = 'ProdutoX';
    const result = await updateProductById(name, id);

    expect(result).to.equal(true);
  });
  it('Testa se retorna erro ao atualizar um produto inexistente', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);
    const id = 5;
    const name = 'ProdutoX';
    const result = await updateProductById(name, id);

    expect(result).to.equal(false);
  });
  it('Testa se deleta um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const id = 1;
    const result = await deleteProductById(id);

    expect(result).to.equal(true);
  });
});