import BottomSheet from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {SafeAreaView, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import styled from 'styled-components/native';
import {confirmState} from '../../../../recoils/confirm';
import {modeState} from '../../../../recoils/mode';
import {BottomBar} from '../../../BottomBar';
import {MainHomeSheetConfirmButton} from './MainHomeSheetConfirmButton';
import {MainHomeSheetControlButton} from './MainHomeSheetControlButton';
import {MainHomeSheetKickboard} from './MainHomeSheetKickboard';
import {MainHomeSheetRegion} from './MainHomeSheetRegion';
import {MainHomeSheetRiding} from './MainHomeSheetRiding';
import {MainHomeSheetRouteButton} from './MainHomeSheetRouteButton';
import {MainHomeSheetStartButton} from './MainHomeSheetStartButton';
import {MainHomeSheetWelcome} from './MainHomeSheetWelcome';

export interface MainHomeSheetComponentInfo {
  component: React.FC<MainHomeSheetCommonProps>;
  snapPoints: string[];
  withStartButton: boolean;
  withRouteButton: boolean;
  withControlButton: boolean;
  withBottomBar: boolean;
}

export interface MainHomeSheetCommonProps {}

export const MainHomeSheet: React.FC<MainHomeSheetCommonProps> = () => {
  const confirm = useRecoilValue(confirmState);
  const mode = useRecoilValue(modeState);
  const MainHomeSheetComponents: {
    [key: string]: MainHomeSheetComponentInfo;
  } = {
    welcome: {
      component: MainHomeSheetWelcome,
      snapPoints: ['20.3%', '80%'],
      withStartButton: true,
      withRouteButton: false,
      withControlButton: false,
      withBottomBar: true,
    },
    kickboard: {
      component: MainHomeSheetKickboard,
      snapPoints: [confirm ? '25%' : '16%'],
      withStartButton: true,
      withRouteButton: true,
      withControlButton: false,
      withBottomBar: false,
    },
    riding: {
      component: MainHomeSheetRiding,
      snapPoints: ['18%', '80%'],
      withStartButton: false,
      withRouteButton: false,
      withControlButton: true,
      withBottomBar: false,
    },
    region: {
      component: MainHomeSheetRegion,
      snapPoints: ['15%'],
      withStartButton: true,
      withRouteButton: false,
      withControlButton: false,
      withBottomBar: false,
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
          <View style={{justifyContent: 'center'}}>
            {Mode.withStartButton && !confirm && <MainHomeSheetStartButton />}
            {Mode.withRouteButton && !confirm && <MainHomeSheetRouteButton />}
            {Mode.withControlButton && <MainHomeSheetControlButton />}
          </View>
        </Container>
        {Mode.withStartButton && confirm && <MainHomeSheetConfirmButton />}
      </SafeAreaView>
      {Mode.withBottomBar && <BottomBar />}
    </BottomSheet>
  );
};

const Container = styled(View)`
  padding: 12px 30px 0 30px;
  flex-direction: row;
  justify-content: space-between;
`;
