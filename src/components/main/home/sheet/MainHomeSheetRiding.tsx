import BackgroundGeolocation from '@hariks789/react-native-background-geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useRecoilState, useSetRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {endpoint} from '../../../../api/client';
import {screenHeight} from '../../../../constants/screenSize';
import {useInterval} from '../../../../hooks/useInterval';
import {currentRideState} from '../../../../recoils/currentRide';
import {
  resetSelectedKickboardState,
  selectedKickboardState,
} from '../../../../recoils/selectedKickboard';
import {djs} from '../../../../tools/dayjs';
import {useRecoilValueMaybe} from '../../../../tools/recoil';
import {KickboardBatteryStatus} from '../../../kickboard/KickboardBatteryStatus';
import {MainHomeSheetCommonProps} from './MainHomeSheet';

export const MainHomeSheetRiding: React.FC<MainHomeSheetCommonProps> = () => {
  const [currentRide] = useRecoilState(currentRideState);
  const selectedKickboard = useRecoilValueMaybe(selectedKickboardState);
  const resetSelectedKickboard = useSetRecoilState(resetSelectedKickboardState);
  const [elapsedTime, setElapsedTime] = useState<string>('0초');
  useInterval(() => resetSelectedKickboard(e => !e), currentRide ? 30000 : 0);
  useInterval(
    () => {
      if (!currentRide) return;
      let result = '';

      const startedAt = djs(currentRide.createdAt);
      const duration = djs.duration(djs().diff(startedAt));

      const months = Math.floor(duration.asMonths());
      const days = Math.floor(duration.asDays() % 30);
      const hours = Math.floor(duration.asHours() % 24);
      const minutes = Math.floor(duration.asMinutes() % 60);
      const seconds = Math.floor(duration.asSeconds() % 60);

      if (months > 0) result += `${months}개월 `;
      if (days > 0) result += `${days}일 `;
      if (months <= 0) {
        if (hours > 0) result += `${hours}시간 `;
        if (days <= 0) {
          if (minutes > 0) result += `${minutes}분 `;
          if (seconds > 0) result += `${seconds}초`;
        }
      }

      setElapsedTime(result);
    },
    currentRide ? 1000 : 0,
  );

  useEffect(() => {
    if (!currentRide) return;
    AsyncStorage.getItem('accessToken').then(accessToken => {
      BackgroundGeolocation.configure({
        debug: false,
        startOnBoot: false,
        notificationTitle: 'Background tracking',
        notificationText: 'enabled',
        stopOnTerminate: false,
        stopOnStillActivity: false,
        fastestInterval: 30000,
        interval: 30000,
        activitiesInterval: 30000,
        stationaryRadius: 30,
        desiredAccuracy: BackgroundGeolocation.MEDIUM_ACCURACY,
        locationProvider: BackgroundGeolocation.RAW_PROVIDER,
        url: `${endpoint}/ride/current/location`,
        httpHeaders: {Authorization: `Bearer ${accessToken}`},
        postTemplate: {latitude: '@latitude', longitude: '@longitude'},
      });

      BackgroundGeolocation.on('error', error => {
        console.log('[ERROR] BackgroundGeolocation error:', error);
      });

      BackgroundGeolocation.on('start', () => {
        console.log('[INFO] BackgroundGeolocation service has been started');
      });

      BackgroundGeolocation.on('stop', () => {
        console.log('[INFO] BackgroundGeolocation service has been stopped');
      });

      BackgroundGeolocation.on('stationary', stationaryLocation => {
        // handle stationary locations here
        console.log(stationaryLocation);
      });
      BackgroundGeolocation.on('background', () => {
        console.log('[INFO] App is in background');
      });

      BackgroundGeolocation.on('foreground', () => {
        console.log('[INFO] App is in foreground');
      });

      BackgroundGeolocation.on('abort_requested', () => {
        console.log('[INFO] Server responded with 285 Updates Not Required');

        // Here we can decide whether we want stop the updates or not.
        // If you've configured the server to return 285, then it means the server does not require further update.
        // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
        // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
      });

      BackgroundGeolocation.on('http_authorization', () => {
        console.log('[INFO] App needs to authorize the http requests');
      });

      BackgroundGeolocation.checkStatus(status => {
        console.log(
          '[INFO] BackgroundGeolocation service is running',
          status.isRunning,
        );
        console.log(
          '[INFO] BackgroundGeolocation services enabled',
          status.locationServicesEnabled,
        );
        console.log(
          '[INFO] BackgroundGeolocation auth status: ' + status.authorization,
        );

        if (!status.isRunning) {
          BackgroundGeolocation.start(); //triggers start on start event
        }
      });
    });
  }, []);

  if (!currentRide) return <></>;
  return (
    <Container>
      <View style={{marginRight: 10}}>
        <KickboardCode>{currentRide.kickboardCode}</KickboardCode>
        <Title>{elapsedTime}</Title>
        <KickboardBatteryStatus
          battery={selectedKickboard?.status.power.scooter.battery || 100}
          text={currentRide?.isLocked ? '(일시정지됨)' : ''}
        />
      </View>
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: row;
`;

const KickboardCode = styled(Text)`
  color: #999;
  font-weight: 600;
  font-size: ${screenHeight / 45}px;
`;

const Title = styled(Text)`
  font-size: ${screenHeight / 30}px;
  font-weight: 500,
  color: #000
`;
