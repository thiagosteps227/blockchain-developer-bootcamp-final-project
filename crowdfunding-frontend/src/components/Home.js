import React from "react";

import { useEffect, useState } from "react";
import CreateProjectUseCase from "../web3/createProject/CreateProjectUseCase";
import ListCampaignWeb3UseCase from "../web3/listCampaign/ListCampaignWeb3UseCase";
import FundingCampaignUseCase from "../web3/fundingCampaign/FundingCampaignUseCase";
import CheckGoalReachedUseCase from "../web3/checkGoalReached/CheckGoalReachedUseCase";
import source from "../images/crowdfunding.jpeg";

//components
import HeroImage from "./HeroImage";
import Grid from "./Grid";

import Spinner from "./Spinner";
import Thumb from "./Thumb";
import { Button, Checkbox, Form } from "semantic-ui-react";
import {
  Box,
  Text,
  Heading,
  Flex,
} from "@chakra-ui/react";

//hooks
import { useHomeFetch } from "../hooks/useHomeFetch";

//image
import NoImage from '../images/no_image.jpg';

import ipfs from 'ipfs-http-client';

import Web3 from "web3";
import GetTotalProjectsUseCase from "../web3/createProject/GetTotalProjectsUseCase";

const toWei = Web3.utils.toWei;
const fromWei = Web3.utils.fromWei;




const Home = () => {

 

  const [goalValue, setGoalValue] = useState("");
  const [fundValue, setFundValue] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [campaign, setCampaign] = useState({
    amount: "",
    beneficiary: "",
    fundingGoal: "",
    numFunders: "",
  });
  const [goalReached, setGoalReached] = useState({
    reached: "",
  });

  const postData = () => {
    console.log(goalValue);
    console.log(lastName);
    console.log(checkbox); //
  };

  //TODO
  // be able to create a campaign again, so I can test the functionality 
  //and display all the campaigns available in the blockchain
  const createProject = () => {
    console.log("Amount donated -> " + goalValue);
    setGoalValue(goalValue);
    CreateProjectUseCase().create(goalValue.toString());
  };

  const fundCampaign = (campaignID) => {
    console.log("Amount funded -> " + fundValue);
    setFundValue(fundValue);
    FundingCampaignUseCase().fund(campaignID, fundValue.toString());
  };

  useEffect(() => {
    (async () => {
      const campaign = await ListCampaignWeb3UseCase().getCampaign(0);
      setCampaign(campaign);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const goalReached = await CheckGoalReachedUseCase().checkGoalReached(0);
      setGoalReached(goalReached);
    })();
  }, []);

  //to get the total num of campaigns
  let totalNumOfCampaigns;
  useEffect(() => {
    (async () => {
      totalNumOfCampaigns = await GetTotalProjectsUseCase().getTotalCampaigns();
      console.log(totalNumOfCampaigns);
    })();
  }, []);

  let campaignList;
  let campaigns = [];
  
 

  
  console.log(campaigns);

  const imageCid = 'QmRNVQGpRCcHoJZoc7wHyWipkYbWBRK25kXnjVQzbM8YT5';
  //https://ipfs.io/ipfs/QmRNVQGpRCcHoJZoc7wHyWipkYbWBRK25kXnjVQzbM8YT5?filename=childrenproject.png
  //const image = "https://ipfs.io/ipfs/QmRNVQGpRCcHoJZoc7wHyWipkYbWBRK25kXnjVQzbM8YT5?filename=childrenproject.png"
  //const image = `ipfs.io/ipfs/${imageCid}`



  const campaignGoalReached = goalReached
    ? "Yes! Thanks for your support"
    : "Not yet, keep donating!";

  console.log(campaign);
  console.log(campaign.id);
  console.log(campaign.amount);
  console.log(campaign.beneficiary);
  console.log(campaign.fundingGoal);
  console.log(campaign.numFunders);

  const { state, loading, error} = useHomeFetch();

  if(error) return <div>Something went wrong...</div>
 

  return (
    <>
     <HeroImage 
          image={source}
          title={'Crowdfunding Application'}
          text={'This is my crowdfunding application'}
        />
      <Grid header={'Crowdfunding campaigns'}>
        {state.results.map((campaign) => (

        <Thumb
          key={campaign.id}
          clickable
          image={
            NoImage
          }
          campaignID={campaign.id}
          />
        ))}
    </Grid>
    {loading && <Spinner/>}
      
    </>
  );
}

export default Home;
