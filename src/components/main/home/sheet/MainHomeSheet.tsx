import BottomSheet from '@gorhom/bottom-sheet';
import React, {useMemo, useRef} from 'react';
import {SafeAreaView, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import styled from 'styled-components/native';
import {modeState} from '../../../../recoils/mode';
import {MainHomeSheetConfirm} from './MainHomeSheetConfirm';
import {MainHomeSheetControl} from './MainHomeSheetControl';
import {MainHomeSheetControlButton} from './MainHomeSheetControlButton';
import {MainHomeSheetCoupon} from './MainHomeSheetCoupon';
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

export interface MainHomeSheetCommonProps {
  sheetRef: React.MutableRefObject<BottomSheet | null>;
}

export const MainHomeSheet: React.FC = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const mode = useRecoilValue(modeState);
  const MainHomeSheetComponents: {
    [key: string]: MainHomeSheetComponentInfo;
  } = {
    welcome: {
      component: MainHomeSheetWelcome,
      snapPoints: ['14%'],
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
      snapPoints: ['32%'],
      withStartButton: false,
      withRouteButton: false,
      withControlButton: true,
      withBottomBar: false,
    },
    region: {
      component: MainHomeSheetRegion,
      snapPoints: ['30%'],
      withStartButton: true,
      withRouteButton: false,
      withControlButton: false,
      withBottomBar: false,
    },
    confirm: {
      component: MainHomeSheetConfirm,
      snapPoints: ['30%'],
      withStartButton: false,
      withRouteButton: false,
      withControlButton: false,
      withBottomBar: false,
    },
    coupon: {
      component: MainHomeSheetCoupon,
      snapPoints: ['37%'],
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
      ref={sheetRef}
      enableHandlePanningGesture={false}
      handleComponent={MainHomeSheetHandle}
      snapPoints={Mode.snapPoints}>
      <SafeAreaView>
        <Container>
          <Mode.component sheetRef={sheetRef} />
          {withButtons && (
            <View style={{justifyContent: 'center'}}>
              {Mode.withStartButton && <MainHomeSheetStartButton />}
              {Mode.withRouteButton && <MainHomeSheetRouteButton />}
              {Mode.withControlButton && (
                <MainHomeSheetControlButton sheetRef={sheetRef} />
              )}
            </View>
          )}
        </Container>
      </SafeAreaView>
      {mode === 'riding' && <MainHomeSheetControl />}
    </BottomSheet>
  );
};

const Container = styled(View)`
  padding: 22px 30px 0 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
