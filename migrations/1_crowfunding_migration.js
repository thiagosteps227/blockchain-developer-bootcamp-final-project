const crowdfunding = artifacts.require("Crowdfunding");

module.exports = function (deployer) {
  deployer.deploy(crowdfunding);
};
