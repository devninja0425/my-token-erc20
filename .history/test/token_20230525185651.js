var Token = artifacts.require("./Token.sol");

contract('Token', function(accounts) {
  var tokenInstance;

  it('initializes the contract with the correct values', function() {
    return Token.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function(name) {
      assert.equal(name, 'RossCoin', 'has the correct name');
      return tokenInstance.symbol();
    }).then(function(symbol) {
      assert.equal(symbol, 'Ross', 'has the correct symbol');
      return tokenInstance.standard();
    }).then(function(standard) {
      assert.equal(standard, 'RossCoin v1.0', 'has the correct standard');
    });
  })

});