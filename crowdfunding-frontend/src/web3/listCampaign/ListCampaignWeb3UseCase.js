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

function ListCampaignWeb3UseCase() {
  return {
    getCampaign: async (campaignID, callback) => {
      const provider = await detectEthereumProvider();

      let web3 = new Web3(provider);

      const contract = new web3.eth.Contract(
        contractInterface.abi,
        config.crowdfundingAddress
      );

      let campaign = await contract.methods.getCampaign(campaignID).call();

      campaign = { ...campaign, id: campaignID };

      console.log(campaign);

      return campaign;
    },
  };
}

export default ListCampaignWeb3UseCase;
