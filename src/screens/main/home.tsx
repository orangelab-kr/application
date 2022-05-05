import React, {useEffect} from 'react';
import {View} from 'react-native';
import {MainHomeMap} from '../../components/main/home/map/MainHomeMap';
import {MainHomeSheet} from '../../components/main/home/sheet/MainHomeSheet';
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
