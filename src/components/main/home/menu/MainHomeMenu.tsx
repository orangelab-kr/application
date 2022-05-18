import React, {useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {currentRideState} from '../../../../recoils/currentRide';
import {menuPopupState} from '../../../../recoils/MenuPopup';
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

  return (
    <>
      {mode !== 'welcome' && <MainHomeMenuButton />}
      <MainHomeMenuPopup />
    </>
  );
};
