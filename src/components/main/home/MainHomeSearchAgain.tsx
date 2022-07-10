import {faRefresh} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {RideClient} from '../../../api/ride';
import {screenHeight} from '../../../constants/screenSize';
import {CameraLoc} from '../../../models/cameraLoc';
import {cameraLocState} from '../../../recoils/cameraLoc';
import {kickboardsState} from '../../../recoils/kickboards';
import {calculateMeter, distance} from '../../../tools/calculateMeter';

export const MainHomeSearchAgain: React.FC<TouchableOpacityProps> = props => {
  const [showSearch, setShowSearch] = useState(false);
  const cameraLoc = useRecoilValue(cameraLocState);
  const [previousCameraLoc, setPreviousCameraLoc] = useState<CameraLoc>();
  const setKickboards = useSetRecoilState(kickboardsState);

  useEffect(() => {
    if (!cameraLoc) return;
    if (!previousCameraLoc) {
      setPreviousCameraLoc(cameraLoc);
      return;
    }

    const meter = distance(
      cameraLoc.latitude,
      cameraLoc.longitude,
      previousCameraLoc.latitude,
      previousCameraLoc.longitude,
    );

    if (meter <= 1500) {
      console.log(`Moved too close. not requesting api (Distance: ${meter}m)`);

      return;
    }

    setShowSearch(true);
  }, [cameraLoc]);

  const onSearch = async () => {
    if (!cameraLoc) return;
    setShowSearch(false);

    const props = {
      lat: cameraLoc.latitude,
      lng: cameraLoc.longitude,
      radius: Math.min(Math.round(calculateMeter(cameraLoc)), 10000),
    };

    setPreviousCameraLoc(cameraLoc);
    RideClient.getNearKickboards(props).then(({kickboards}) =>
      setKickboards(_.keyBy(kickboards, 'kickboardCode')),
    );
  };

  useEffect(() => {
    if (!cameraLoc || previousCameraLoc) return;
    onSearch();
  }, [cameraLoc, previousCameraLoc]);

  if (!showSearch) return <></>;
  return (
    <Button onPress={onSearch} {...props}>
      <FontAwesomeIcon icon={faRefresh} color="#000" size={18} />
      <ButtonText>다시 검색하기</ButtonText>
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  flex-direction: row;
  position: absolute;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  justify-content: center;
  top: ${screenHeight * 0.078}px;
  right: ${screenHeight * 0.14}px;
  left: ${screenHeight * 0.14}px;
  shadow-color: #999;
  shadow-opacity: 1;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 6px, height: 6px};
`;

const ButtonText = styled(Text)`
  margin-left: 5px;
  font-size: 18px;
  font-weight: 800;
  color: #000;
`;
