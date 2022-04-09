import React, {useState} from 'react';
import {View} from 'react-native';
import {useDebounce} from 'use-debounce';
import {MainHomeMap} from '../../components/main/home/map/MainHomeMap';
import {MainHomeSheet} from '../../components/main/home/sheet/MainHomeSheet';
import {CameraLoc} from '../../models/cameraLoc';

export const Home: React.FC = () => {
  const [unstableCameraLoc, setCameraLoc] = useState<CameraLoc>();
  const [cameraLoc] = useDebounce(unstableCameraLoc, 500);

  return (
    <View>
      <MainHomeMap setCameraLoc={setCameraLoc} cameraLoc={cameraLoc} />
      <MainHomeSheet />
    </View>
  );
};
