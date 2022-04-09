import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';
import {MainHomeSheetWelcome} from './MainHomeSheetWelcome';

export const MainHomeSheet: React.FC = () => {
  return (
    <BottomSheet enableHandlePanningGesture={false} snapPoints={['16.4%']}>
      <MainHomeSheetWelcome />
    </BottomSheet>
  );
};
