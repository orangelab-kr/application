import {faBolt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useSetRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {RideClient} from '../../../../api/ride';
import {screenHeight} from '../../../../constants/screenSize';
import {useGeolocation} from '../../../../hooks/useGeolocation';
import {currentRideState} from '../../../../recoils/currentRide';
import {selectedKickboardState} from '../../../../recoils/selectedKickboard';
import {useRecoilValueMaybe} from '../../../../tools/recoil';

export interface MainHomeSheetConfirmButtonProps {}

export const MainHomeSheetConfirmButton: React.FC<
  MainHomeSheetConfirmButtonProps
> = () => {
  const [coords] = useGeolocation();
  const setCurrentRide = useSetRecoilState(currentRideState);
  const selectedKickboard = useRecoilValueMaybe(selectedKickboardState);

  const onClick = async () => {
    if (!coords || !selectedKickboard) return;
    const {latitude, longitude} = coords;
    const {kickboardCode} = selectedKickboard;
    const props = {latitude, longitude, kickboardCode};
    const {ride} = await RideClient.start(props);
    setCurrentRide(ride);
  };

  return (
    <Button onPress={onClick}>
      <ButtonText>라이드{'\n'}시작하기</ButtonText>
      <FontAwesomeIcon icon={faBolt} color="#fff" size={screenHeight / 54} />
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  background-color: #000;
  border-radius: 25px;
  padding: 15px;
  height: 80px;
  width: 80px;
  align-items: center;
  justify-content: center;
  margin: 2px 0;
`;

const ButtonText = styled(Text)`
  color: #fff;
  text-align: center;
  font-size: ${screenHeight / 57}px;
  margin-bottom: 6px;
`;
