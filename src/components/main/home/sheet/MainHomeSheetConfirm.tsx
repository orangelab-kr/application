import {faPersonWalking, faRoute} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useMemo} from 'react';
import {Text, View} from 'react-native';
import {useSetRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';
import {useGeolocation} from '../../../../hooks/useGeolocation';
import {selectedKickboardState} from '../../../../recoils/selectedKickboard';
import {selectedKickboardCodeState} from '../../../../recoils/selectedKickboardCode';
import {distance} from '../../../../tools/calculateMeter';
import {
  onDistanceFormatter,
  onTimeFormatter,
} from '../../../../tools/formatter';
import {useRecoilValueMaybe} from '../../../../tools/recoil';
import {KickboardBatteryStatus} from '../../../kickboard/KickboardBatteryStatus';
import {MainHomeSheetCommonProps} from './MainHomeSheet';
import {MainHomeSheetConfirmButton} from './MainHomeSheetConfirmButton';
import {MainHomeSheetCouponSelect} from './MainHomeSheetCouponSelect';

export const MainHomeSheetConfirm: React.FC<
  MainHomeSheetCommonProps
> = ({}) => {
  const [coords] = useGeolocation();
  const setSelectedKickboard = useSetRecoilState(selectedKickboardCodeState);
  const selectedKickboard = useRecoilValueMaybe(selectedKickboardState);
  const meter = useMemo(
    () =>
      selectedKickboard && coords
        ? Math.round(
            distance(
              coords.latitude,
              coords.longitude,
              selectedKickboard.status.gps.latitude,
              selectedKickboard.status.gps.longitude,
            ),
          )
        : 0,
    [selectedKickboard, coords],
  );

  const walkTime = useMemo(
    () => Math.round(meter / ((5 * 1000) / 3600) / 60),
    [meter],
  );

  useEffect(() => {
    if (selectedKickboard !== null) return;
    setSelectedKickboard(null);
  }, [selectedKickboard]);

  return (
    <Container>
      <View style={{marginRight: 10, width: '100%'}}>
        <KickboardCode>
          {selectedKickboard?.kickboardCode || '로드 중...'}
        </KickboardCode>
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
          battery={selectedKickboard?.status.power.scooter.battery || 100}
        />
        <MainHomeSheetCouponSelect />
        <MainHomeSheetConfirmButton />
      </View>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  flex-direction: row;
`;

const Distance = styled(Text)`
  color: #000;
  margin-left: 10px;
  font-size: ${screenHeight / 36}px;
`;

const KickboardCode = styled(Text)`
  color: #999;
  font-weight: 600;
  font-size: ${screenHeight / 45}px;
`;

const Title = styled(Text)`
  font-size: ${screenHeight / 30}px;
  font-weight: 300,
  color: #000
`;

const Bold = styled(Text)`
  font-weight: 800;
`;
