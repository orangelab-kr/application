import React from 'react';
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
  const [kickboards] = useKickboards(cameraLoc);
  if (!kickboards) return <></>;

  const onKickboardClick = (kickboard: RideKickboard) => () => {
    setMode('kickboard');
    setSelectedKickboard(kickboard);
  };

  return (
    <>
      {kickboards.map(kickboard => (
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
