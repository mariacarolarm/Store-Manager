const sinon = require('sinon');
const myMiddlewares = require('../../../src/middlewares/productValidation');

describe('Valida middleware', function () {
  it('Deve chamar next se os campos forem validos', function () {
    const req = { body: { name: 'ValidProductName' } };
    const res = {};
    const next = sinon.stub();

    myMiddlewares(req, res, next);

    sinon.assert.calledOnce(next);
  });

  it('Envia erro com status 400 se nao tiver name', function () {
    const req = { body: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();
    myMiddlewares(req, res, next);

    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.json, { message: '"name" is required' });
    sinon.assert.notCalled(next);
  });

  it('Envia erro com status status 422 se name for menor do 5 caracteres', function () {
    const req = { body: { name: 'nd' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();
    myMiddlewares(req, res, next);

    sinon.assert.calledWith(res.status, 422);
    sinon.assert.calledWith(res.json, { message: '"name" length must be at least 5 characters long' });
    sinon.assert.notCalled(next);
  });
});
