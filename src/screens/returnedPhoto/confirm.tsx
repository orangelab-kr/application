import {
  faCheck,
  faMicrochip,
  faUpload
} from '@fortawesome/free-solid-svg-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageResizer, { Response } from 'react-native-image-resizer';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { ImagesClient } from '../../api/images';
import { RideClient } from '../../api/ride';
import { CommonText } from '../../components/common/CommonText';
import { Depth } from '../../components/Depth';
import { TransparentButton } from '../../components/TransparentButton';
import { screenHeight, screenWidth } from '../../constants/screenSize';
import { ReturnedPhotoNavigatorRouteParams } from '../../models/navigation';
import { navigationRef } from '../../navigators/navigation';

export const ReturnedPhotoConfirm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [resizedImage, setResizedImage] = useState<Response>();
  const {params} =
    useRoute<RouteProp<ReturnedPhotoNavigatorRouteParams, 'Confirm'>>();

  const onError = () =>
    navigationRef.current?.navigate('Main', {screen: 'Home'});
  const onPress = async () => {
    if (!resizedImage) return;

    try {
      setLoading(true);
      const {rideId} = params;
      const {url} = await ImagesClient.upload(resizedImage);
      await RideClient.setReturnedPhotoInRide(rideId, url);
      setLoading(false);
    } catch (err: any) {
      if (err?.response?.data?.opcode !== -512) {
        onError();
        return;
      }
    }

    navigationRef.current?.navigate('Main', {screen: 'Home'});
    Notifier.showNotification({
      title: '반납 사진을 제공해주셔서 감사합니다. :)',
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'success',
        titleStyle: {color: '#fcfeff'},
      },
    });
  };

  useEffect(() => {
    ImageResizer.createResizedImage(
      params.photo.uri,
      720,
      1280,
      'JPEG',
      100,
      0,
      undefined,
      true,
    )
      .then(setResizedImage)
      .catch(onError);
  }, [params]);

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <FastImage
        style={{height: screenHeight, width: screenWidth}}
        source={{
          uri: resizedImage?.uri || params.photo.uri,
          priority: FastImage.priority.high,
        }}>
        <SafeAreaView>
          <Depth color="#fcfeff" />
          <TitleContainer>
            <Subtitle>킥보드가 잘 보이는지</Subtitle>
            <Subtitle>다시 한 번 확인해주세요.</Subtitle>
          </TitleContainer>
          <ButtonContainer>
            <TransparentButton
              icon={!resizedImage ? faMicrochip : loading ? faUpload : faCheck}
              onPress={onPress}>
              {!resizedImage
                ? '사진 처리중...'
                : loading
                ? '업로드 중...'
                : '확인'}
            </TransparentButton>
          </ButtonContainer>
        </SafeAreaView>
      </FastImage>
    </View>
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

const Subtitle = styled(CommonText)`
  color: #fcfeff;
  font-weight: 300;
  font-size: ${screenHeight / 32}px;
  text-align: left;
`;
