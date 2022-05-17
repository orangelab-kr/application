import React, {FC} from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../constants/screenSize';

export interface BlockButtonProps extends TouchableOpacityProps {}

export const BottomButton: FC<BlockButtonProps> = ({children, ...props}) => {
  return (
    <Button {...props}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
};

const ButtonText = styled(Text)`
  color: #fff;
  font-weight: 600;
  font-size: ${screenHeight / 40}px;
  margin-bottom: ${screenHeight * 0.015}px;
`;

const Button = styled(TouchableOpacity)`
  width: 100%;
  height: ${screenHeight / 11}px;
  background-color: #000;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
`;
