import React, {useMemo} from 'react';
import {Coord, Polygon} from 'react-native-nmap';
import {useRecoilValue} from 'recoil';
import {RideRegionGeofence} from '../../../../api/ride';
import {geofencesState} from '../../../../recoils/geofences';
import {mainGeofenceState} from '../../../../recoils/mainGeofence';

export const MainHomeMapRegion: React.FC = () => {
  const mainGeofence = useRecoilValue(mainGeofenceState);
  const geofences = useRecoilValue(geofencesState);
  const getCoord = (geofence: RideRegionGeofence): Coord[] =>
    geofence.geojson.coordinates[0].map(([longitude, latitude]) => ({
      latitude,
      longitude,
    }));

  const getCoords = (geofences: RideRegionGeofence[]): Coord[][] =>
    geofences.map(geofences => getCoord(geofences));

  const serviceGeofences = useMemo(
    () => getCoords(geofences.filter(r => r.profile.priority === 1)),
    [geofences],
  );

  if (!mainGeofence) return <></>;
  return (
    <Polygon
      outlineWidth={3}
      outlineColor={mainGeofence.profile.color.substring(0, 7)}
      coordinates={getCoord(mainGeofence)}
      color={mainGeofence.profile.color}
      holes={serviceGeofences}
    />
  );
};
