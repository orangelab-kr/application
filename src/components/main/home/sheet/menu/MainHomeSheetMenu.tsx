import React, {useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import RNShake from 'react-native-shake';
import {navigationRef} from '../../../../../navigators/navigation';
import {currentRideState} from '../../../../../recoils/currentRide';
import {menuPopupState} from '../../../../../recoils/menuPopup';
import {modeState} from '../../../../../recoils/mode';
import {useRecoilValueMaybe} from '../../../../../tools/recoil';
import {MainHomeSheetMenuButton} from './MainHomeSheetMenuButton';
import {MainHomeSheetMenuPopup} from './MainHomeSheetMenuPopup';

export const MainHomeSheetMenu: React.FC = () => {
  const mode = useRecoilValue(modeState);
  const currentRide = useRecoilValueMaybe(currentRideState);
  const setMenuPopup = useSetRecoilState(menuPopupState);
  useEffect(() => {
    if (mode === 'welcome') return;
    setMenuPopup(false);
  }, [mode]);

  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      if (mode === 'welcome') {
        navigationRef.current?.navigate('Qrcode');
        return;
      }

      if (currentRide) return;
      setMenuPopup(true);
    });

    return () => subscription.remove();
  });

  return (
    <>
      <MainHomeSheetMenuButton />
      <MainHomeSheetMenuPopup />
    </>
  );
};
