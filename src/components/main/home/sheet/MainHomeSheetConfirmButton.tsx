import {faBolt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {RideClient, RideKickboard} from '../../../../api/ride';
import {screenHeight} from '../../../../constants/screenSize';
import {useGeolocation} from '../../../../hooks/useGeolocation';
import {HookResultValue} from '../../../../models/hookResult';
import {currentRideState} from '../../../../recoils/currentRide';

export interface MainHomeSheetConfirmButtonProps {
  selectedKickboard?: HookResultValue<RideKickboard>;
}

export const MainHomeSheetConfirmButton: React.FC<
  MainHomeSheetConfirmButtonProps
> = ({selectedKickboard}) => {
  const [coords] = useGeolocation();
  const [, setCurrentRide] = useRecoilState(currentRideState);

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
      <FontAwesomeIcon icon={faBolt} color="#fff" size={screenHeight / 54} />
      <ButtonText>라이드{'\n'}시작하기</ButtonText>
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
  font-size: ${screenHeight / 56}px;
  margin-top: 6px;
`;
