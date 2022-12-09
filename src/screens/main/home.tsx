import React, {useEffect} from 'react';

import {View} from 'react-native';
import {MainHomePopup} from '../../components/main/home/MainHomePopup';
import {MainHomeSearchAgain} from '../../components/main/home/MainHomeSearchAgain';
import {MainHomeMap} from '../../components/main/home/map/MainHomeMap';
import {MainHomeSheet} from '../../components/main/home/sheet/MainHomeSheet';
import {MainHomeSheetMenu} from '../../components/main/home/sheet/menu/MainHomeSheetMenu';
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
      <MainHomeSearchAgain />
      <MainHomeSheetMenu />
      <MainHomeSheet />
      <MainHomePopup />
    </View>
  );
};
