import React, {useEffect} from 'react';
import {Coord, Polygon} from 'react-native-nmap';
import {useRecoilState} from 'recoil';
import {RideRegion, RideRegionGeofence} from '../../../../api/ride';
import {selectedKickboardCodeState} from '../../../../recoils/selectedKickboardCode';
import {selectedRegionState} from '../../../../recoils/selectedRegion';

interface MainHomeMapRegionProps {
  region: RideRegion;
}

export const MainHomeMapRegion: React.FC<MainHomeMapRegionProps> = ({
  region,
}) => {
  const {geofences} = region;
  const [selectedKickboardCode, setSelectedKickboard] = useRecoilState(
    selectedKickboardCodeState,
  );
  const [selectedRegion, setSelectedRegion] =
    useRecoilState(selectedRegionState);
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

  const onClick = (geofence: RideRegionGeofence) => () => {
    if (selectedKickboardCode) {
      setSelectedKickboard(undefined);
      return;
    }

    if (
      selectedRegion?.geofence === geofence ||
      geofence.profile.priority === 0
    ) {
      setSelectedRegion(undefined);
      return;
    }

    setSelectedRegion({region, geofence});
  };

  return (
    <>
      {geofences.map(geofence => (
        <Polygon
          onClick={onClick(geofence)}
          coordinates={getCoord(geofence)}
          color={geofence.profile.color}
          key={geofence.geofenceId}
        />
      ))}
    </>
  );
};
