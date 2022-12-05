import React, {useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {MainHomeSheetMenuButton} from './MainHomeSheetMenuButton';
import {MainHomeSheetMenuPopup} from './MainHomeSheetMenuPopup';
import RNShake from 'react-native-shake';
import {menuPopupState} from '../../../../../recoils/menuPopup';
import {modeState} from '../../../../../recoils/mode';
import {navigationRef} from '../../../../../navigators/navigation';

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
