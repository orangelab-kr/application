import {faCompass} from '@fortawesome/free-regular-svg-icons';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {TrackingMode} from 'react-native-nmap';
import {useRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';
import {trackingModeState} from '../../../../recoils/trackingMode';

export const MainHomeSheetLocationButton: React.FC = () => {
  const [trackingMode, setTrackingMode] = useRecoilState(trackingModeState);
  const TrackingIcon = {
    [TrackingMode.Face]: faCompass,
    [TrackingMode.Follow]: faLocationArrow,
  };

  const onPress = () => {
    if (trackingMode === TrackingMode.Face) {
      setTrackingMode(TrackingMode.Follow);
    } else {
      setTrackingMode(TrackingMode.Face);
    }
  };

  return (
    <Button onPress={onPress} activeOpacity={0.8}>
      <FontAwesomeIcon icon={TrackingIcon[trackingMode]} size={20} />
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  position: absolute;
  padding: ${screenHeight * 0.02}px;
  border-radius: ${screenHeight * 0.015}px;
  background-color: #fcfeff;
  left: ${screenHeight * 0.015}px;
  bottom: 15px;
`;
