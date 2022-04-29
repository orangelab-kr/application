import React from 'react';
import {Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';
import {currentRideState} from '../../../../recoils/currentRide';
import {KickboardBatteryStatus} from '../../../kickboard/KickboardBatteryStatus';
import {MainHomeSheetCommonProps} from './MainHomeSheet';

export const MainHomeSheetRiding: React.FC<MainHomeSheetCommonProps> = ({}) => {
  const [currentRide] = useRecoilState(currentRideState);

  if (!currentRide) return <></>;
  return (
    <Container>
      <View style={{marginRight: 10}}>
        <KickboardCode>{currentRide.kickboardCode}</KickboardCode>
        <Title>10분 30초 이용 중... </Title>
        <KickboardBatteryStatus battery={66} />
      </View>
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: row;
`;

const Distance = styled(Text)`
  color: #000;
  font-size: ${screenHeight / 36}px;
`;

const KickboardCode = styled(Text)`
  color: #999;
  font-weight: 600;
  font-size: ${screenHeight / 45}px;
`;

const Title = styled(Text)`
  font-size: ${screenHeight / 30}px;
  font-weight: 300,
  color: #000
`;

const Bold = styled(Text)`
  font-weight: 800;
`;
