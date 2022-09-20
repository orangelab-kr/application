import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {screenWidth} from '../../../constants/screenSize';

export interface RegionPolicyItemProps {
  icon: IconProp;
  title: string;
  details: string;
  color?: string;
}

export const RegionPolicyItem: React.FC<RegionPolicyItemProps> = ({
  icon,
  title,
  details,
  color = '#FF0000',
}) => {
  return (
    <Container>
      <Icon icon={icon} size={35} color={color} />
      <Title color={color}>{title}</Title>
      <Details color={color}>{details}</Details>
    </Container>
  );
};

interface withColor {
  color?: string;
}

const Container = styled(View)`
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)<withColor>`
  text-align: center;
  color: ${({color}) => color};
`;

const Title = styled(Text)<withColor>`
  margin-top: 10px;
  text-align: center;
  font-size: ${screenWidth / 20}px;
  color: ${({color}) => color};
  font-weight: 700;
`;

const Details = styled(Text)<withColor>`
  text-align: center;
  font-size: ${screenWidth / 28}px;
  color: ${({color}) => color};
  font-weight: 400;
`;
