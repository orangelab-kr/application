import React, {useEffect} from 'react';
import {Coord, Polygon} from 'react-native-nmap';
import {RideRegion, RideRegionGeofence} from '../../../../api/ride';

interface MainHomeMapRegionProps {
  region: RideRegion;
}

export const MainHomeMapRegion: React.FC<MainHomeMapRegionProps> = ({
  region,
}) => {
  const {geofences} = region;
  useEffect(() => {
    if (!geofences) return;
    console.log(
      `Found ${geofences.length} geofences in ${region.name}(${region.regionId})`,
    );
  }, [geofences]);

  const getCoord = (geofence: RideRegionGeofence): Coord[] =>
    geofence.geojson.coordinates[0].map(([longitude, latitude]) => ({
      latitude,
      longitude,
    }));

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
