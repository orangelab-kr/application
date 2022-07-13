import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {RideClient, RideShortRegion} from '../../../../api/ride';
import {RegionsState} from '../../../../recoils/regions';
import {MainHomeMapRegion} from './MainHomeMapRegion';

export const MainHomeMapRegionMain: React.FC = () => {
  const [region, setRegion] = useState<RideShortRegion>();
  const setRegions = useSetRecoilState(RegionsState);

  const loadMainRegion = useCallback(async () => {
    const {regions} = await RideClient.getRegions();
    setRegions(regions);

    const region = regions.find(r => r.main === true);
    if (!region) return;

    const geofences = await axios.get(region.cacheUrl).then(r => r.data);
    setRegion({...region, geofences});
  }, []);

  useEffect(() => {
    loadMainRegion();
  }, [loadMainRegion]);

  if (!region) return <></>;
  return <MainHomeMapRegion region={region} />;
};
