import {faBarcode} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';
import {navigationRef} from '../../../../navigators/navigation';

export const MainHomeSheetStartButton: React.FC = () => (
  <Button onPress={() => navigationRef.current?.navigate('Qrcode')}>
    <FontAwesomeIcon icon={faBarcode} color="#fff" />
    <ButtonText>시작</ButtonText>
  </Button>
);

const Button = styled(TouchableOpacity)`
  background-color: #000;
  border-radius: 10px;
  padding: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 2px 0;
`;

const ButtonText = styled(Text)`
  color: #fff;
  font-size: ${screenHeight / 48}px;
  margin-left: 6px;
`;
