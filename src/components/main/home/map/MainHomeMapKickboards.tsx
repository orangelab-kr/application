import React from 'react';
import {Marker} from 'react-native-nmap';
import {RideKickboard} from '../../../../api/ride';
import {useKickboards} from '../../../../hooks/useKickboards';
import {CameraLoc} from '../../../../models/cameraLoc';

interface MainHomeMapKickboardProps {
  cameraLoc?: CameraLoc;
  selectedKickboard?: RideKickboard;
  setSelectedKickboard: React.Dispatch<
    React.SetStateAction<RideKickboard | undefined>
  >;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

export const MainHomeMapKickboard: React.FC<MainHomeMapKickboardProps> = ({
  cameraLoc,
  setSelectedKickboard,
  selectedKickboard,
  mode,
  setMode,
}) => {
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
