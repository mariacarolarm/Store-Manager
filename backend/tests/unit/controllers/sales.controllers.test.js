const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const connection = require('../../../src/models/connection');

chai.use(chaiHttp);

const { expect } = chai;

describe('Realizando testes - SALES CONTROLLER', function () {
  afterEach(sinon.restore);

  it('Testando listagem de vendas', async function () {
    sinon.stub(connection, 'execute').resolves([[
      {
        saleId: 1,
        date: '2024-03-27T19:14:07.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: '2024-03-27T19:14:07.000Z',
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: '2024-03-27T19:14:07.000Z',
        productId: 3,
        quantity: 15,
      },
    ]]);

    const response = await chai.request(app).get('/sales');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('Teste listagem por id', async function () {
    sinon.stub(connection, 'execute').resolves([[
      {
        saleId: 2,
        date: '2024-03-27T19:14:07.000Z',
        productId: 3,
        quantity: 15,
      },
    ]]);

    const response = await chai.request(app).get('/sales/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('Teste se a rota /sales/:id retorna um objeto com a chave "error" e valor "Sale not found"', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const response = await chai.request(app).get('/sales/12345');
    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({
      message: 'Sale not found',
    });
  });
});