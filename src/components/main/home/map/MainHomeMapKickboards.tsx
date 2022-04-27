import React, {useEffect} from 'react';
import {Marker} from 'react-native-nmap';
import {RideKickboard} from '../../../../api/ride';
import {useKickboards} from '../../../../hooks/useKickboards';
import {CameraLoc} from '../../../../models/cameraLoc';
import {
  HookResultSetValue,
  HookResultValue,
} from '../../../../models/hookResult';

interface MainHomeMapKickboardProps {
  cameraLoc?: HookResultValue<CameraLoc>;
  selectedKickboard?: HookResultValue<RideKickboard>;
  setSelectedKickboard: HookResultSetValue<RideKickboard>;
  mode: HookResultValue<string>;
  setMode: HookResultSetValue<string, never>;
}

export const MainHomeMapKickboard: React.FC<MainHomeMapKickboardProps> = ({
  cameraLoc,
  setSelectedKickboard,
  selectedKickboard,
  mode,
  setMode,
}) => {
  if (!cameraLoc) return <></>;
  const [kickboards, setKickboards] = useKickboards(cameraLoc);
  if (!kickboards) return <></>;

  const onKickboardClick = (kickboard: RideKickboard) => () =>
    setSelectedKickboard(kickboard);

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
