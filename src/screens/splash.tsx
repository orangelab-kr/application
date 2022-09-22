import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import CodePush, {DownloadProgress} from 'react-native-code-push';
import {checkMultiple, checkNotifications} from 'react-native-permissions';
import {Bar} from 'react-native-progress';
import styled from 'styled-components/native';
import {CommonText} from '../components/common/CommonText';
import {screenHeight, screenWidth} from '../constants/screenSize';
import {navigationRef} from '../navigators/navigation';
import {loginedUserState} from '../recoils/loginedUser';
import {useRecoilValueMaybe} from '../tools/recoil';
import {requiredPermissions} from './permission';

type StatusType =
  | 'starting'
  | 'checking'
  | 'downloading'
  | 'installing'
  | 'restarting';
export const StatusMessage: {
  [K in StatusType]: string;
} = {
  starting: '앱을 시작하고 있습니다.',
  checking: '업데이트를 확인하고 있습니다.',
  downloading: '업데이트를 다운로드 받고 있습니다.',
  installing: '업데이트를 진행하고 있습니다.',
  restarting: '업데이트가 완료되어 앱을 재시작합니다.',
};

export const Splash: React.FC = () => {
  const user = useRecoilValueMaybe(loginedUserState);
  const [status, setStatus] = useState<StatusType>('starting');
  const [progress, setProgress] = useState<number>();
  const navigation = useNavigation();

  const onVersionCheck = async () => {
    const options = {
      installMode: CodePush.InstallMode.ON_NEXT_RESTART,
      mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
      rollbackRetryOptions: {
        delayInHours: 24,
        maxRetryAttempts: 1,
      },
    };

    const syncStatusChangedCallback = (status: CodePush.SyncStatus) => {
      switch (status) {
        case CodePush.SyncStatus.UNKNOWN_ERROR:
        case CodePush.SyncStatus.UP_TO_DATE:
          onReady();
          break;
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          setStatus('checking');
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          setStatus('downloading');
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          setStatus('installing');
          break;
      }
    };

    const downloadProgressCallback = ({
      receivedBytes,
      totalBytes,
    }: DownloadProgress) => setProgress(receivedBytes / totalBytes);

    await CodePush.sync(
      options,
      syncStatusChangedCallback,
      downloadProgressCallback,
      err => console.log(err),
    );
  };

  const onReady = async () => {
    const [permissions, tryRequestNotification] = await Promise.all([
      checkMultiple(requiredPermissions),
      checkNotifications().then(r => r.status === 'denied'),
    ]);

    const isAllow = (p: string) => !['granted', 'unavailable'].includes(p);
    if (Object.values(permissions).find(isAllow) || tryRequestNotification) {
      return navigationRef.current?.navigate('Permission');
    }

    if (user === null) return navigationRef.current?.navigate('Start');
    navigationRef.current?.navigate('Main');
  };

  useEffect(() => {
    if (user === undefined) return;

    onVersionCheck();
    navigation.addListener('focus', onVersionCheck);
  }, [user]);

  return (
    <View style={{flex: 1}}>
      <Container>
        <Description>이동을 즐겁게,</Description>
        <Logo source={require('../assets/logo.png')} />
      </Container>
      <ProgressContainer>
        {progress !== undefined && (
          <Bar progress={progress} height={4} width={180} color="#999" />
        )}
        <ProgressMessage>{StatusMessage[status]}</ProgressMessage>
      </ProgressContainer>
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

const Description = styled(CommonText)`
  margin-bottom: -100px;
  font-size: 18px;
  font-weight: 400;
  shadow-color: #999;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 5;
  shadow-offset: {height: 3px, width: 3px};
`;

const ProgressContainer = styled(View)`
  position: absolute;
  align-items: center;
  width: 100%;
  bottom: 20px;
  color: #999;
`;

const ProgressMessage = styled(CommonText)`
  margin-top: 6px;
  text-align: center;
  color: #999;
`;
