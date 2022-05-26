import React, {useEffect} from 'react';
import RNShake from 'react-native-shake';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {menuPopupState} from '../../../../recoils/menuPopup';
import {modeState} from '../../../../recoils/mode';
import {MainHomeMenuButton} from './MainHomeMenuButton';
import {MainHomeMenuPopup} from './MainHomeMenuPopup';

export const MainHomeMenu: React.FC = () => {
  const mode = useRecoilValue(modeState);
  const setMenuPopup = useSetRecoilState(menuPopupState);
  useEffect(() => {
    if (mode === 'welcome') return;
    setMenuPopup(false);
  }, [mode]);

  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      if (mode === 'welcome') return;
      setMenuPopup(true);
    });

    return () => subscription.remove();
  });

  return (
    <>
      {mode !== 'welcome' && <MainHomeMenuButton />}
      <MainHomeMenuPopup />
    </>
  );
};
