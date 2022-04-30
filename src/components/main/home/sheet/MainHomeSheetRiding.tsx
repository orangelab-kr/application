import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';
import {useInterval} from '../../../../hooks/useInterval';
import {currentRideState} from '../../../../recoils/currentRide';
import {selectedKickboardState} from '../../../../recoils/selectedKickboard';
import {djs} from '../../../../tools/dayjs';
import {useRecoilValueMaybe} from '../../../../tools/recoil';
import {KickboardBatteryStatus} from '../../../kickboard/KickboardBatteryStatus';
import {MainHomeSheetCommonProps} from './MainHomeSheet';

export const MainHomeSheetRiding: React.FC<MainHomeSheetCommonProps> = ({}) => {
  const [currentRide] = useRecoilState(currentRideState);
  const selectedKickboard = useRecoilValueMaybe(selectedKickboardState);
  const [elapsedTime, setElapsedTime] = useState<string>('0초');
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

  if (!currentRide) return <></>;
  return (
    <Container>
      <View style={{marginRight: 10}}>
        <KickboardCode>{currentRide.kickboardCode}</KickboardCode>
        <Title>{elapsedTime}</Title>
        <KickboardBatteryStatus
          battery={selectedKickboard?.status.power.scooter.battery || 100}
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

const Bold = styled(Text)`
  font-weight: 800;
`;
