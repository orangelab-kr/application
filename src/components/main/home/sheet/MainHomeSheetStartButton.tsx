import {faBolt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';

export const MainHomeSheetStartButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Button onPress={() => navigation.navigate('Qrcode')}>
      <FontAwesomeIcon icon={faBolt} color="#fff" />
      <ButtonText>시작</ButtonText>
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  background-color: #000;
  border-radius: 10px;
  padding: 15px;
  flex-direction: row;
  margin: 2px 0;
`;

const ButtonText = styled(Text)`
  color: #fff;
  font-size: ${screenHeight / 48}px;
  margin-left: 6px;
`;
