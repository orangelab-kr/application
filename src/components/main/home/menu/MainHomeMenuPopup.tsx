import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Modal, View} from 'react-native';
import {useEvent} from 'react-native-reanimated';
import {useRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {screenHeight, screenWidth} from '../../../../constants/screenSize';
import {menuPopupState} from '../../../../recoils/MenuPopup';
import {Weblink} from '../../../../screens/weblink';

export const MainHomeMenuPopup: React.FC = () => {
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
  margin: ${screenHeight * 0.15}px ${screenWidth * 0.1}px ${
  screenHeight * 0.2
}px;
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
