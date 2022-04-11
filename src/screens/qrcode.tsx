import React from 'react';
import {View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {screenHeight} from '../constants/screenSize';

export const Qrcode: React.FC = () => {
  return (
    <View>
      <QRCodeScanner
        onRead={console.log}
        flashMode={RNCamera.Constants.FlashMode.torch}
        cameraStyle={{height: screenHeight}}
      />
    </View>
  );
};
