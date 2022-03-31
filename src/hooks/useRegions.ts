import {useEffect, useState} from 'react';
import {ResponseRideGetAllRegions, RideClient, RideRegion} from '../api/ride';

let cachedRegions: RideRegion[];
export const useRegions = (
  {cache = true}: {cache: boolean} = {cache: true},
) => {
  const [regions, setRegions] = useState<RideRegion[] | null>();
  useEffect(() => {
    if (cache && cachedRegions) {
      console.log('Used cached regions.');
      return setRegions(cachedRegions);
    }

    const updateRegions = ({regions}: ResponseRideGetAllRegions) => {
      cachedRegions = regions;
      setRegions(cachedRegions);
    };

    RideClient.getAllRegions()
      .then(updateRegions)
      .catch(() => setRegions(null));
  }, [cache]);

  return regions;
};
