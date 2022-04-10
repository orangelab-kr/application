import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';
import {KickboardBatteryStatus} from '../../../kickboard/KickboardBatteryStatus';
import {MainHomeSheetCommonProps} from './MainHomeSheet';

export const MainHomeSheetKickboard: React.FC<MainHomeSheetCommonProps> = ({
  setMode,
  selectedKickboard,
}) => {
  if (!selectedKickboard) {
    setMode('welcome');
    return <></>;
  }

  const {kickboardCode, status} = selectedKickboard;
  return (
    <View>
      <KickboardCode>{kickboardCode}</KickboardCode>
      <Title>10M 이내에 있습니다.</Title>
      <KickboardBatteryStatus battery={status.power.scooter.battery} />
    </View>
  );
};

const KickboardCode = styled(Text)`
  color: #999;
  font-weight: 600;
  font-size: ${screenHeight / 60}px;
`;

const Title = styled(Text)`
  font-size: ${screenHeight / 38}px;
  font-weight: 300,
  color: #000
`;

const Bold = styled(Text)`
  font-weight: 800;
`;
