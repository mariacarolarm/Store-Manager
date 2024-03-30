const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/connection');

describe('Testando newSale function', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve inserir uma nova venda no DB', async function () {
    const sale = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ];

    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([{ insertId: 123 }])
      .onSecondCall()
      .resolves();

    const insertId = await salesModel.newSale(sale);

    expect(insertId).to.be.an('object');
    expect(insertId.id).to.equal(123);
  });
});
