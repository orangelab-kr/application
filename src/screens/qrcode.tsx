import {useNavigation} from '@react-navigation/native';
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
import {RideClient} from '../api/ride';
import {Depth} from '../components/Depth';
import {QrcodeCodeInput} from '../components/qrcode/QrcodeCodeInput';
import {QrcodeFlashButton} from '../components/qrcode/QrcodeFlashButton';
import {screenHeight} from '../constants/screenSize';

export type GetKickboardCodeEvent = (
  kickboardCode: string,
) => void | Promise<void>;

export const Qrcode: React.FC = () => {
  const [flash, setFlash] = useState(false);
  const navigation = useNavigation();

  const onKickboardCode: GetKickboardCodeEvent = async (
    kickboardCode: string,
  ) => {
    console.log(`Kickboard Code: ${kickboardCode}`);
    const params = {kickboardCode, confirm: true};
    navigation.navigate('Main', {screen: 'Home', params});
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
