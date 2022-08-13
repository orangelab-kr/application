import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { screenHeight } from '../../../../constants/screenSize';
import { menuPopupState } from '../../../../recoils/menuPopup';

export const MainHomeMenuButton: React.FC<TouchableOpacityProps> = props => {
  const insets = useSafeAreaInsets();
  const setVisible = useSetRecoilState(menuPopupState);
  const topMargin = Math.floor(screenHeight * 0.09 + insets.top);

  return (
    <Button
      style={{top: topMargin}}
      onPress={() => setVisible(true)}
      {...props}>
      <FontAwesomeIcon icon={faSliders} color="#0a0c0c" size={18} />
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  flex-direction: row;
  position: absolute;
  background-color: #fcfeff;
  border-radius: ${screenHeight * 0.02}px;
  padding: ${screenHeight * 0.023}px;
  right: ${screenHeight * 0.025}px;
  shadow-color: #999;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 6px, height: 6px};
`;
