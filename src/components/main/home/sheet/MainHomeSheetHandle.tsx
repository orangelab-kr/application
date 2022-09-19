import React from 'react';
import {MainHomeCentercoinBanner} from '../MainHomeCentercoinBanner';
import {MainHomeSheetLocationButton} from './MainHomeSheetLocationButton';
import {MainHomeSheetMenuButton} from './menu/MainHomeSheetMenuButton';

export const MainHomeSheetHandle: React.FC = () => {
  return (
    <>
      <MainHomeCentercoinBanner />
      <MainHomeSheetLocationButton />
      <MainHomeSheetMenuButton />
    </>
  );
};
