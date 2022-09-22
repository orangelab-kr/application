import {
  faBatteryEmpty,
  faBatteryFull,
  faBatteryHalf,
  faBatteryQuarter,
  faBatteryThreeQuarters,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {screenHeight} from '../../constants/screenSize';
import {CommonText} from '../common/CommonText';

export interface KickboardBatteryStatusProps {
  battery: number;
  text?: string;
}

export const KickboardBatteryStatus: React.FC<KickboardBatteryStatusProps> = ({
  battery,
  text,
}) => {
  const icon =
    battery > 90
      ? faBatteryFull
      : battery > 70
      ? faBatteryThreeQuarters
      : battery > 50
      ? faBatteryHalf
      : battery > 30
      ? faBatteryQuarter
      : faBatteryEmpty;

  return (
    <Container>
      <FontAwesomeIcon icon={icon} size={25} />
      <Percent>
        {battery}% {text && text}
      </Percent>
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const Percent = styled(CommonText)`
  color: #999;
  margin-left: 5px;
  font-size: ${screenHeight / 52}px;
`;
