import React, {useEffect} from 'react';
import {Marker} from 'react-native-nmap';
import {useSetRecoilState} from 'recoil';
import {RideKickboard} from '../../../../api/ride';
import {useKickboards} from '../../../../hooks/useKickboards';
import {CameraLoc} from '../../../../models/cameraLoc';
import {HookResultValue} from '../../../../models/hookResult';
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
  const [kickboards, setKickboards] = useKickboards(cameraLoc);
  const setSelectedKickboard = useSetRecoilState(selectedKickboardCodeState);
  const selectedKickboard = useRecoilValueMaybe(selectedKickboardState);
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

  return (
    <>
      {Object.values(kickboards).map(kickboard => (
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
