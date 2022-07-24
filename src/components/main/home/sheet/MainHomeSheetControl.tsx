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
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {RideClient} from '../../../../api/ride';
import {screenHeight, screenWidth} from '../../../../constants/screenSize';
import {useGeolocation} from '../../../../hooks/useGeolocation';
import {navigationRef} from '../../../../navigators/navigation';
import {currentRideState} from '../../../../recoils/currentRide';

export const MainHomeSheetControl: React.FC = () => {
  const [coords] = useGeolocation();
  const [currentRide, setCurrentRide] = useRecoilState(currentRideState);
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

  const onTerminate = async () => {
    if (loading || !coords || !currentRide) return;
    setTerminating(true);
    setLoading(true);

    try {
      const {rideId} = currentRide;
      const {latitude, longitude} = coords;
      const {helmet} = await RideClient.getHelmetStatus();
      if (helmet && helmet.status === 'BORROWED') {
        return navigationRef.current?.navigate('Helmet', {screen: 'Return'});
      }

      await RideClient.terminate({latitude, longitude});
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

        if (status.isRunning) {
          BackgroundGeolocation.stop();
        }
      });

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
            color="#fff"
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
            color="#fff"
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
          onTerminate,
        )}>
        <FontAwesomeIcon
          icon={faGamepad}
          color="#fff"
          size={screenHeight / 48}
        />
        <ButtonText>{terminating ? '종료 중...' : '종료'}</ButtonText>
      </Button>
    </View>
  );
};

const Button = styled(TouchableOpacity)`
  background-color: #000;
  border-radius: ${screenHeight * 0.02}px;
  padding: ${screenHeight * 0.019}px;
  flex-direction: row;
  margin: 2px 0;
  border-radius: 16px;
  justify-content: flex-start;
  align-items: center;
  shadow-color: #999;
  shadow-opacity: 1;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
`;

const ButtonText = styled(Text)`
  color: #fff;
  font-size: ${screenHeight / 48}px;
  margin-left: 6px;
  font-weight: 600;
`;
