import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import config from "../../contract-config.json";
require("dotenv").config();

const Web3Utils = require("web3-utils");

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

      let web3 = new Web3(provider);

      const contract = new web3.eth.Contract(
        contractInterface.abi,
        config.crowdfundingAddress
      );

      console.log("goal" + goal);

      const accounts = await web3.eth.getAccounts();

      contract.methods
        .newCampaign(accounts[0], toWei(goal))
        .send({ from: accounts[0] })
        .on("transactionHash", (hash) => {
          console.log(hash);
        })
        .on("receipt", (receipt) => {
          console.log(receipt);
        })
        .on("error", (error) => {
          console.log(error);
        });
    },
  };
}

export default CreateProjectWeb3UseCase;
