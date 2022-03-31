import React from 'react';
import {Coord, Polygon} from 'react-native-nmap';
import {RideRegion, RideRegionGeofence} from '../../../../api/ride';
import {useRegions} from '../../../../hooks/useRegions';

interface MainHomeMapRegionProps {
  region: RideRegion;
}

export const MainHomeMapRegion: React.FC<MainHomeMapRegionProps> = ({
  region,
}) => {
  const {geofences} = region;
  console.log(
    `Found ${geofences.length} geofences in ${region.name}(${region.regionId})`,
  );

  const getCoord = (geofence: RideRegionGeofence): Coord[] => {
    const a = geofence.geojson.coordinates[0].map(([longitude, latitude]) => ({
      latitude,
      longitude,
    }));
    console.log(a);
    return a;
  };

  return (
    <>
      {geofences.map(geofence => (
        <Polygon
          coordinates={getCoord(geofence)}
          color={geofence.profile.color}
        />
      ))}
    </>
  );
};
