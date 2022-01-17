import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import {
  Box,
  Image,
  Text,
  Heading,
  Flex,
  Grid,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CreateProjectUseCase from "../web3/createProject/CreateProjectUseCase";
import ListCampaignWeb3UseCase from "../web3/listCampaign/ListCampaignWeb3UseCase";
import FundingCampaignUseCase from "../web3/fundingCampaign/FundingCampaignUseCase";
import CheckGoalReachedUseCase from "../web3/checkGoalReached/CheckGoalReachedUseCase";
import source from "../images/childrenproject.png";

import ipfs from 'ipfs-http-client';

import Web3 from "web3";
import GetTotalProjectsUseCase from "../web3/createProject/GetTotalProjectsUseCase";

const toWei = Web3.utils.toWei;
const fromWei = Web3.utils.fromWei;


export default function Project() {
  // let campaign = {
  //   amount,
  //   funds,
  //   goal
  // };

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
  }, [0]);

  useEffect(() => {
    (async () => {
      const goalReached = await CheckGoalReachedUseCase().checkGoalReached(0);
      setGoalReached(goalReached);
    })();
  }, [1]);

  //to get the total num of campaigns
  useEffect(() => {
    (async () => {
      const totalNumOfCampaigns = await GetTotalProjectsUseCase().getTotalCampaigns();
      console.log(totalNumOfCampaigns);
    })();
  }, [0]);

  let campaignList;
  let campaigns = [];
  
  useEffect(() => {
    (async () => {
      
      const totalNumOfCampaigns = await GetTotalProjectsUseCase().getTotalCampaigns();
      console.log(totalNumOfCampaigns);
        if (totalNumOfCampaigns > 0) {

          for (let i = 0; i < totalNumOfCampaigns; i++) {
            let campaign = await ListCampaignWeb3UseCase().getCampaign(i);
            console.log(campaign);
           

          }
        }
      }
    )();
  }, [0]);

  
  console.log(campaigns);

  const imageCid = 'QmRNVQGpRCcHoJZoc7wHyWipkYbWBRK25kXnjVQzbM8YT5';
  //https://ipfs.io/ipfs/QmRNVQGpRCcHoJZoc7wHyWipkYbWBRK25kXnjVQzbM8YT5?filename=childrenproject.png
  const image = "https://ipfs.io/ipfs/QmRNVQGpRCcHoJZoc7wHyWipkYbWBRK25kXnjVQzbM8YT5?filename=childrenproject.png"
  //const image = `ipfs.io/ipfs/${imageCid}`



  const campaignGoalReached = goalReached
    ? "Yes! Thanks for your support"
    : "Not yet, keep donating!";

  console.log(campaign);
  console.log(campaign.amount);
  console.log(campaign.beneficiary);
  console.log(campaign.fundingGoal);
  console.log(campaign.numFunders);

  return (
    <div>
      <Box>
        <Image
          width="100%"
          height="250px"
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          filter="brightness(80%)"
          objectFit="cover"
          src={image}
        />
        <Flex justifyContent="space-between">
          <Box flex="2" maxWidth="800px" mr="50px">
            <Box mb="8" margin="5px">
              <Heading fontSize="30px">Our Mission</Heading>
              <Text mt="35px" fontSize="20px">
                {"Our mission is to allow children to have dreams!"}
              </Text>
            </Box>
          </Box>
          <Box flex="1">
            <Box
              p="20px"
              border="2px solid rgba(227, 220, 11, 0.5)"
              margin="10px"
            >
              <Heading>{"Joe Donator"}</Heading>
              <Text opacity="0.8">{"Founder of NGO Kids Care "}</Text>
            </Box>
          </Box>
        </Flex>

        <Flex mt="30px" justifyContent="space-between">
          <Form className="create-form">
            <Form.Field>
              <label>Set a goal for you new campaign</label>
              <input
                style={{ width: "200px" }}
                placeholder="Funding Amount"
                style={{ width: "200px" }}
                placeholder="Set a goal here"
                onChange={(e) => setGoalValue(e.target.value)}
              />
            </Form.Field>
          </Form>
          <Button
            backgroundColor="tussock"
            color="white"
            _hover={{
              background: "tussock",
              opacity: "0.8",
              _disabled: { opacity: "0.6" },
            }}
            isLoading={"loading"}
            loadingText="Talking to your wallet..."
            type="submit"
            onClick={() => createProject()}
          >
            Create a Campaign
          </Button>
        </Flex>
      </Box>
      {/* <Form className="create-form">
        <Form.Field>
          <label>Total Amount</label>
          <input
            style={{ width: "200px" }}
            placeholder="Total Amount"
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="I agree to the Terms and Conditions"
            onChange={(e) => setCheckbox(!checkbox)}
          />
        </Form.Field>
        <Button onClick={createProject} type="submit">
          Create a new campaign!
        </Button>
      </Form> */}


      <Box m="15px 0 30px 0" p="0 10px">
        <Flex
          mt="10px"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontWeight="bold" color="tussock">
            1 BNB = $640
          </Text>
        </Flex>
        <Text fontWeight="bold" mt="10px" fontSize="20px">
          Campaign Goal: {fromWei(campaign.fundingGoal)} BNB
        </Text>

        <Text fontWeight="bold" mt="20px">
          {"Goal reached: "}
          {campaignGoalReached}
        </Text>

        <Text fontWeight="bold" mt="10px" fontSize="20px">
          Campaign funds
        </Text>
        <Text fontSize="15px" color="tussock" fontWeight="bold">
          {fromWei(campaign.amount)} BNB
        </Text>

        <Text mt="20px">
          {"Number of funders: "}
          {campaign.numFunders}
        </Text>

        <Flex mt="30px" justifyContent="space-between">
          <Form className="create-form">
            <Form.Field>
              <label>Funding Amount</label>
              <input
                style={{ width: "200px" }}
                placeholder="Funding Amount"
                style={{ width: "200px" }}
                placeholder="Funding Amount"
                onChange={(e) => setFundValue(e.target.value)}
              />
            </Form.Field>
          </Form>
          <Button
            backgroundColor="tussock"
            color="white"
            _hover={{
              background: "tussock",
              opacity: "0.8",
              _disabled: { opacity: "0.6" },
            }}
            isLoading={"loading"}
            loadingText="Talking to your wallet..."
            type="submit"
            onClick={() => fundCampaign(0)}
          >
            Fund a Campaign
          </Button>
        </Flex>

      </Box>
    </div>
  );
}
