import React, {useEffect} from 'react';
import {Marker} from 'react-native-nmap';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {RideKickboard} from '../../../../api/ride';
import {confirmState} from '../../../../recoils/confirm';
import {currentRideState} from '../../../../recoils/currentRide';
import {kickboardsState} from '../../../../recoils/kickboards';
import {selectedKickboardState} from '../../../../recoils/selectedKickboard';
import {selectedKickboardCodeState} from '../../../../recoils/selectedKickboardCode';
import {useRecoilValueMaybe} from '../../../../tools/recoil';

const marker = require('../../../../assets/pin-ride.png');

interface MainHomeMapKickboardProps {}

export const MainHomeMapKickboard: React.FC<
  MainHomeMapKickboardProps
> = ({}) => {
  const currentRide = useRecoilValue(currentRideState);
  const setConfirm = useSetRecoilState(confirmState);
  const [kickboards, setKickboards] = useRecoilState(kickboardsState);
  const selectedKickboard = useRecoilValueMaybe(selectedKickboardState);
  const [selectedKickboardCode, setSelectedKickboard] = useRecoilState(
    selectedKickboardCodeState,
  );

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

    setConfirm(false);
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
            image={marker}
            coordinate={kickboard.status.gps}
            key={kickboard.kickboardCode}
            onClick={onKickboardClick(kickboard)}
          />
        ))}
    </>
  );
};
