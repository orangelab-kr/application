import {faBluetooth} from '@fortawesome/free-brands-svg-icons';
import {
  faBell,
  faCamera,
  faLocationArrow,
} from '@fortawesome/free-solid-svg-icons';
import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  requestMultiple,
  requestNotifications,
} from 'react-native-permissions';
import styled from 'styled-components/native';
import {Depth} from '../components/Depth';
import {IconWithTextBox} from '../components/IconWithTextBox';
import isAndroid from '../constants/isAndroid';
import {screenHeight} from '../constants/screenSize';
import {navigationRef} from '../navigators/navigation';

export const requestPermissions = isAndroid
  ? [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      // PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
      // PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      // PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    ]
  : [
      // PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ];

export const alwaysLocationPermission = isAndroid
  ? PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
  : PERMISSIONS.IOS.LOCATION_ALWAYS;

export const requiredPermissions = [
  ...requestPermissions,
  alwaysLocationPermission,
];

export const Permission: React.FC = () => {
  const onClick = async () => {
    await requestNotifications(['alert', 'sound']);
    const permissions = await requestMultiple(requestPermissions);
    if (Object.values(permissions).find(p => p !== 'granted')) {
      return Alert.alert(
        '권한이 필요합니다.',
        '설정에 접근하여 모든 권한을 허용해주세요.',
        [{text: '확인', onPress: openSettings}],
      );
    }

    const hasAlwaysLocation = await check(alwaysLocationPermission);
    if (!['granted', 'unavailable'].includes(hasAlwaysLocation)) {
      const onPress = () =>
        isAndroid ? request(alwaysLocationPermission) : openSettings();
      return Alert.alert(
        '백그라운드 위치 권한을 허용해주세요.',
        isAndroid
          ? '권한에서 위치를 "항상 허용"으로 변경해주세요.'
          : '위치를 "항상"으로 변경해주세요.',
        [{text: '확인', onPress}],
      );
    }

    navigationRef.current?.dispatch(
      CommonActions.reset({index: 0, routes: [{name: 'Splash'}]}),
    );
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <Depth disabled />
      <ScrollView>
        <Container>
          <Title>
            <Bold>접근 권한 승인</Bold>
          </Title>
          <Title>반드시 필요한 권한입니다.</Title>
          <IconWithTextBox icon={faBell}>
            <Bold>킥보드 속도 변경</Bold> 및 <Bold>킥보드 종료</Bold>에 따른
            알림을 받아보실 수 있습니다.
          </IconWithTextBox>
          <IconWithTextBox icon={faBluetooth}>
            <Bold>킥보드 잠금해제</Bold>와 <Bold>헬멧 잠금해제</Bold> 통신할때에
            사용합니다.
          </IconWithTextBox>
          <IconWithTextBox icon={faCamera}>
            <Bold>킥보드 QR코드 인식</Bold> 및 <Bold>반납 사진 업로드</Bold>시
            사용됩니다.
          </IconWithTextBox>
          <IconWithTextBox icon={faLocationArrow}>
            라이드 중에는 앱이 <Bold>종료되었거나 사용중</Bold>이 아니더라도
            위치 데이터를 수집하여{' '}
            <Bold>서비스 지역 이탈 경보 및 어린이 보호구역 속도</Bold> 제어
            서비스를 지원합니다.
          </IconWithTextBox>
          <Button onPress={onClick}>
            <ButtonText>동의</ButtonText>
          </Button>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  margin: 12% 8%;
  margin-top: ${screenHeight * 0.1}px;
`;

const Button = styled(TouchableOpacity)`
  margin: 15px 0;
  width: 100%;
  height: ${screenHeight * 0.05}px;
  align-items: center;
  justify-content: center;
  background-color: black;
  border-radius: 3px;
  shadow-color: #999;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
`;

const ButtonText = styled(Text)`
  color: white;
  font-weight: 600;
`;

const Title = styled(Text)`
  color: #0a0c0c;
  font-size: 26px;
  shadow-color: #999;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
  font-weight: 300;
`;

const Bold = styled(Text)`
  font-weight: 800;
`;
