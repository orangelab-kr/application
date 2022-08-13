import React from 'react';
import {MainHomeSheetLocationButton} from './MainHomeSheetLocationButton';
import {MainHomeSheetMenuButton} from './menu/MainHomeSheetMenuButton';

export const MainHomeSheetHandle: React.FC = () => {
  return (
    <>
      <MainHomeSheetLocationButton />
      <MainHomeSheetMenuButton />
    </>
  );
};
