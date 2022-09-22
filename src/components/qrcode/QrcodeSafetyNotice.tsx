import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {screenHeight, screenWidth} from '../../constants/screenSize';
import {CommonText} from '../common/CommonText';

export interface QrcodeSafetyNoticeProps {
  onConfirm?: () => any | Promise<any>;
}

export const QrcodeSafetyNotice: React.FC<QrcodeSafetyNoticeProps> = ({
  onConfirm,
}) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const unload = () => setVisible(false);
    return navigation.addListener('blur', unload);
  }, [navigation]);

  const onClick = () => {
    setVisible(false);
    if (onConfirm) onConfirm();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <FakeContainer />
      <Container style={{marginTop: screenHeight / 4.5}}>
        <Image
          style={{height: screenHeight / 1.8}}
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../assets/safety-notice.png')}
        />
        <CloseButton onPress={onClick}>
          <FontAwesomeIcon
            icon={faCheck}
            color="#0a0c0c"
            size={screenHeight * 0.03}
            style={{marginRight: 5}}
          />
          <CloseText>동의합니다.</CloseText>
        </CloseButton>
      </Container>
    </Modal>
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

const CloseText = styled(CommonText)`
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
