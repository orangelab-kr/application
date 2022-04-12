import {faMap} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {showLocation} from 'react-native-map-link';
import styled from 'styled-components/native';
import {RideKickboard} from '../../../../api/ride';
import {screenHeight} from '../../../../constants/screenSize';
import {useGeolocation} from '../../../../hooks/useGeolocation';
import {HookResultValue} from '../../../../models/hookResult';

interface MainHomeSheetRouteButtonProps {
  kickboard?: HookResultValue<RideKickboard>;
}

export const MainHomeSheetRouteButton: React.FC<
  MainHomeSheetRouteButtonProps
> = ({kickboard}) => {
  const [location] = useGeolocation();
  if (!kickboard || !location) return <></>;
  const {latitude, longitude} = kickboard.status.gps;
  const onPress = () => {
    showLocation({
      latitude: latitude,
      longitude: longitude,
      sourceLatitude: location.latitude,
      sourceLongitude: location.longitude,
      title: kickboard.kickboardCode,
      dialogTitle: kickboard.kickboardCode,
      dialogMessage: '어떤 지도로 길 안내를 받으시겠습니까?',
      naverCallerName: 'kr.hikick.application',
      alwaysIncludeGoogle: true,
      googleForceLatLon: true,
      cancelText: '취소',
      directionsMode: 'walk',
    });
  };

  return (
    <Button onPress={onPress}>
      <FontAwesomeIcon icon={faMap} color="#000" />
      <ButtonText>길 안내</ButtonText>
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  background-color: #fff;
  border-radius: 10px;
  border-width: 1px;
  border-color: #000;
  padding: 9px;
  flex-direction: row;
  margin: 2px 0;
`;

const ButtonText = styled(Text)`
  color: #000;
  font-size: ${screenHeight / 70}px;
  margin-left: 6px;
`;
