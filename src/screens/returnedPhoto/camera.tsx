import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import {
    Keyboard,
    StatusBar,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { TransparentButton } from '../../components/TransparentButton';
import { screenHeight } from '../../constants/screenSize';
import { ReturnedPhotoNavigatorRouteParams } from '../../models/navigation';
import { navigationRef } from '../../navigators/navigation';

export const ReturnedPhotoCamera: React.FC = () => {
  const cameraRef = React.createRef<RNCamera>();
  const {params} =
    useRoute<RouteProp<ReturnedPhotoNavigatorRouteParams, 'Camera'>>();

  const onTakePhoto = async () => {
    const {rideId} = params;
    if (!rideId || !cameraRef.current) return;
    const options = {quality: 1, exif: true, base64: false};
    const photo = await cameraRef.current.takePictureAsync(options);
    navigationRef.current?.navigate('ReturnedPhoto', {
      screen: 'Confirm',
      params: {rideId, photo},
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <StatusBar barStyle="light-content" />
        <RNCamera
          ref={cameraRef}
          captureAudio={false}
          style={{height: screenHeight}}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}>
          <SafeAreaView>
            <TitleContainer>
              <Title>📸 사진을 찰칵!</Title>
              <Subtitle>촬영하여 다음 사람이 쉽게</Subtitle>
              <Subtitle>이용할 수 있도록 배려해주세요.</Subtitle>
            </TitleContainer>
            <ButtonContainer>
              <TransparentButton icon={faCamera} onPress={onTakePhoto}>
                촬영
              </TransparentButton>
            </ButtonContainer>
          </SafeAreaView>
        </RNCamera>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ButtonContainer = styled(View)`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: ${screenHeight * 0.8}px;
  left: 0;
  right: 0;
`;

const TitleContainer = styled(View)`
  margin: 20px;
  padding: 10px;
  border-color: #fcfeff;
  border-width: 1px;
  border-radius: 10px;
`;

const Subtitle = styled(Text)`
  color: #fcfeff;
  font-weight: 300;
  font-size: ${screenHeight / 32}px;
  text-align: left;
`;

const Title = styled(Subtitle)`
  font-weight: 800;
  font-size: ${screenHeight / 18}px;
  margin-bottom: 10px;
  text-align: center;
`;
