import React, {useEffect} from 'react';
import {useRegions} from '../../../../hooks/useRegions';
import {MainHomeMapRegion} from './MainHomeMapRegion';

export const MainHomeMapRegionBulk: React.FC = () => {
  const [regions] = useRegions();
  useEffect(() => {
    if (!regions) return;
    console.log(`Found ${regions.length} regions`);
  }, []);

  if (!regions) return <></>;
  return (
    <>
      {regions.map(region => (
        <MainHomeMapRegion region={region} key={region.regionId} />
      ))}
    </>
  );
};
