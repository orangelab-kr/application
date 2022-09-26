import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {CameraScreen} from 'react-native-camera-kit';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSetRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {RideClient} from '../api/ride';
import {Depth} from '../components/Depth';
import {Price} from '../components/price/Price';
import {QrcodeCodeInput} from '../components/qrcode/QrcodeCodeInput';
import {QrcodeFlashButton} from '../components/qrcode/QrcodeFlashButton';
import {QrcodeSafetyNotice} from '../components/qrcode/QrcodeSafetyNotice';
import {screenHeight} from '../constants/screenSize';
import {RootNavigatorRouteParams} from '../models/navigation';
import {navigationRef} from '../navigators/navigation';
import {confirmState} from '../recoils/confirm';
import {loginedUserState} from '../recoils/loginedUser';
import {selectedKickboardCodeState} from '../recoils/selectedKickboardCode';
import {useRecoilValueMaybe} from '../tools/recoil';

export type GetKickboardCodeEvent = (
  kickboardCode: string,
) => void | Promise<void>;

export const Qrcode: React.FC = () => {
  const [flash, setFlash] = useState(false);
  const cameraRef = React.createRef<CameraScreen>();
  const {params} = useRoute<RouteProp<RootNavigatorRouteParams, 'Qrcode'>>();
  const [rawData, setRawData] = useState('');
  const setSelectedKickboard = useSetRecoilState(selectedKickboardCodeState);
  const setConfirm = useSetRecoilState(confirmState);
  const user = useRecoilValueMaybe(loginedUserState);
  const onKickboardCode: GetKickboardCodeEvent = async (
    kickboardCode: string,
  ) => {
    setConfirm(true);
    setSelectedKickboard(kickboardCode);
    console.log(`Kickboard Code: ${kickboardCode}`);
    navigationRef.current?.navigate('Main', {screen: 'Home'});
  };

  const onReadByScanner = async (e: {
    nativeEvent: {codeStringValue: string};
  }) => {
    const data = e.nativeEvent.codeStringValue;
    if (rawData === data) return;
    setRawData(data);

    console.log(`Kickboard Url: ${data}`);
    const kickboardCode = await RideClient.getKickboardCodeByQrcode(data);
    return onKickboardCode(kickboardCode);
  };

  const onConfirm = () => {
    if (!user) return;
    if (params?.later || user.licenseId) return;
    Notifier.showNotification({
      title: '운전면허 인증이 필요합니다.',
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'warn',
        titleStyle: {color: '#fcfeff'},
      },
    });

    navigationRef.current?.navigate('Weblink', {
      page: 'settings?license=1&later=1',
    });
  };

  useEffect(() => {
    cameraRef.current?.setState({torchMode: flash});
  }, [flash]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <QrcodeSafetyNotice onConfirm={onConfirm} />
        <StatusBar barStyle="light-content" />
        <StyledCamera
          ref={cameraRef}
          onReadCode={onReadByScanner}
          scanBarcode
          hideControls
          state={{
            torchMode: flash ? 'on' : 'off',
          }}
        />
        <SafeAreaView>
          <Depth color="#fcfeff" />
          <QrcodeCodeInput
            onKickboardCode={onKickboardCode}
            loading={!!rawData}
          />
          <QrcodeFlashButton flash={flash} setFlash={setFlash} />
          <Price />
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const StyledCamera = styled(CameraScreen as any)`
  height: ${screenHeight}px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
