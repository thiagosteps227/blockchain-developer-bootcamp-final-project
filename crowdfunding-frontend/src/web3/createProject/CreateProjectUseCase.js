import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
require("dotenv").config();

const Web3Utils = require('web3-utils');

const contractInterface = require("../../CrowdfundingABI.json");

const toWei = Web3.utils.toWei;

const metamaskLogin = async () => {
  const provider = await detectEthereumProvider();
  return provider.request({ method: "eth_requestAccounts" });
};

metamaskLogin();

function CreateProjectWeb3UseCase() {
  return {
    create: async (goal, callback) => {

     

      const provider = await detectEthereumProvider();
      //@ts-ignore
      let web3 = new Web3(provider);

      const contract = new web3.eth.Contract(
        contractInterface.abi,
        "0xbfa34520D7263Dfd8CaEB75Ad38d83967d8e78AF"
      );

      console.log("contract "+ contract);

      //console.log("address "+ process.env.CROWDFUNDING_ADDRESS)

      const accounts = await web3.eth.getAccounts();
      const BN = Web3Utils.toBN;
      
      const projectGoal = new BN(10);

      console.log("accounts "+ accounts[0]);
      console.log("projectGoal "+ projectGoal);

    
      //await metamaskLogin().then(() => 
         contract.methods
          .newCampaign(accounts[0] , toWei(goal))
          .send({from: accounts[0]})
          .on('transactionHash', (hash) => {
            console.log(hash);
          })
          // .on('confirmation', (confirmationNumber, receipt) => {
          //   console.log(confirmationNumber, receipt);
          // })
          
          .on('receipt', (receipt) => {
            console.log(receipt);
          })
          .on('error',(error)=>{
            console.log(error);
          })
      //)
          
          // })then((res) => {
          //   const projectInfo = res.events.CampaignCreated.returnValues;
          //   console.log("projectInfo "+ projectInfo);
          // })
          
      

      // metamaskLogin().then(() =>
      //   contract.methods
      //     .newCampaign("0xC6494FafEb651d4C1587DA383A445164a971189D", 10)
      //     .send({ from: "0xC6494FafEb651d4C1587DA383A445164a971189D" }, (error, transactionHash) => {
      //       console.log(transactionHash)
      //     })

      // );
    //   contract.events
    //     .CampaignCreated()
    //     .on("data", (event) => {
    //       let returnValues = event.returnValues;
    //       callback(returnValues._projectAddress, returnValues._owner);
    //     })
    //     .on("error", console.error);
    // },
        }
  };
}

export default CreateProjectWeb3UseCase;
