import React, {useEffect} from 'react';
import {View} from 'react-native';
import {MainHomePopup} from '../../components/main/home/MainHomePopup';
import {MainHomeMap} from '../../components/main/home/map/MainHomeMap';
import {MainHomeMenu} from '../../components/main/home/menu/MainHomeMenu';
import {MainHomeSheet} from '../../components/main/home/sheet/MainHomeSheet';
import {onRegisterFCM} from '../../tools/notification';
import {onSchemeInitalize} from '../../tools/scheme';

export const Home: React.FC = () => {
  useEffect(() => {
    onSchemeInitalize();
    onRegisterFCM();
  }, []);

  return (
    <View>
      <MainHomeMap />
      <MainHomeMenu />
      <MainHomeSheet />
      <MainHomePopup />
    </View>
  );
};
