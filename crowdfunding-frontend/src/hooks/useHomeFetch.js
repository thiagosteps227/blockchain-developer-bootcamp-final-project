import { useState, useEffect, useRef } from 'react';

import GetTotalProjectsUseCase from '../web3/createProject/GetTotalProjectsUseCase';
import ListCampaignWeb3UseCase from '../web3/listCampaign/ListCampaignWeb3UseCase';



const initialState = {
  results: []
};


const campaignArray = [];

campaignArray.push(
  {
    campaignID: 0, 
    campaignName: 'Campaign 1', 
    campaignDescription: 'Campaign 1 description', 
    campaignGoal: '100', 
    campaignFund: '50', 
    campaignImage: 'https://ipfs.infura.io/ipfs/QmRNVQGpRCcHoJZoc7wHyWipkYbWBRK25kXnjVQzbM8YT5'
  },
  {
    campaignID: 1,
    campaignName: 'Campaign 2',
    campaignDescription: 'Campaign 2 description',
    campaignGoal: '200',
    campaignFund: '100',
    campaignImage: 'https://ipfs.infura.io/ipfs/QmRNVQGpRCcHoJZoc7wHyWipkYbWBRK25kXnjVQzbM8YT5'
    },);



  // let arrayOfCampaigns = [];
  
  // useEffect(() => {
  //   (async () => {
      
  //     const totalNumOfCampaigns = await GetTotalProjectsUseCase().getTotalCampaigns();
  //     console.log(totalNumOfCampaigns);
  //       if (totalNumOfCampaigns > 0) {

  //         for (let i = 0; i < totalNumOfCampaigns; i++) {
  //           let campaign = await ListCampaignWeb3UseCase().getCampaign(i);
  //           console.log(campaign);
           
  //         }
  //       }
  //     }
  //   )();
  // },[]);



export const useHomeFetch = () => {

  const [searchTerm, setSearchTerm ] = useState('');
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchCampaigns = async () => {
    try{
      setError(false);
      setLoading(true);


  let arrayOfCampaigns = [];
  

      
      const totalNumOfCampaigns = await GetTotalProjectsUseCase().getTotalCampaigns();
      console.log(totalNumOfCampaigns);
        if (totalNumOfCampaigns > 0) {

          for (let i = 0; i < totalNumOfCampaigns; i++) {
            let campaign = await ListCampaignWeb3UseCase().getCampaign(i);
            arrayOfCampaigns.push(campaign);
            console.log(campaign);
           
          }
        }
 


      const campaigns = campaignArray;
      console.log(arrayOfCampaigns);
      //const campaigns = await API.fetchCampaigns(searchTerm, page);
      //console.log(movies);

      setState(prev => ({
        ...arrayOfCampaigns,
        results:
          [...arrayOfCampaigns]
      }))

    }catch(error){
      setError(true);
    }

    setLoading(false);
  }

  //initial and search
  useEffect(() => {
    setState(initialState);
    fetchCampaigns();
  }, [])

  //load more
  useEffect(() => {
    if(!isLoadingMore) return;

    fetchCampaigns();
    setIsLoadingMore(false);
    
  }, [isLoadingMore])

  return {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore};

}