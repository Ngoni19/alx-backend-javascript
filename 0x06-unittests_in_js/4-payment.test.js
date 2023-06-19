const sinon = require('sinon');
const Utils = require('./utils');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi', () => {
  it('sendPaymentRequestToApi calls console.log with the right arguments', () => {
    const littleSister = sinon.spy(console);
    const dum = sinon.stub(Utils, 'calculateNumber');

    dum.returns(10);
    sendPaymentRequestToApi(100, 20);
    expect(dum.calledWith('SUM', 100, 20)).to.be.true;
    expect(dum.callCount).to.be.equal(1);
    expect(littleSister.log.calledWith('The total is: 10')).to.be.true;
    expect(littleSister.log.callCount).to.be.equal(1);
    dum.restore();
    littleSister.log.restore();
  });
});
