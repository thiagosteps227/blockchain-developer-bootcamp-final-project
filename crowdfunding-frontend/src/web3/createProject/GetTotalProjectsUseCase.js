import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import config from "../../contract-config.json";

const contractInterface = require("../../CrowdfundingABI.json");
require("dotenv").config();


const metamaskLogin = async () => {
  const provider = await detectEthereumProvider();
  return provider.request({ method: "eth_requestAccounts" });
};

metamaskLogin();

function GetTotalProjectsUseCase() {
  return {
    getTotalCampaigns: async (callback) => {
      const provider = await detectEthereumProvider();

      let web3 = new Web3(provider);

      const contract = new web3.eth.Contract(
        contractInterface.abi,
        config.crowdfundingAddress
      );

      let totalOfCampaigns = await contract.methods.getNumTotalCampaigns().call();

      return totalOfCampaigns;
    },
  };
}

export default GetTotalProjectsUseCase;
