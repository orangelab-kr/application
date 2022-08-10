import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSetRecoilState} from 'recoil';
import {RideClient} from '../api/ride';
import {Depth} from '../components/Depth';
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
  const {params} = useRoute<RouteProp<RootNavigatorRouteParams, 'Qrcode'>>();
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

  const onReadByScanner = async (e: BarCodeReadEvent) => {
    console.log(`Kickboard Url: ${e.data}`);
    const kickboardCode = await RideClient.getKickboardCodeByQrcode(e.data);
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
        titleStyle: {color: '#fff'},
      },
    });

    navigationRef.current?.navigate('Weblink', {
      page: 'settings?license=1&later=1',
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <QrcodeSafetyNotice onConfirm={onConfirm} />
        <StatusBar barStyle="light-content" />
        <QRCodeScanner
          onRead={onReadByScanner}
          cameraStyle={{height: screenHeight}}
          flashMode={
            flash
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
        />
        <SafeAreaView>
          <Depth color="#fff" />
          <QrcodeCodeInput onKickboardCode={onKickboardCode} />
          <QrcodeFlashButton flash={flash} setFlash={setFlash} />
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};
