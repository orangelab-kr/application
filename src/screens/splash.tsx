import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import CodePush from 'react-native-code-push';
import {checkMultiple} from 'react-native-permissions';
import styled from 'styled-components/native';
import {screenHeight, screenWidth} from '../constants/screenSize';
import {navigationRef} from '../navigators/navigation';
import {loginedUserState} from '../recoils/loginedUser';
import {useRecoilValueMaybe} from '../tools/recoil';
import {requiredPermissions} from './permission';

type StatusType = 'starting' | 'checking' | 'updating';
export const StatusMessage: {
  [K in StatusType]: string;
} = {
  starting: '어플리케이션 실행 중...',
  checking: '업데이트 확인 중...',
  updating: '업데이트 중...',
};

export const Splash: React.FC = () => {
  const user = useRecoilValueMaybe(loginedUserState);
  const [status, setStatus] = useState<StatusType>('starting');
  const navigation = useNavigation();

  const onVersionCheck = async () => {
    setStatus('checking');
    const hasUpdate = await CodePush.checkForUpdate();
    if (!hasUpdate) return onReady();
    setStatus('updating');

    await CodePush.sync({
      installMode: CodePush.InstallMode.IMMEDIATE,
    });
  };

  const onReady = async () => {
    const permissions = await checkMultiple(requiredPermissions);
    const isAllow = (p: string) => !['granted', 'unavailable'].includes(p);
    if (Object.values(permissions).find(isAllow)) {
      return navigationRef.current?.navigate('Permission');
    }

    if (user === undefined) return;
    if (user == null) return navigationRef.current?.navigate('Start');
    navigationRef.current?.navigate('Main');
  };

  useEffect(() => {
    onVersionCheck();
    navigation.addListener('focus', onVersionCheck);
  }, [user]);

  return (
    <View style={{flex: 1}}>
      <Container>
        <Logo source={require('../assets/logo.png')} />
        <Description>이동을 즐겁게,</Description>
      </Container>
      <ProgressMessage>{StatusMessage[status]}</ProgressMessage>
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
