import React, {FC} from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../constants/screenSize';

export interface BlockButtonProps extends TouchableOpacityProps {
  backgroundColor?: string;
  color?: string;
}

export const BottomButton: FC<BlockButtonProps> = ({
  backgroundColor = '#0a0c0c',
  color = '#fcfeff',
  children,
  ...props
}) => {
  return (
    <Button {...props} style={{backgroundColor}}>
      <ButtonText style={{color}}>{children}</ButtonText>
    </Button>
  );
};

const ButtonText = styled(Text)`
  font-weight: 600;
  font-size: ${screenHeight / 40}px;
  margin-bottom: ${screenHeight * 0.015}px;
`;

const Button = styled(TouchableOpacity)`
  width: 100%;
  height: ${screenHeight / 11}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
`;
