import React, {useEffect} from 'react';
import {Marker} from 'react-native-nmap';
import {useRecoilState, useRecoilValue} from 'recoil';
import {RideKickboard} from '../../../../api/ride';
import {useKickboards} from '../../../../hooks/useKickboards';
import {CameraLoc} from '../../../../models/cameraLoc';
import {HookResultValue} from '../../../../models/hookResult';
import {currentRideState} from '../../../../recoils/currentRide';
import {selectedKickboardState} from '../../../../recoils/selectedKickboard';
import {selectedKickboardCodeState} from '../../../../recoils/selectedKickboardCode';
import {useRecoilValueMaybe} from '../../../../tools/recoil';

interface MainHomeMapKickboardProps {
  cameraLoc?: HookResultValue<CameraLoc>;
}

export const MainHomeMapKickboard: React.FC<MainHomeMapKickboardProps> = ({
  cameraLoc,
}) => {
  if (!cameraLoc) return <></>;
  const currentRide = useRecoilValue(currentRideState);
  const [kickboards, setKickboards] = useKickboards(cameraLoc);
  const selectedKickboard = useRecoilValueMaybe(selectedKickboardState);
  const [selectedKickboardCode, setSelectedKickboard] = useRecoilState(
    selectedKickboardCodeState,
  );

  if (!kickboards) return <></>;
  const onKickboardClick = (kickboard: RideKickboard) => () =>
    setSelectedKickboard(kickboard.kickboardCode);

  useEffect(
    () =>
      setKickboards(kickboards => {
        if (!selectedKickboard) return kickboards;
        kickboards[selectedKickboard.kickboardCode] = selectedKickboard;
        return kickboards;
      }),
    [selectedKickboard],
  );

  useEffect(() => {
    if (!currentRide) return;
    if (selectedKickboardCode === currentRide.kickboardCode) return;
    setSelectedKickboard(currentRide.kickboardCode);
  }, [currentRide]);

  const filter = (k: RideKickboard) => {
    if (!currentRide) return true;
    return currentRide.kickboardCode === k.kickboardCode;
  };

  return (
    <>
      {Object.values(kickboards)
        .filter(filter)
        .map(kickboard => (
          <Marker
            width={35}
            height={50}
            image={require('../../../../assets/pin-ride.png')}
            coordinate={kickboard.status.gps}
            key={kickboard.kickboardCode}
            onClick={onKickboardClick(kickboard)}
          />
        ))}
    </>
  );
};
