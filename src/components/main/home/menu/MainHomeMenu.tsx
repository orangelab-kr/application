import React from 'react';
import {useRecoilValue} from 'recoil';
import {currentRideState} from '../../../../recoils/currentRide';
import {MainHomeMenuButton} from './MainHomeMenuButton';

export const MainHomeMenu: React.FC = () => {
  const currentRide = useRecoilValue(currentRideState);
  return <>{true /** currentRide */ && <MainHomeMenuButton />}</>;
};
