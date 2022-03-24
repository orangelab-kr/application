import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View} from 'react-native';
import styled from 'styled-components';
import {screenHeight, screenWidth} from '../constants/screenSize';

export const Splash: React.FC = () => {
  const navigation = useNavigation();
  setTimeout(() => navigation.navigate('Start'), 1000);

  return (
    <View style={{flex: 1}}>
      <Container>
        <Logo source={require('../assets/logo.png')} />
        <Description
          style={{
            shadowColor: '#999',
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 5,
            shadowOffset: {
              height: 3,
              width: 3,
            },
          }}>
          이동을 즐겁게,
        </Description>
      </Container>
      <ProgressMessage>어플리케이션 초기화 중...</ProgressMessage>
    </View>
  );
};

const Container = styled(View)`
  margin-top: ${screenHeight * 0.36}px;
  margin-left: ${screenWidth * 0.08}px;
`;

const Logo = styled(Image)`
  width: ${screenWidth * 0.5}px;
  resize-mode: contain;
`;

const Description = styled(Text)`
  margin-top: 5px;
  font-size: 20px;
  font-weight: 400;
`;

const ProgressMessage = styled(Text)`
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 20px;
  color: #999;
`;
