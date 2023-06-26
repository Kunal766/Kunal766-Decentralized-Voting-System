const SimpleStorage = artifacts.require("vote");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};
