import BottomSheet from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {RideKickboard} from '../../../../api/ride';
import {
  HookResultSetValue,
  HookResultValue,
} from '../../../../models/hookResult';
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
  mode: HookResultValue<string, never>;
  setMode: HookResultSetValue<string, never>;
  selectedKickboard?: HookResultValue<RideKickboard>;
  setSelectedKickboard: HookResultSetValue<RideKickboard>;
}

export const MainHomeSheet: React.FC<MainHomeSheetCommonProps> = ({
  mode,
  setMode,
  selectedKickboard,
  setSelectedKickboard,
}) => {
  const MainHomeSheetComponents: {
    [key: string]: MainHomeSheetComponentInfo;
  } = {
    welcome: {
      component: MainHomeSheetWelcome,
      snapPoints: ['11.5%'],
      withStartButton: true,
      withRouteButton: false,
    },
    kickboard: {
      component: MainHomeSheetKickboard,
      snapPoints: ['18%'],
      withStartButton: true,
      withRouteButton: true,
    },
    riding: {
      component: MainHomeSheetRiding,
      snapPoints: ['18%'],
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
      <Container>
        <Mode.component
          // Mode
          mode={mode}
          setMode={setMode}
          // Selected Kickboard
          selectedKickboard={selectedKickboard}
          setSelectedKickboard={setSelectedKickboard}
        />

        <View>
          {Mode.withStartButton && <MainHomeSheetStartButton />}
          {Mode.withRouteButton && (
            <MainHomeSheetRouteButton kickboard={selectedKickboard} />
          )}
        </View>
      </Container>
    </BottomSheet>
  );
};

const Container = styled(View)`
  padding: 12px 30px 0 30px;
  flex-direction: row;
  justify-content: space-between;
`;
