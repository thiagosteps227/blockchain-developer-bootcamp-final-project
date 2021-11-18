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
import source from "../images/childrenproject.png";

import Web3 from "web3";

const toWei = Web3.utils.toWei;
const fromWei = Web3.utils.fromWei;

export default function Project() {
  // let campaign = {
  //   amount,
  //   funds,
  //   goal
  // };

  const [donationValue, setValue] = useState("");
  const [fundValue, setFundValue] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [campaign, setCampaign] = useState({
    amount: "",
    beneficiary: "",
    fundingGoal: "",
    numFunders: "",
  });

  const postData = () => {
    console.log(donationValue);
    console.log(lastName);
    console.log(checkbox); //
  };
  const createProject = () => {
    console.log("Amount donated -> " + donationValue);
    setValue(donationValue);
    CreateProjectUseCase().create(donationValue);
  };

  const fundCampaign = (campaignID) => {
    console.log("Amount funded -> " + fundValue);
    setFundValue(fundValue);
    FundingCampaignUseCase().fund(campaignID,fundValue.toString());
  };

  useEffect(() => {
    (async () => {
      const campaign = await ListCampaignWeb3UseCase().getCampaign(0);
        setCampaign(campaign);
    })();
  }, [0]);

  // campaign = ListCampaignWeb3UseCase().getCampaign(0, (response) => {
  //   console.log(response);
  // });
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
          height="300px"
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          filter="brightness(80%)"
          objectFit="cover"
          src={source}
        />
        <Flex justifyContent="space-between">
          <Box flex="2" maxWidth="800px" mr="50px">
            <Box mb="8" margin="10px">
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
      </Box>
      <Form className="create-form">
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
          Create a campaign!
        </Button>
      </Form>

      <Box m="15px 0 30px 0" p="0 10px">
        <Heading
          maxW={{ xl: "17ch", lg: "25ch", sm: "30ch" }}
          h="30px"
          fontSize="2xl"
          isTruncated
        >
          {campaign.campaignID}
        </Heading>

        <Flex
          mt="10px"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontWeight="bold" color="tussock">
            1 BNB = $356.10
          </Text>
        </Flex>
        <Text fontWeight="bold" mt="10px" fontSize="20px">
          Campaign Goal: {campaign.fundingGoal} BNB
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
            onClick={() =>
            fundCampaign(0)
            }
          >
            Fund a Campaign
          </Button>
        </Flex>
      </Box>
    </div>
  );
}
