const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const requireProducts = require('../../../src/models/products.model');
const barrel = require('../../../src/models/index');

chai.use(chaiHttp);

const { expect } = chai;

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
    const error = new Error('Internal server error');
    sinon.stub(requireProducts, 'findAll').rejects(error);

    const response = await chai.request(app).get('/products');
    expect(response.status).to.equal(500);
    expect(response.body).to.deep.equal({
      message: error.message,
    });
    sinon.restore();
  });
  it('Testando listagem por id com erro', async function () {
    const error = new Error('Internal server error');
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
});
