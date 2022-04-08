import React from 'react';
import {Marker} from 'react-native-nmap';
import {useKickboards} from '../../../../hooks/useKickboards';
import {CameraLoc} from '../../../../models/cameraLoc';

interface MainHomeMapKickboardProps {
  cameraLoc?: CameraLoc;
}

export const MainHomeMapKickboard: React.FC<MainHomeMapKickboardProps> = ({
  cameraLoc,
}) => {
  const [kickboards] = useKickboards(cameraLoc);
  if (!kickboards) return <></>;
  return (
    <>
      {kickboards.map(kickboard => (
        <Marker
          coordinate={kickboard.status.gps}
          key={kickboard.kickboardCode}
        />
      ))}
    </>
  );
};
