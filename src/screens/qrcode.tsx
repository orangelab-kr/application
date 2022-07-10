import React, {useState} from 'react';
import {
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSetRecoilState} from 'recoil';
import {RideClient} from '../api/ride';
import {Depth} from '../components/Depth';
import {QrcodeCodeInput} from '../components/qrcode/QrcodeCodeInput';
import {QrcodeFlashButton} from '../components/qrcode/QrcodeFlashButton';
import {screenHeight} from '../constants/screenSize';
import {navigationRef} from '../navigators/navigation';
import {confirmState} from '../recoils/confirm';
import {selectedKickboardCodeState} from '../recoils/selectedKickboardCode';

export type GetKickboardCodeEvent = (
  kickboardCode: string,
) => void | Promise<void>;

export const Qrcode: React.FC = () => {
  const [flash, setFlash] = useState(false);
  const setSelectedKickboard = useSetRecoilState(selectedKickboardCodeState);
  const setConfirm = useSetRecoilState(confirmState);
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
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
