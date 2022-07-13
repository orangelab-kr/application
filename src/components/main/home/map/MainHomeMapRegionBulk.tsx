import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {RideRegionGeofence, RideShortRegion} from '../../../../api/ride';
import {RegionsState} from '../../../../recoils/regions';
import {MainHomeMapRegion} from './MainHomeMapRegion';

export const MainHomeMapRegionBulk: React.FC = () => {
  const [showRegions, setShowRegions] = useState<RideShortRegion[]>([]);
  const regions = useRecoilValue(RegionsState);
  const loadRegions = useCallback(async () => {
    if (!regions) return;
    for (const region of regions) {
      if (region.main) continue;
      const geofences = await axios
        .get(region.cacheUrl)
        .then(r => r.data as RideRegionGeofence[])
        .then(r => r.sort((a, b) => a.profile.priority - b.profile.priority));
      setShowRegions(r => [...r, {...region, geofences}]);
    }
  }, []);

  useEffect(() => {
    loadRegions();
  }, [loadRegions, regions]);

  if (!showRegions) return <></>;
  return (
    <>
      {showRegions.map(region => (
        <MainHomeMapRegion region={region} key={region.regionId} />
      ))}
    </>
  );
};
