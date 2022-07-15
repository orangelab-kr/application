import React, {useMemo} from 'react';
import {Coord, Polygon} from 'react-native-nmap';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {RideRegionGeofence} from '../../../../api/ride';
import {confirmState} from '../../../../recoils/confirm';
import {geofencesState} from '../../../../recoils/geofences';
import {selectedKickboardCodeState} from '../../../../recoils/selectedKickboardCode';
import {selectedGeofenceState} from '../../../../recoils/selectedRegion';

export const MainHomeMapGeofences: React.FC = () => {
  const geofences = useRecoilValue(geofencesState);
  const setConfirm = useSetRecoilState(confirmState);
  const [selectedGeofence, setSelectedGeofence] = useRecoilState(
    selectedGeofenceState,
  );

  const [selectedKickboardCode, setSelectedKickboard] = useRecoilState(
    selectedKickboardCodeState,
  );

  const getCoord = (geofence: RideRegionGeofence): Coord[] =>
    geofence.geojson.coordinates[0].map(([longitude, latitude]) => ({
      latitude,
      longitude,
    }));

  const otherGeofences = useMemo(
    () => geofences.filter(r => r.profile.priority > 1),
    [geofences],
  );

  const onClick = (geofence: RideRegionGeofence) => () => {
    if (selectedKickboardCode) {
      setConfirm(false);
      setSelectedKickboard(undefined);
      return;
    }

    if (selectedGeofence === geofence || geofence.profile.priority === 0) {
      setSelectedGeofence(undefined);
      return;
    }

    setSelectedGeofence(geofence);
  };

  if (!otherGeofences) return <></>;
  return (
    <>
      {otherGeofences.map(geofence => (
        <Polygon
          onClick={onClick(geofence)}
          coordinates={getCoord(geofence)}
          outlineColor={geofence.profile.color.substring(0, 7)}
          color={geofence.profile.color}
          key={geofence.geofenceId}
          outlineWidth={1}
        />
      ))}
    </>
  );
};
