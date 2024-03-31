const sinon = require('sinon');
const { validateId, validateQuantity } = require('../../../src/middlewares/saleValidation');

describe('Testando middlewares de cadastro de vendas', function () {
  describe('Validando Id', function () {
    it('Deve chamar - next - se houver Id nos produtos', function () {
      const req = { body: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] };
      const res = {};
      const next = sinon.stub();

      validateId(req, res, next);

      sinon.assert.calledOnce(next);
    });

    it('Deve dar erro se não houver productId', function () {
      const req = { body: [{ quantity: 1 }, { productId: 2, quantity: 5 }] };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();

      validateId(req, res, next);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { message: '"productId" is required' });
      sinon.assert.notCalled(next);
    });
  });

  describe('Testando a validação de quantity', function () {
    it('Deve chamar - next - se quantidade for positiva e maior do que zero', function () {
      const req = { body: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] };
      const res = {};
      const next = sinon.stub();

      validateQuantity(req, res, next);

      sinon.assert.calledOnce(next);
    });

    it('Deve enviar erro se não houver quantidade', function () {
      const req = { body: [{ productId: 1 }, { productId: 2, quantity: 5 }] };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();

      validateQuantity(req, res, next);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { message: '"quantity" is required' });
      sinon.assert.notCalled(next);
    });

    it('Deve enviar erro se quantidade for igual ou menor do que zero', function () {
      const req = { body: [{ productId: 1, quantity: -1 }, { productId: 2, quantity: 5 }] };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();

      validateQuantity(req, res, next);

      sinon.assert.calledWith(res.status, 422);
      sinon.assert.calledWith(res.json, { message: '"quantity" must be greater than or equal to 1' });
      sinon.assert.notCalled(next);
    });
  });
});
