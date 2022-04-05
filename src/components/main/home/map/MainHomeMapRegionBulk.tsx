import React from 'react';
import {useRegions} from '../../../../hooks/useRegions';
import {MainHomeMapRegion} from './MainHomeMapRegion';

export const MainHomeMapRegionBulk: React.FC = () => {
  const regions = useRegions();
  if (!regions) return <></>;
  console.log(`Found ${regions.length} regions`);

  return (
    <>
      {regions.map(region => (
        <MainHomeMapRegion region={region} key={region.regionId} />
      ))}
    </>
  );
};
