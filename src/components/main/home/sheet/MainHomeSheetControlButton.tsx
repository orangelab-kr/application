import {faGamepad} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useRecoilValue} from 'recoil';
import styled from 'styled-components/native';
import {RideClient} from '../../../../api/ride';
import {screenHeight} from '../../../../constants/screenSize';
import {useGeolocation} from '../../../../hooks/useGeolocation';
import {currentRideState} from '../../../../recoils/currentRide';

export const MainHomeSheetControlButton: React.FC = () => {
  const navigation = useNavigation();
  const [coords] = useGeolocation();
  const currentRide = useRecoilValue(currentRideState);

  const onTerminate = async () => {
    if (!coords || !currentRide) return;

    const {rideId} = currentRide;
    const {latitude, longitude} = coords;
    await RideClient.terminate({latitude, longitude});
    navigation.navigate('ReturnedPhoto', {screen: 'Camera', params: {rideId}});
  };

  return (
    <Button onPress={onTerminate}>
      <FontAwesomeIcon icon={faGamepad} color="#fff" />
      <ButtonText>컨트롤</ButtonText>
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  background-color: #000;
  border-radius: 10px;
  padding: 15px;
  flex-direction: row;
  margin: 2px 0;
`;

const ButtonText = styled(Text)`
  color: #fff;
  font-size: ${screenHeight / 48}px;
  margin-left: 6px;
`;
