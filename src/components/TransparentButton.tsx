import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../constants/screenSize';

interface TransparentButtonProps extends TouchableOpacityProps {
  size?: number;
  icon?: IconProp;
}

export const TransparentButton: React.FC<TransparentButtonProps> = ({
  icon,
  size = 18,
  children,
  ...props
}) => {
  return (
    <Button {...props}>
      {icon && <Icon icon={icon} size={size + 2} color="#fff" />}
      <Label size={size}>{children}</Label>
    </Button>
  );
};

const Icon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`;

const Button = styled(TouchableOpacity)`
  flex-direction: row;
  background-color: transparent;
  border-color: #fff;
  border-width: 2px;
  justify-content: center;
  align-items: center;
  border-radius: ${screenHeight * 0.022}px;
  padding: ${screenHeight * 0.013}px;
  shadow-color: #999;
  shadow-opacity: 0.6;
  shadow-radius: 5px;
  elevation: 1;
  shadow-offset: {width: 3px, height: 3px};
`;

const Label = styled(Text)<{size: number}>`
  font-size: ${({size}) => size}px;
  font-weight: 500;
  color: #fff;
`;
