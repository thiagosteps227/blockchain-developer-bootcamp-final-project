import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

//components
import Grid from './Grid';
import Spinner from './Spinner'; 
import BreadCrumb from './BreadCrumb';
import { Button, Checkbox, Form } from "semantic-ui-react";
import {
  Box,
  Text,
  Heading,
  Flex,
} from "@chakra-ui/react";

//hook
import { useCampaignFetch } from '../hooks/useCampaignFetch';
//image
import NoImage from '../images/no_image.jpg';
import Web3 from "web3";

import FundingCampaignUseCase from "../web3/fundingCampaign/FundingCampaignUseCase";

const toWei = Web3.utils.toWei;
const fromWei = Web3.utils.fromWei;

// useEffect(() => {
//   (async () => {
//     const goalReached = await CheckGoalReachedUseCase().checkGoalReached(0);
//     setGoalReached(goalReached);
//   })();
// }, []);

// const [goalReached, setGoalReached] = useState({
//   reached: "",
// });

// goalReached = CheckGoalReachedUseCase().checkGoalReached(campaignID);
// setGoalReached(goalReached);

const Campaign = () => {

  

  const { campaignID } = useParams();
  const [fundValue, setFundValue] = useState("");

  const { state: campaign, loading, error } = useCampaignFetch(campaignID);

  const fundCampaign = (campaignID) => {
    console.log("Amount funded -> " + fundValue);
    setFundValue(fundValue);
    FundingCampaignUseCase().fund(campaignID, fundValue.toString());
  };

  if(loading) return <Spinner />
  if(error) return <div>Something went wrong...</div>

  

  return(
    <>
    <Box>
        <Flex justifyContent="space-around">
          <Box flex="2" maxWidth="800px" mr="50px">
            <Box mb="8" margin="5px">
              <Heading fontSize="30px">Our Mission</Heading>
              <Text mt="35px" fontSize="20px" color="black">
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
              <Text color="black" opacity="0.8">{"Founder of NGO Kids Care "}</Text>
            </Box>
          </Box>
        </Flex>
      </Box>


      <Box m="15px 0 30px 0" p="0 10px" color="black">
        <Flex
          mt="10px"
          width="100%"
          justifyContent="space-around"
          alignItems="center"
          color="black"
        >
          <Text fontWeight="bold">
            1 BNB = $640
          </Text>
        </Flex >
        <Text color="black" fontWeight="bold" mt="10px" fontSize="20px">
          Campaign Goal: {fromWei(campaign.fundingGoal)} BNB
        </Text>

        <Text color="black" fontWeight="bold" mt="20px">
          {"Goal reached: "}
          {}
        </Text>

        <Text color="black" fontWeight="bold" mt="10px" fontSize="20px">
          Campaign funds
        </Text>
        <Text fontSize="15px" color="black" fontWeight="bold">
          {fromWei(campaign.amount)} BNB
        </Text>

        <Text color="black" mt="20px">
          {"Number of funders: "}
          {campaign.numFunders}
        </Text>

        <Flex mt="30px" justifyContent="space-around">
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
            onClick={() => fundCampaign(campaignID)}
          >
            Fund a Campaign
          </Button>
        </Flex>

      </Box>
    </>
  )
};

export default Campaign;