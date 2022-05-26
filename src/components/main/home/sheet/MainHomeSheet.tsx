import BottomSheet from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {SafeAreaView, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import styled from 'styled-components/native';
import {modeState} from '../../../../recoils/mode';
import {BottomBar} from '../../../BottomBar';
import {MainHomeSheetConfirm} from './MainHomeSheetConfirm';
import {MainHomeSheetControlButton} from './MainHomeSheetControlButton';
import {MainHomeSheetHandle} from './MainHomeSheetHandle';
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
  const mode = useRecoilValue(modeState);
  const MainHomeSheetComponents: {
    [key: string]: MainHomeSheetComponentInfo;
  } = {
    welcome: {
      component: MainHomeSheetWelcome,
      snapPoints: ['17.3%', '80%'],
      withStartButton: true,
      withRouteButton: false,
      withControlButton: false,
      withBottomBar: true,
    },
    kickboard: {
      component: MainHomeSheetKickboard,
      snapPoints: ['15%'],
      withStartButton: true,
      withRouteButton: true,
      withControlButton: false,
      withBottomBar: false,
    },
    riding: {
      component: MainHomeSheetRiding,
      snapPoints: ['17%', '80%'],
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
    confirm: {
      component: MainHomeSheetConfirm,
      snapPoints: ['38%'],
      withStartButton: false,
      withRouteButton: false,
      withControlButton: false,
      withBottomBar: false,
    },
  };

  const Mode = useMemo(() => MainHomeSheetComponents[mode], [mode]);
  if (!Mode) return <></>;
  const withButtons =
    Mode.withBottomBar || Mode.withRouteButton || Mode.withControlButton;

  return (
    <BottomSheet
      enableHandlePanningGesture={false}
      handleComponent={MainHomeSheetHandle}
      snapPoints={Mode.snapPoints}>
      <SafeAreaView>
        <Container>
          <Mode.component />
          {withButtons && (
            <View style={{justifyContent: 'center'}}>
              {Mode.withStartButton && <MainHomeSheetStartButton />}
              {Mode.withRouteButton && <MainHomeSheetRouteButton />}
              {Mode.withControlButton && <MainHomeSheetControlButton />}
            </View>
          )}
        </Container>
      </SafeAreaView>
      {Mode.withBottomBar && <BottomBar />}
    </BottomSheet>
  );
};

const Container = styled(View)`
  padding: 22px 30px 0 30px;
  flex-direction: row;
  justify-content: space-between;
`;
