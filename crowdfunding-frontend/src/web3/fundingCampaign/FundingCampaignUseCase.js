import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import config from "../../contract-config.json";

const contractInterface = require("../../CrowdfundingABI.json");
require("dotenv").config();

const toWei = Web3.utils.toWei;

const metamaskLogin = async () => {
  const provider = await detectEthereumProvider();
  return provider.request({ method: "eth_requestAccounts" });
};

export default function FundingCampaignWeb3UseCase() {
  return {
    fund: async (campaignID, value, callback) => {
      const provider = await detectEthereumProvider();
      let web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      metamaskLogin();

      const contract = new web3.eth.Contract(
        contractInterface.abi,
        config.crowdfundingAddress
      );

      await contract.methods
        .contribute(campaignID)
        .send({ from: accounts[0], value: toWei(value) })
        .catch((error) => console.log("Error in (fund) => " + error));
    },
  };
}
