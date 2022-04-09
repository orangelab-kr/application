import React, {useState} from 'react';
import {View} from 'react-native';
import {useDebounce} from 'use-debounce';
import {RideKickboard} from '../../api/ride';
import {MainHomeMap} from '../../components/main/home/map/MainHomeMap';
import {MainHomeSheet} from '../../components/main/home/sheet/MainHomeSheet';
import {CameraLoc} from '../../models/cameraLoc';

export const Home: React.FC = () => {
  const [mode, setMode] = useState<string>('welcome');
  const [unstableCameraLoc, setCameraLoc] = useState<CameraLoc>();
  const [cameraLoc] = useDebounce(unstableCameraLoc, 500);
  const [selectedKickboard, setSelectedKickboard] = useState<RideKickboard>();

  return (
    <View>
      <MainHomeMap
        // Camera Loc
        setCameraLoc={setCameraLoc}
        cameraLoc={cameraLoc}
        // Selected Kickboard
        selectedKickboard={selectedKickboard}
        setSelectedKickboard={setSelectedKickboard}
        // Mode
        mode={mode}
        setMode={setMode}
      />
      <MainHomeSheet
        // Mode
        mode={mode}
        setMode={setMode}
        // Selected Kickboard
        selectedKickboard={selectedKickboard}
        setSelectedKickboard={setSelectedKickboard}
      />
    </View>
  );
};
