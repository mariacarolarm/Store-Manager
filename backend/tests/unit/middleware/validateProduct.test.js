const sinon = require('sinon');
const myMiddlewares = require('../../../src/middlewares/productValidation');

describe('validateMiddleware', function () {
  it('should call next if validation passes', function () {
    const req = { body: { name: 'ValidProductName' } };
    const res = {};
    const next = sinon.stub();

    myMiddlewares(req, res, next);

    sinon.assert.calledOnce(next);
  });

  it('should send 400 status with error message if name is missing', function () {
    const req = { body: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();
    myMiddlewares(req, res, next);

    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.json, { message: '"name" is required' });
    sinon.assert.notCalled(next);
  });

  it('should send 422 status with error message if name is too short', function () {
    const req = { body: { name: 'nd' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();
    myMiddlewares(req, res, next);

    sinon.assert.calledWith(res.status, 422);
    sinon.assert.calledWith(res.json, { message: '"name" length must be at least 5 characters long' });
    sinon.assert.notCalled(next);
  });
});
