import {faPersonWalking, faRoute} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useMemo} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';
import {RideKickboard} from '../../api/ride';
import {screenHeight} from '../../constants/screenSize';
import {useGeolocation} from '../../hooks/useGeolocation';
import {distance} from '../../tools/calculateMeter';
import {onDistanceFormatter, onTimeFormatter} from '../../tools/formatter';
import {KickboardBatteryStatus} from './KickboardBatteryStatus';

export interface KickboardStatusProps {
  kickboard: RideKickboard;
}

export const KickboardStatus: React.FC<KickboardStatusProps> = ({
  kickboard,
}) => {
  const [coords] = useGeolocation();
  const meter = useMemo(
    () =>
      kickboard && coords
        ? Math.round(
            distance(
              coords.latitude,
              coords.longitude,
              kickboard.status.gps.latitude,
              kickboard.status.gps.longitude,
            ),
          )
        : 0,
    [kickboard, coords],
  );

  const walkTime = useMemo(
    () => Math.round(meter / ((5 * 1000) / 3600) / 60),
    [meter],
  );

  return (
    <>
      <KickboardCode>{kickboard.kickboardCode || '로드 중...'}</KickboardCode>
      <Title>
        <FontAwesomeIcon icon={faPersonWalking} size={25} />{' '}
        <Bold>{onTimeFormatter(walkTime)}</Bold>
        {meter < 100000 && (
          <Distance>
            (<FontAwesomeIcon icon={faRoute} size={20} />{' '}
            {onDistanceFormatter(meter)})
          </Distance>
        )}
      </Title>
      <KickboardBatteryStatus
        battery={kickboard.status.power.scooter.battery || 100}
      />
    </>
  );
};

const Distance = styled(Text)`
  color: #0a0c0c;
  margin-left: 10px;
  font-size: ${screenHeight / 36}px;
`;

const KickboardCode = styled(Text)`
  color: #999;
  font-weight: 600;
  font-size: ${screenHeight / 40}px;
`;

const Title = styled(Text)`
  font-size: ${screenHeight / 30}px;
  font-weight: 300,
  color: #0a0c0c
`;

const Bold = styled(Text)`
  font-weight: 800;
`;
