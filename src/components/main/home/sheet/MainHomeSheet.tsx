import BottomSheet from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {SafeAreaView, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import styled from 'styled-components/native';
import {modeState} from '../../../../recoils/mode';
import {BottomBar} from '../../../BottomBar';
import {MainHomeSheetConfirmButton} from './MainHomeSheetConfirmButton';
import {MainHomeSheetKickboard} from './MainHomeSheetKickboard';
import {MainHomeSheetRiding} from './MainHomeSheetRiding';
import {MainHomeSheetRouteButton} from './MainHomeSheetRouteButton';
import {MainHomeSheetStartButton} from './MainHomeSheetStartButton';
import {MainHomeSheetWelcome} from './MainHomeSheetWelcome';

export interface MainHomeSheetComponentInfo {
  component: React.FC<MainHomeSheetCommonProps>;
  snapPoints: string[];
  withStartButton: boolean;
  withRouteButton: boolean;
}

export interface MainHomeSheetCommonProps {
  confirm?: boolean;
}

export const MainHomeSheet: React.FC<MainHomeSheetCommonProps> = ({
  confirm,
}) => {
  const mode = useRecoilValue(modeState);
  const MainHomeSheetComponents: {
    [key: string]: MainHomeSheetComponentInfo;
  } = {
    welcome: {
      component: MainHomeSheetWelcome,
      snapPoints: ['20.3%', '80%'],
      withStartButton: true,
      withRouteButton: false,
    },
    kickboard: {
      component: MainHomeSheetKickboard,
      snapPoints: ['16.5%', '80%'],
      withStartButton: true,
      withRouteButton: true,
    },
    riding: {
      component: MainHomeSheetRiding,
      snapPoints: ['15.5%', '80%'],
      withStartButton: false,
      withRouteButton: false,
    },
  };

  const Mode = useMemo(() => MainHomeSheetComponents[mode], [mode]);
  if (!Mode) return <></>;

  return (
    <BottomSheet
      enableHandlePanningGesture={false}
      snapPoints={Mode.snapPoints}>
      <SafeAreaView>
        <Container>
          <Mode.component />
          <View>
            {Mode.withStartButton && confirm && <MainHomeSheetConfirmButton />}
            {Mode.withStartButton && !confirm && <MainHomeSheetStartButton />}
            {Mode.withRouteButton && !confirm && <MainHomeSheetRouteButton />}
          </View>
        </Container>
      </SafeAreaView>
      <BottomBar />
    </BottomSheet>
  );
};

const Container = styled(View)`
  padding: 12px 30px 0 30px;
  flex-direction: row;
  justify-content: space-between;
`;
