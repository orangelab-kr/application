import {faBolt, faMap} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';

export const MainHomeSheetRouteButton: React.FC = () => {
  return (
    <Button>
      <FontAwesomeIcon icon={faMap} color="#000" />
      <ButtonText>길 찾기</ButtonText>
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  background-color: #fff;
  border-radius: 10px;
  border-width: 1px;
  border-color: #000;
  padding: 9px;
  flex-direction: row;
`;

const ButtonText = styled(Text)`
  color: #000;
  font-size: ${screenHeight / 70}px;
  margin-left: 6px;
`;
