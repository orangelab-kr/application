import {faGamepad} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import _ from 'lodash';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {RideClient} from '../../../../api/ride';
import {screenHeight} from '../../../../constants/screenSize';
import {useGeolocation} from '../../../../hooks/useGeolocation';

export const MainHomeSheetControlButton: React.FC = () => {
  const [coords] = useGeolocation();

  return (
    <Button
      onPress={() =>
        RideClient.terminate(_.pick(coords, 'latitude', 'longitude'))
      }>
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
