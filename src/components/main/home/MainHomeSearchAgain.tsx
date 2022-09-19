import {faRefresh} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {RideClient} from '../../../api/ride';
import {screenHeight} from '../../../constants/screenSize';
import {CameraLoc} from '../../../models/cameraLoc';
import {cameraLocState} from '../../../recoils/cameraLoc';
import {currentRegionState} from '../../../recoils/currentRegion';
import {geofencesState} from '../../../recoils/geofences';
import {kickboardsState} from '../../../recoils/kickboards';
import {selectedGeofenceState} from '../../../recoils/selectedRegion';
import {calculateMeter, distance} from '../../../tools/calculateMeter';

export const MainHomeSearchAgain: React.FC<TouchableOpacityProps> = props => {
  const insets = useSafeAreaInsets();
  const [showSearch, setShowSearch] = useState(false);
  const cameraLoc = useRecoilValue(cameraLocState);
  const [previousCameraLoc, setPreviousCameraLoc] = useState<CameraLoc>();
  const setCurrentRegion = useSetRecoilState(currentRegionState);
  const setSelectedGeofence = useSetRecoilState(selectedGeofenceState);
  const setKickboards = useSetRecoilState(kickboardsState);
  const setGeofences = useSetRecoilState(geofencesState);
  const topMargin = Math.floor(screenHeight * 0.07 + insets.top);

  const onSearchKickboard = async () => {
    if (!cameraLoc) return;
    const props = {
      lat: cameraLoc.latitude,
      lng: cameraLoc.longitude,
      radius: Math.min(Math.round(calculateMeter(cameraLoc)), 10000),
    };

    RideClient.getNearKickboards(props).then(({kickboards}) =>
      setKickboards(_.keyBy(kickboards, 'kickboardCode')),
    );
  };

  const onSearchGeofence = async () => {
    if (!cameraLoc) return;

    const {latitude: lat, longitude: lng} = cameraLoc;
    console.log(lat, lng);
    const {geofence} = await RideClient.getCurrentGeofence({lat, lng});
    setCurrentRegion(geofence);

    const {data} = await axios.get(geofence.region.cacheUrl);
    setGeofences(data);
  };

  const onSearch = async () => {
    if (!cameraLoc) return;
    setShowSearch(false);
    setSelectedGeofence(undefined);

    await Promise.all([onSearchKickboard(), onSearchGeofence()]);
    setPreviousCameraLoc(cameraLoc);
  };

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

    if (meter <= 1000) {
      console.log(`Moved too close. not requesting api (Distance: ${meter}m)`);

      return;
    }

    if (meter > 10000) {
      onSearch();
      return;
    }

    setShowSearch(true);
  }, [cameraLoc, onSearch]);

  useEffect(() => {
    if (!cameraLoc || previousCameraLoc) return;
    onSearch();
  }, [cameraLoc, previousCameraLoc]);

  if (!showSearch) return <></>;
  return (
    <Button onPress={onSearch} style={{top: topMargin}} {...props}>
      <ButtonText>다시 검색하기</ButtonText>
      <FontAwesomeIcon
        size={screenHeight * 0.02}
        icon={faRefresh}
        color="#0a0c0c"
      />
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  flex-direction: row;
  position: absolute;
  background-color: #fcfeff;
  justify-content: center;
  align-items: center;
  border-radius: ${screenHeight * 0.02}px;
  padding: ${screenHeight * 0.01}px;
  right: ${screenHeight * 0.14}px;
  left: ${screenHeight * 0.14}px;
`;

const ButtonText = styled(Text)`
  font-size: ${screenHeight * 0.02}px;
  margin-right: 5px;
  font-weight: 800;
  color: #0a0c0c;
`;
