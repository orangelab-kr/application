import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {checkMultiple} from 'react-native-permissions';
import styled from 'styled-components/native';
import {screenHeight, screenWidth} from '../constants/screenSize';
import {useUser} from '../hooks/useUser';
import {requiredPermissions} from './permission';

export const Splash: React.FC = () => {
  const navigation = useNavigation();
  const user = useUser({cache: true});

  useEffect(() => {
    checkMultiple(requiredPermissions).then(permissions => {
      const isAllow = (p: string) => !['granted', 'unavailable'].includes(p);
      if (Object.values(permissions).find(isAllow)) {
        return navigation.navigate('Permission');
      }

      if (user === undefined) return;
      if (user == null) return navigation.navigate('Start');
      navigation.navigate('Main');
    });
  }, [user]);

  return (
    <View style={{flex: 1}}>
      <Container>
        <Logo source={require('../assets/logo.png')} />
        <Description>이동을 즐겁게,</Description>
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
  shadow-color: #999;
  shadow-opacity: 0.3;
  shadow-radius: 3px;
  elevation: 5;
  shadow-offset: {height: 3px, width: 3px};
`;

const ProgressMessage = styled(Text)`
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 20px;
  color: #999;
`;
