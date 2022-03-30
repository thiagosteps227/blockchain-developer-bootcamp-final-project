import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

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
  const [fundingLoading, setFundingLoading] = useState(false);
  const { formState: { errors } } = useForm();

  const { state: campaign, goalReached,loading, error } = useCampaignFetch(campaignID);

  const fundedFinished = () => {
    setFundingLoading(false);
    setFundValue("");
  }

  const fundCampaign = (campaignID) => {
    console.log("Amount funded -> " + fundValue);
    setFundingLoading(true);
    setFundValue(fundValue);
    FundingCampaignUseCase().fund(campaignID, fundValue.toString()).then(() => {fundedFinished()});
  };

  const checkValidFundValue = (fundValue) => {
    if (isNaN(fundValue) || fundValue <= 0) {
      return false;
    }
    return true;
  }

  if(loading) return <Spinner />
  if(error) return <div>Something went wrong...</div>


  return(
    <>
    <Box>
        <Flex justifyContent="space-around">
          <Box flex="2" maxWidth="800px" mr="50px">
            <Box mb="8" margin="20px">
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
              margin="20px"
            >
              <Heading >Campaign number {`${campaign.id}`} dashboard</Heading>
              <Text color="black" opacity="0.8">{"NGO Kids Care "}</Text>
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
          {goalReached ? "Yes, thanks for you help!" : "We still need your help!"}
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

        <Flex mt="30px" justifyContent="space-evenly">
          <Form className="create-form">
            <Form.Field>
              <label>Funding Amount</label>
              <input
                style={{ width: "200px" }}
                value={fundValue}
                placeholder="Funding Amount"
                onChange={(e) => setFundValue(e.target.value)}
              />
            </Form.Field>
            {checkValidFundValue(fundValue) ? 
            <Button onClick={() => fundCampaign(campaignID)}>{fundingLoading ? "Funding..." : "Fund this campaign"}</Button> : 
            <Button disabled>{fundingLoading ? "Funding..." : "Fund this campaign"}</Button>}
            {isNaN(fundValue) ? <Text color="red">{"Type a valid number. Ex.: 0.01"}</Text> : ""}
          </Form>
        </Flex>

      </Box>
    </>
  )
};

export default Campaign;