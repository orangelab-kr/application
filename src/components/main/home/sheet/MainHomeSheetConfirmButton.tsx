import {faBolt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';

export const MainHomeSheetConfirmButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Button onPress={() => navigation.navigate('Qrcode')}>
      <FontAwesomeIcon icon={faBolt} color="#fff" />
      <ButtonText>라이드{'\n'}시작하기</ButtonText>
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  background-color: #000;
  border-radius: 25px;
  padding: 15px;
  height: 100px;
  width: 100px;
  align-items: center;
  justify-content: center;
  margin: 2px 0;
`;

const ButtonText = styled(Text)`
  color: #fff;
  text-align: center;
  font-size: ${screenHeight / 48}px;
  margin-top: 6px;
`;
