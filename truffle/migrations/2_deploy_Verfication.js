const VerifySignature = artifacts.require("VerifySignature");

module.exports = function (deployer) {
  deployer.deploy(VerifySignature);
};