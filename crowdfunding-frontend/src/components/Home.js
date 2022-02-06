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
import Footer from "./Footer";

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
import project0 from "../images/project0.jpg";
import project1 from "../images/boy.jpeg";
import project2 from "../images/boys.jpeg";
import project3 from "../images/woodie.jpeg";
import project4 from "../images/creche.jpeg";
import project5 from "../images/horse.jpeg";
import project6 from "../images/kids.jpeg";
import project7 from "../images/mickey.jpeg";


const Home = () => {


  const { state, loading, error} = useHomeFetch();

  const images = [project0, project1, project2, project3, project4, project5, project6, project7];

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
            images[campaign.id]
          }
          campaignID={campaign.id}
          />
        ))}
    </Grid>
    {loading && <Spinner/>}
    <Footer />
      
    </>
  );
}

export default Home;
