import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

const contractInterface = require("../../CrowdfundingABI.json");

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
        "0xbfa34520D7263Dfd8CaEB75Ad38d83967d8e78AF"
      );


      await contract.methods
        .contribute(campaignID)
        .send({ from: accounts[0], value: toWei(value) })
        .then(() => callback(accounts[0], value))
        .catch((error) => console.log("Error in (fund) => " + error))
    }
  }
}
