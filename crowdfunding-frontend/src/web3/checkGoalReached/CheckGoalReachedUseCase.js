import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import config from "../../contract-config.json";

const contractInterface = require("../../CrowdfundingABI.json");
require("dotenv").config();

const contractAddress = process.env.CROWDFUNDING_CONTRACT_ADDRESS;

const metamaskLogin = async () => {
  const provider = await detectEthereumProvider();
  return provider.request({ method: "eth_requestAccounts" });
};

metamaskLogin();

function CheckGoalReachedUseCase() {
  return {
    checkGoalReached: async (campaignID, callback) => {
      const provider = await detectEthereumProvider();

      let web3 = new Web3(provider);

      const contract = new web3.eth.Contract(
        contractInterface.abi,
        config.crowdfundingAddress
      );

      let goalReached = await contract.methods.checkGoalReached(campaignID).call();

      return goalReached;
    },
  };
}

export default CheckGoalReachedUseCase;
