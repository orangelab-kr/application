import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDebounce} from 'use-debounce';
import {MainHomeMap} from '../../components/main/home/map/MainHomeMap';
import {MainHomeSheet} from '../../components/main/home/sheet/MainHomeSheet';
import {CameraLoc} from '../../models/cameraLoc';
import {HookResultValue} from '../../models/hookResult';
import {onRegisterFCM} from '../../tools/notification';
import {onSchemeInitalize} from '../../tools/scheme';

export const Home: React.FC = () => {
  useEffect(() => {
    onSchemeInitalize();
    onRegisterFCM();
  });

  return (
    <View>
      <MainHomeMap />
      <MainHomeSheet />
    </View>
  );
};
