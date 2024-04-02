const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const requireProducts = require('../../../src/models/products.model');
const barrel = require('../../../src/models/index');
const productsModel = require('../../../src/models/products.model');

chai.use(chaiHttp);

const { expect } = chai;
const serverError = 'Internal server error';

describe('Realizando testes - PRODUCT CONTROLLER', function () {
  beforeEach(sinon.restore);

  it('Testando a listagem de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([[
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
      {
        id: 3,
        name: 'Escudo do Capitão América',
      },
    ]]);
    const response = await chai.request(app).get('/products');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal([
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
      {
        id: 3,
        name: 'Escudo do Capitão América',
      },
    ]);
    sinon.restore();
  });
  it('Testando listagem por id', async function () {
    sinon.stub(connection, 'execute').resolves([[
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
    ]]);
    const response = await chai.request(app).get('/products/2');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      id: 2,
      name: 'Traje de encolhimento',
    });
    sinon.restore();
  });
  it('Testando erro ao não encontrar produto', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const response = await chai.request(app).get('/products/5');
    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({
      message: 'Product not found',
    });
    sinon.restore();
  });
  it('Testando a listagem de produtos com erro', async function () {
    const error = new Error(serverError);
    sinon.stub(requireProducts, 'findAll').rejects(error);

    const response = await chai.request(app).get('/products');
    expect(response.status).to.equal(500);
    expect(response.body).to.deep.equal({
      message: error.message,
    });
    sinon.restore();
  });
  it('Testando listagem por id com erro', async function () {
    const error = new Error(serverError);
    sinon.stub(requireProducts, 'findById').rejects(error);

    const response = await chai.request(app).get('/products/2');
    expect(response.status).to.equal(500);
    expect(response.body).to.deep.equal({
      message: error.message,
    });
    sinon.restore();
  });
  it('Deve exportar productsModel', function () {
    expect(barrel).to.have.property('productsModel');
    expect(barrel.productsModel).to.be.an('object');
    sinon.restore();
  });
  it('Deve inserir novo produto', async function () {
    sinon.stub(barrel.productsModel, 'createProduct').resolves({
      id: 4, 
      name: 'ProdutoX', 
    });

    const response = await chai.request(app)
      .post('/products')
      .send({ name: 'ProdutoX' }); 
    expect(response.status).to.be.eq(201);
    expect(response.body).to.deep.equal({
      id: 4,
      name: 'ProdutoX',
    });
  
    sinon.restore();
  });
  describe('Atualizando produtos', function () {
    beforeEach(sinon.restore);
  
    it('Deve atualizar produto existente', async function () {
      sinon.stub(productsModel, 'updateProductById').resolves(true);

      const response = await chai.request(app)
        .put('/products/1')
        .send({ name: 'ProdutoX' });
      expect(response.status).to.be.eq(200);
      expect(response.body).to.deep.equal({
        id: 1,
        name: 'ProdutoX',
      });

      sinon.restore();
    });
  
    it('Deve retornar status 404 se id nao existir', async function () {
      sinon.stub(productsModel, 'updateProductById').resolves(false);

      const response = await chai.request(app)
        .put('/products/500')
        .send({ name: 'ProdutoX' });
      expect(response.status).to.be.eq(404);
      expect(response.body).to.deep.equal({ message: 'Product not found' });

      sinon.restore();
    });
  
    it('Lida com erro interno do server', async function () {
      sinon.stub(productsModel, 'updateProductById').throws(new Error(serverError));

      const response = await chai.request(app)
        .put('/products/123')
        .send({ name: 'ProdutoX' });
      expect(response.status).to.be.eq(500);
      expect(response.body).to.deep.equal({ message: 'Internal server error' });

      sinon.restore();
    });
    it('Testa delete de produto por id', async function () {
      sinon.stub(productsModel, 'deleteProductById').resolves(true);

      const response = await chai.request(app).delete('/products/1');
      expect(response.status).to.be.eq(204);

      sinon.restore();
    });
    it('Testa delete de produto com erro de Product not found', async function () {
      sinon.stub(productsModel, 'deleteProductById').resolves(false);

      const response = await chai.request(app).delete('/products/1');
      expect(response.status).to.be.eq(404);
      expect(response.body).to.deep.equal({ message: 'Product not found' });

      sinon.restore();
    });
    it('Testa delete de produto com erro interno do server', async function () {  
      sinon.stub(productsModel, 'deleteProductById').throws(new Error(serverError));

      const response = await chai.request(app).delete('/products/1');
      expect(response.status).to.be.eq(500);
      expect(response.body).to.deep.equal({ message: 'Internal server error' });

      sinon.restore();
    });
  });
});
