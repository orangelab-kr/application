import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

import {faSliders} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {useSetRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../../constants/screenSize';
import {currentRideState} from '../../../../../recoils/currentRide';
import {menuPopupState} from '../../../../../recoils/menuPopup';
import {useRecoilValueMaybe} from '../../../../../tools/recoil';

export const MainHomeSheetMenuButton: React.FC<
  TouchableOpacityProps
> = props => {
  const setVisible = useSetRecoilState(menuPopupState);
  const currentRide = useRecoilValueMaybe(currentRideState);
  if (currentRide) return <></>;

  return (
    <Button onPress={() => setVisible(true)} {...props}>
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
  right: ${screenHeight * 0.015}px;
  bottom: 15px;
`;
