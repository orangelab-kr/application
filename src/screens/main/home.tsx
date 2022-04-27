import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useRecoilState} from 'recoil';
import {useDebounce} from 'use-debounce';
import {RideClient, RideKickboard} from '../../api/ride';
import {MainHomeMap} from '../../components/main/home/map/MainHomeMap';
import {MainHomeSheet} from '../../components/main/home/sheet/MainHomeSheet';
import {CameraLoc} from '../../models/cameraLoc';
import {HookResultValue} from '../../models/hookResult';
import {MainNavigatorRouteParams} from '../../models/navigation';
import {currentRideState} from '../../recoils/currentRide';
import {onRegisterFCM} from '../../tools/notification';
import {onSchemeInitalize} from '../../tools/scheme';

export const Home: React.FC = () => {
  const [currentRide] = useRecoilState(currentRideState);
  const {params} = useRoute<RouteProp<MainNavigatorRouteParams, 'Home'>>();
  const [mode, setMode] = useState<string>('welcome');
  const [unstableCameraLoc, setCameraLoc] =
    useState<HookResultValue<CameraLoc>>();
  const [cameraLoc] = useDebounce(unstableCameraLoc, 800);
  const [selectedKickboard, setSelectedKickboard] =
    useState<HookResultValue<RideKickboard>>();

  useEffect(() => {
    onSchemeInitalize();
    onRegisterFCM();
  });

  useEffect(() => {
    if (mode === 'riding') return;
    if (!currentRide) return;
    setMode('riding');
  }, [currentRide, mode]);

  useEffect(() => {
    if (!params?.kickboardCode) return;
    RideClient.getKickboard(params?.kickboardCode).then(res =>
      setSelectedKickboard(res.kickboard),
    );
  }, [params]);

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
        confirm={params?.confirm}
      />
    </View>
  );
};
