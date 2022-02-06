import React from "react";

import { useEffect, useState } from "react";
import CreateProjectUseCase from "../web3/createProject/CreateProjectUseCase";
import source from "../images/crowdfunding.jpeg";

//components
import HeroImage from "./HeroImage";
import Footer from "./Footer";
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


const Admin = () => {

  const [goalValue, setGoalValue] = useState("");


  // Able to create a campaign, so I can test the functionality 
  //and display all the campaigns available in the blockchain
  const createProject = () => {
    console.log("Amount donated -> " + goalValue);
    setGoalValue(goalValue);
    CreateProjectUseCase().create(goalValue.toString()).then(() => {setGoalValue("")});
  };

  return (
    <>
     <HeroImage 
          image={source}
          title={'Crowdfunding Application'}
          text={'This is my crowdfunding application'}
        /> 
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
              <Heading>{"Admin Dashboard"}</Heading>
              <Text color="black" opacity="0.8">{"NGO Kids Care "}</Text>
            </Box>
          </Box>
        </Flex>

        <Flex mt="30px" justifyContent="space-around">
          <Form className="create-form" >
            <Form.Field >
              <label>Set a goal for your new campaign</label>
              <input
                style={{ width: "200px" }}
                placeholder="Funding Amount"
                style={{ width: "200px" }}
                placeholder="Set a goal here"
                value={goalValue}
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
      <Footer/>
    </>
  );
}

export default Admin;
