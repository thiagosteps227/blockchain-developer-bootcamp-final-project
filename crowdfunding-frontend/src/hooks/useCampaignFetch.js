import { useState, useEffect } from 'react';

import ListCampaignWeb3UseCase from '../web3/listCampaign/ListCampaignWeb3UseCase';
import CheckGoalReachedUseCase from '../web3/checkGoalReached/CheckGoalReachedUseCase';


export const useCampaignFetch = campaignID => {
  const [state, setState ] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError ] = useState(false);
  const [goalReached, setGoalReached] = useState(false);

  useEffect(()=> {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        setError(false);

        const campaign = await ListCampaignWeb3UseCase().getCampaign(campaignID);
        const goalReached = await CheckGoalReachedUseCase().checkGoalReached(campaignID);
        console.log(goalReached);
        console.log(campaign);
        //const movie = await API.fetchMovie(movieId);
        //const credits = await API.fetchCredits(movieId);

        //get directors only
        // const directors = credits.crew.filter(
        //   member => member.job === 'Director'
        // );

        setState({
          ...campaign,
        })

        setGoalReached(goalReached);


        setLoading(false)
      } catch(error){
        setError(true);
      }
    }

    fetchCampaign();
  }, [campaignID])


  return { state, goalReached, loading, error }
}
