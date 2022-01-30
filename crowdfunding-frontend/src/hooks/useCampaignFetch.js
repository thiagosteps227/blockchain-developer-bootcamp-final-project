import { useState, useEffect } from 'react';

import ListCampaignWeb3UseCase from '../web3/listCampaign/ListCampaignWeb3UseCase';
import CheckGoalReachedUseCase from '../web3/checkGoalReached/CheckGoalReachedUseCase';


export const useCampaignFetch = campaignID => {
  const [state, setState ] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError ] = useState(false);


  useEffect(()=> {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        setError(false);

        const campaign = await ListCampaignWeb3UseCase().getCampaign(campaignID);
        const goalReached = await CheckGoalReachedUseCase().checkGoalReached(campaignID);
        console.log(campaign);
        //const movie = await API.fetchMovie(movieId);
        //const credits = await API.fetchCredits(movieId);

        //get directors only
        // const directors = credits.crew.filter(
        //   member => member.job === 'Director'
        // );

        setState({
          ...campaign,
          goalReached: goalReached
          // actors: credits.cast,
          // directors
        })


        setLoading(false)
      } catch(error){
        setError(true);
      }
    }

    fetchCampaign();
  }, [campaignID])


  return { state, loading, error }
}
