import BottomSheet from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {SafeAreaView, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import styled from 'styled-components/native';
import {modeState} from '../../../../recoils/mode';
import {selectedKickboardCodeState} from '../../../../recoils/selectedKickboardCode';
import {BottomBar} from '../../../BottomBar';
import {MainHomeSheetConfirmButton} from './MainHomeSheetConfirmButton';
import {MainHomeSheetControlButton} from './MainHomeSheetControlButton';
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
  withControlButton: boolean;
  withBottomBar: boolean;
}

export interface MainHomeSheetCommonProps {
  confirm?: boolean;
}

export const MainHomeSheet: React.FC<MainHomeSheetCommonProps> = ({
  confirm,
}) => {
  const selectedKickboard = useRecoilValue(selectedKickboardCodeState);
  const showConfirm = selectedKickboard && confirm;
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
      snapPoints: ['16%', '80%'],
      withStartButton: true,
      withRouteButton: true,
      withControlButton: false,
      withBottomBar: false,
    },
    riding: {
      component: MainHomeSheetRiding,
      snapPoints: ['16%', '80%'],
      withStartButton: false,
      withRouteButton: false,
      withControlButton: true,
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
            {Mode.withStartButton && showConfirm && (
              <MainHomeSheetConfirmButton />
            )}

            {Mode.withStartButton && !showConfirm && (
              <MainHomeSheetStartButton />
            )}

            {Mode.withRouteButton && !showConfirm && (
              <MainHomeSheetRouteButton />
            )}

            {Mode.withControlButton && <MainHomeSheetControlButton />}
          </View>
        </Container>
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
