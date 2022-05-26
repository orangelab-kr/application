import {faBolt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSetRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {RideClient} from '../../../../api/ride';
import {screenHeight, screenWidth} from '../../../../constants/screenSize';
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
    <CenterContainer>
      <Button onPress={onClick}>
        <ButtonText>
          라이드 시작하기
          <FontAwesomeIcon
            icon={faBolt}
            color="#fff"
            style={{marginLeft: 5}}
            size={screenHeight / 44}
          />
        </ButtonText>
      </Button>
    </CenterContainer>
  );
};

const CenterContainer = styled(View)`
  align-items: center;
  justify-content: center;
`;

const Button = styled(TouchableOpacity)`
  width: 100%;
  height: ${screenHeight * 0.065}px;
  margin: 10px 0;
  shadow-color: #999;
  shadow-opacity: 1;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
  background-color: #000;
  border-radius: 20px;
  padding: 15px;
  margin: 2px 0;
`;

const ButtonText = styled(Text)`
  color: #fff;
  width: 100%;
  text-align: center;
  font-size: ${screenHeight / 44}px;
`;
