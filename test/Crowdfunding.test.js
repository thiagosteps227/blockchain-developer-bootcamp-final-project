const { assert } = require("chai");
const truffleAssert = require("truffle-assertions");
const BN = web3.utils.BN;

const Crowdfunding = artifacts.require("./Crowdfunding.sol");

contract("Crowdfunding", (accounts) => {
  it("Deployed successfully", async () => {
    const crowdfunding = await Crowdfunding.new();
    const address = await crowdfunding.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("Should be able to create a new campaign", async () => {
    const crowdfunding = await Crowdfunding.new();
    const beneficiary = accounts[0];
    const fundingGoal = 100;
    const tx = await crowdfunding.newCampaign(beneficiary, fundingGoal);

    truffleAssert.eventEmitted(tx, "CampaignCreated", (ev) => {
      return ev.campaignID.toNumber() === 0;
    });
    console.log("tx " + tx);
    //let result = await truffleAssert.createTransactionResult(crowdfunding, tx.transactionHash);
    //truffleAssert.eventEmitted(result, 'CampaignCreated');
    //console.log(campaignID);
    //assert.Equal(campaignID, null);
  });

  it("Should be able to create a contribution", async () => {
    const crowdfunding = await Crowdfunding.new();

    let funder = accounts[1];
    let amount = 1;
    let tx = await crowdfunding.contribute(0, { from: funder, value: amount });
    truffleAssert.eventEmitted(tx, "Contribution", (ev) => {
      return ev.funder === funder;
    });
  });

  it("Should be able to check the goal is reached", async () => {
    const crowdfunding = await Crowdfunding.new();
  
    let tx = await crowdfunding.checkGoalReached(0);
      truffleAssert.eventEmitted(tx, "GoalReached", (ev) => {
        return ev.campaignID == 0;
    });

  });

});

