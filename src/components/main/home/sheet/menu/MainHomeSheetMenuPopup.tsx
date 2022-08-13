import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Modal, View} from 'react-native';
import {useRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {screenHeight, screenWidth} from '../../../../../constants/screenSize';
import {menuPopupState} from '../../../../../recoils/menuPopup';
import {Weblink} from '../../../../../screens/weblink';

export const MainHomeSheetMenuPopup: React.FC = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useRecoilState(menuPopupState);

  useEffect(() => {
    const unload = () => setVisible(false);
    const unsubscribe = navigation.addListener('blur', unload);
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <Modal transparent visible={visible} animationType="slide">
        <FakeContainer onTouchStart={() => setVisible(false)} />
        <Container>
          <Weblink isPopup />
        </Container>
      </Modal>
    </>
  );
};

const Container = styled(View)`
  flex: 1;
  margin-top: ${screenHeight * 0.11}px;
  margin-bottom: ${screenHeight * 0.11}px;
  margin-left: ${screenHeight * 0.02}px;
  margin-right: ${screenHeight * 0.02}px;
  shadow-color: #999;
  shadow-opacity: 1;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 6px, height: 6px};
`;

const FakeContainer = styled(View)`
  position: absolute;
  height: ${screenHeight}px;
  width: ${screenWidth}px;
  background-color: transparent;
`;
