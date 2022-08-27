import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {screenHeight, screenWidth} from '../../../constants/screenSize';
import {PopupState} from '../../../recoils/popup';
import {openInAppBrowser} from '../../../tools/openInAppBrowser';
import {remoteConfig} from '../../../tools/remoteConfig';

export const MainHomePopup: React.FC = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useRecoilState(PopupState);
  const [popup, setPopup] = useState<{image: string; url: string} | null>(null);
  const openPopup = () => {
    if (!popup) return;
    openInAppBrowser(popup?.url);
    setVisible(false);
    setPopup(null);
  };

  useEffect(() => {
    const unload = () => setVisible(false);
    return navigation.addListener('blur', unload);
  }, [navigation]);

  useEffect(() => {
    const popupValue = remoteConfig.getValue('popup').asString();
    if (!popupValue) return;

    const {image, url} = JSON.parse(popupValue);
    setPopup({image, url});
    setVisible(true);
  }, [navigation, setPopup]);

  return (
    <>
      <Modal transparent visible={visible} animationType="fade">
        <FakeContainer />
        <Container style={{marginTop: screenHeight / 4}}>
          <Image
            resizeMode={FastImage.resizeMode.contain}
            source={{uri: popup?.image}}
            onTouchStart={openPopup}
          />
          <CloseButton onPress={() => setVisible(false)}>
            <FontAwesomeIcon
              icon={faXmark}
              color="#0a0c0c"
              size={screenHeight * 0.025}
              style={{marginRight: 5}}
            />
            <CloseText>닫기</CloseText>
          </CloseButton>
        </Container>
      </Modal>
    </>
  );
};

const CloseButton = styled(TouchableOpacity)`
  margin: 0 auto;
  margin-top: ${screenHeight * 0.02}px;
  justify-contents: center;
  align-items: center;
  border-radius: 10px;
  background-color: #fcfeff;
  flex-direction: row;
  padding: 10px;
`;

const CloseText = styled(Text)`
  color: #0a0c0c;
  font-size: ${screenHeight * 0.025}px;
`;

const Image = styled(FastImage)`
  width: ${screenWidth * 0.85}px;
  height: ${screenWidth * 0.85}px;
  border-radius: 20px;
`;

const Container = styled(View)`
  flex: 1;
  margin: 0 auto;
  shadow-color: #999;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 6px, height: 6px};
`;

const FakeContainer = styled(View)`
  position: absolute;
  height: ${screenHeight}px;
  width: ${screenWidth}px;
  background-color: #0a0c0c;
  opacity: 0.7;
`;
