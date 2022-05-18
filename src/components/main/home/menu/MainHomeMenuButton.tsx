import {faSliders} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';

export const MainHomeMenuButton: React.FC<TouchableOpacityProps> = props => {
  return (
    <Button {...props}>
      <FontAwesomeIcon icon={faSliders} color="#000" size={15} />
      <ButtonText>메뉴</ButtonText>
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  flex-direction: row;
  position: absolute;
  padding: 12px;
  border-radius: 8px;
  background-color: #fff;
  top: ${screenHeight * 0.07}px;
  right: ${screenHeight * 0.025}px;
  shadow-color: #999;
  shadow-opacity: 1;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 6px, height: 6px};
`;

const ButtonText = styled(Text)`
  margin-left: 5px;
  font-weight: 800;
  color: #000;
`;
