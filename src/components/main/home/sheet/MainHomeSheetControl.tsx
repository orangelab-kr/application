import {
  faGamepad,
  faLightbulb,
  faLock,
  faLockOpen,
  faToggleOff,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import BackgroundGeolocation from '@hariks789/react-native-background-geolocation';
import React, {useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import styled from 'styled-components/native';
import {RideClient} from '../../../../api/ride';
import {screenHeight, screenWidth} from '../../../../constants/screenSize';
import {useGeolocation} from '../../../../hooks/useGeolocation';
import {navigationRef} from '../../../../navigators/navigation';
import {currentRegionState} from '../../../../recoils/currentRegion';
import {currentRideState} from '../../../../recoils/currentRide';
import {CommonText} from '../../../common/CommonText';

export const MainHomeSheetControl: React.FC = () => {
  const [coords] = useGeolocation();
  const [currentRide, setCurrentRide] = useRecoilState(currentRideState);
  const selectedRegion = useRecoilValue(currentRegionState);
  const pricing = selectedRegion?.region.pricing;
  const [terminating, setTerminating] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDialog =
    (title: string, contents: string, onPress: () => void) => () => {
      Alert.alert(
        title,
        contents,
        [
          {text: '아니요', style: 'cancel'},
          {text: '네, 진행합니다', onPress},
        ],
        {cancelable: true},
      );
    };

  const onToggleLight = async () => {
    setLoading(true);
    if (loading) return;

    try {
      const state = !currentRide?.isLightsOn;
      await RideClient.lights(state);
      const {ride} = await RideClient.getCurrentRide();
      setCurrentRide(ride);
    } finally {
      setLoading(false);
    }
  };

  const onToggleLock = async () => {
    setLoading(true);
    if (loading) return;

    try {
      const state = !currentRide?.isLocked;
      await RideClient.lock(state);
      const {ride} = await RideClient.getCurrentRide();
      setCurrentRide(ride);
    } finally {
      setLoading(false);
    }
  };

  const isServiceArea = async () => {
    setLoading(true);
    const {status} = await RideClient.getKickboardStatus();
    const {latitude: lat, longitude: lng} = status.gps;
    const {geofence} = await RideClient.getCurrentGeofence({lat, lng});
    setLoading(false);
    return !geofence.profile.hasSurcharge;
  };

  const checkBeforeTerminate = async () => {
    if (await isServiceArea()) return onTerminate();
    if (!pricing?.surchargePrice) return onTerminate();

    onDialog(
      '현재 반납구역 밖에 있습니다.',
      `반납시 ${pricing.surchargePrice.toLocaleString()}원이 추가로 부가됩니다.`,
      onTerminate,
    )();
  };

  const onTerminate = async () => {
    if (loading || !coords || !currentRide) return;
    setLoading(true);
    setTerminating(true);

    try {
      const {rideId} = currentRide;
      const {latitude, longitude} = coords;
      const {helmet} = await RideClient.getHelmetStatus();
      if (helmet && helmet.status === 'BORROWED') {
        return navigationRef.current?.navigate('Helmet', {screen: 'Return'});
      }

      await RideClient.terminate({latitude, longitude});
      BackgroundGeolocation.stop();
      setCurrentRide(undefined);
      navigationRef.current?.navigate('ReturnedPhoto', {
        screen: 'Camera',
        params: {rideId},
      });
    } finally {
      setLoading(false);
      setTerminating(false);
    }
  };

  return (
    <View style={{margin: screenWidth * 0.05, marginTop: screenHeight * 0.03}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          disabled={loading}
          onPress={onToggleLight}
          style={{width: '49%'}}>
          <FontAwesomeIcon
            icon={currentRide?.isLightsOn ? faToggleOff : faLightbulb}
            size={screenHeight / 48}
            color="#fcfeff"
          />
          <ButtonText>
            {currentRide?.isLightsOn ? '라이트 끄기' : '라이트 켜기'}
          </ButtonText>
        </Button>
        <Button
          disabled={loading}
          onPress={onDialog(
            '일시정지',
            currentRide?.isLocked
              ? '킥보드 일시정지를 해지하고 다시 이용하시겠습니까?'
              : '킥보드가 잠금되지만 비용은 지속적으로 발생합니다.',
            onToggleLock,
          )}
          style={{width: '49%'}}>
          <FontAwesomeIcon
            icon={currentRide?.isLocked ? faLockOpen : faLock}
            size={screenHeight / 48}
            color="#fcfeff"
          />
          <ButtonText>일시정지{currentRide?.isLocked && ' 해제'}</ButtonText>
        </Button>
      </View>
      <Button
        disabled={loading}
        style={{backgroundColor: '#c43019'}}
        onPress={onDialog(
          '라이드 종료',
          '여기서 라이드를 마무리하시겠습니까?',
          checkBeforeTerminate,
        )}>
        <FontAwesomeIcon
          icon={faGamepad}
          color="#fcfeff"
          size={screenHeight / 48}
        />
        <ButtonText>{terminating ? '종료 중...' : '종료'}</ButtonText>
      </Button>
    </View>
  );
};

const Button = styled(TouchableOpacity)`
  background-color: #0a0c0c;
  border-radius: ${screenHeight * 0.02}px;
  padding: ${screenHeight * 0.019}px;
  flex-direction: row;
  margin: 2px 0;
  border-radius: 16px;
  justify-content: flex-start;
  align-items: center;
  shadow-color: #999;
  shadow-opacity: 0.2;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
`;

const ButtonText = styled(CommonText)`
  color: #fcfeff;
  font-size: ${screenHeight / 48}px;
  margin-left: 6px;
  font-weight: 600;
`;
