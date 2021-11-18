import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const contractInterface = require("../../CrowdfundingABI.json");



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
        
        "0xbfa34520D7263Dfd8CaEB75Ad38d83967d8e78AF"
      );

      //console.log("contract "+ contract);
      

      let campaign = await contract.methods
        .getCampaign(campaignID)
        .call()
       // .then(console.log);
      //console.log(campaign);
      return campaign;
      }
     
    
  };
}

export default ListCampaignWeb3UseCase;
