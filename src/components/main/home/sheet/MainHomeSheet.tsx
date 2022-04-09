import BottomSheet from '@gorhom/bottom-sheet';
import React, {useState} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {MainHomeSheetStartButton} from './MainHomeSheetStartButton';
import {MainHomeSheetWelcome} from './MainHomeSheetWelcome';

export interface MainHomeSheetComponentInfo {
  component: React.FC;
  snapPoints: string[];
  withStartButton: boolean;
}

export const MainHomeSheetComponents: {
  [key: string]: MainHomeSheetComponentInfo;
} = {
  welcome: {
    component: MainHomeSheetWelcome,
    snapPoints: ['15.5%'],
    withStartButton: true,
  },
};

export const MainHomeSheet: React.FC = () => {
  const [mode, setMode] = useState('welcome');
  const {component, snapPoints, withStartButton} =
    MainHomeSheetComponents[mode];

  return (
    <BottomSheet enableHandlePanningGesture={false} snapPoints={snapPoints}>
      <Container>
        {component({})}
        {withStartButton && <MainHomeSheetStartButton />}
      </Container>
    </BottomSheet>
  );
};

const Container = styled(View)`
  padding: 20px 30px 0 30px;
  flex-direction: row;
  justify-content: space-between;
`;
