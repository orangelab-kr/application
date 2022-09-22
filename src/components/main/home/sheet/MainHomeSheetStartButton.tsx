import {faBarcode} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';
import {navigationRef} from '../../../../navigators/navigation';
import {CommonText} from '../../../common/CommonText';

export const MainHomeSheetStartButton: React.FC = () => (
  <Button onPress={() => navigationRef.current?.navigate('Qrcode')}>
    <FontAwesomeIcon icon={faBarcode} color="#fcfeff" />
    <ButtonText>시작</ButtonText>
  </Button>
);

const Button = styled(TouchableOpacity)`
  background-color: #0a0c0c;
  border-radius: 10px;
  padding: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 2px 0;
`;

const ButtonText = styled(CommonText)`
  color: #fcfeff;
  font-size: ${screenHeight / 48}px;
  margin-left: 6px;
`;
