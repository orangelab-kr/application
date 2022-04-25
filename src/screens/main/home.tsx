import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDebounce} from 'use-debounce';
import {RideKickboard} from '../../api/ride';
import {MainHomeMap} from '../../components/main/home/map/MainHomeMap';
import {MainHomeSheet} from '../../components/main/home/sheet/MainHomeSheet';
import {CameraLoc} from '../../models/cameraLoc';
import {HookResultValue} from '../../models/hookResult';
import {onRegisterFCM} from '../../tools/notification';
import {onSchemeInitalize} from '../../tools/scheme';

export const Home: React.FC = () => {
  const [mode, setMode] = useState<string>('welcome');
  const [unstableCameraLoc, setCameraLoc] =
    useState<HookResultValue<CameraLoc>>();
  const [cameraLoc] = useDebounce(unstableCameraLoc, 800);
  const [selectedKickboard, setSelectedKickboard] =
    useState<HookResultValue<RideKickboard>>();

  useEffect(() => {
    onSchemeInitalize();
    onRegisterFCM();
  }, []);

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
