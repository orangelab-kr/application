import {faBolt, faUnlock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
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
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    if (!coords || !selectedKickboard) return;

    try {
      setLoading(true);
      const {latitude, longitude} = coords;
      const {kickboardCode} = selectedKickboard;
      const props = {latitude, longitude, kickboardCode, debug: false};
      const {ride} = await RideClient.start(props);
      setCurrentRide(ride);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CenterContainer>
      <Button onPress={onClick} loading={loading} disabled={loading}>
        <ButtonText>
          {loading ? '시작하는 중...' : '라이드 시작하기'}
          <FontAwesomeIcon
            icon={loading ? faUnlock : faBolt}
            color="#fff"
            style={{marginLeft: 8}}
            size={screenHeight / 46}
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

const Button = styled(TouchableOpacity)<{loading: boolean}>`
  opacity: ${({loading}) => (loading ? 0.8 : 1)}
  width: 100%;
  margin: 10px 0;
  shadow-color: #999;
  shadow-opacity: 1;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
  height: ${screenHeight * 0.065}px;
  border-radius: ${screenHeight * 0.022}px;
  background-color: #000;
  padding: 15px;
  margin: 2px 0;
`;

const ButtonText = styled(Text)`
  color: #fff;
  width: 100%;
  text-align: center;
  font-size: ${screenHeight / 43}px;
  align-items: center;
  justify-content: center;
`;
