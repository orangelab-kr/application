import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSetRecoilState} from 'recoil';
import {useDebounce} from 'use-debounce';
import {MainHomeMap} from '../../components/main/home/map/MainHomeMap';
import {MainHomeSheet} from '../../components/main/home/sheet/MainHomeSheet';
import {CameraLoc} from '../../models/cameraLoc';
import {HookResultValue} from '../../models/hookResult';
import {MainNavigatorRouteParams} from '../../models/navigation';
import {selectedKickboardCodeState} from '../../recoils/selectedKickboardCode';
import {onRegisterFCM} from '../../tools/notification';
import {onSchemeInitalize} from '../../tools/scheme';

export const Home: React.FC = () => {
  const {params} = useRoute<RouteProp<MainNavigatorRouteParams, 'Home'>>();
  const [unstableCameraLoc, setCameraLoc] =
    useState<HookResultValue<CameraLoc>>();
  const [cameraLoc] = useDebounce(unstableCameraLoc, 800);
  const setSelectedKickboard = useSetRecoilState(selectedKickboardCodeState);

  useEffect(() => {
    onSchemeInitalize();
    onRegisterFCM();
  });

  useEffect(() => {
    if (!params?.kickboardCode) return;
    setSelectedKickboard(params.kickboardCode);
  }, [params]);

  return (
    <View>
      <MainHomeMap
        // Camera Loc
        setCameraLoc={setCameraLoc}
        cameraLoc={cameraLoc}
      />
      <MainHomeSheet confirm={params?.confirm} />
    </View>
  );
};
