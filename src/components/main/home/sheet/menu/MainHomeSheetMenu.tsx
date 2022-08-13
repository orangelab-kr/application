import React, {useEffect} from 'react';
import RNShake from 'react-native-shake';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {navigationRef} from '../../../../../navigators/navigation';
import {menuPopupState} from '../../../../../recoils/menuPopup';
import {modeState} from '../../../../../recoils/mode';
import {MainHomeSheetMenuButton} from './MainHomeSheetMenuButton';
import {MainHomeSheetMenuPopup} from './MainHomeSheetMenuPopup';

export const MainHomeSheetMenu: React.FC = () => {
  const mode = useRecoilValue(modeState);
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
