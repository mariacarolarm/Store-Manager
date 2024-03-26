const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const connection = require('../../../src/models/connection');

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
});