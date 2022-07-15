import {faMap} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';
import {selectedGeofenceState} from '../../../../recoils/selectedRegion';
import {MainHomeSheetCommonProps} from './MainHomeSheet';

export const MainHomeSheetRegion: React.FC<MainHomeSheetCommonProps> = ({}) => {
  const selectedGeofence = useRecoilValue(selectedGeofenceState);

  if (!selectedGeofence) return <></>;
  return (
    <Container>
      <View style={{marginRight: 10}}>
        <RegionName>{selectedGeofence.profile.name}</RegionName>
        <Title>
          <FontAwesomeIcon icon={faMap} size={25} />{' '}
          <Bold>{selectedGeofence.name}</Bold>
        </Title>
      </View>
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: row;
`;

const Distance = styled(Text)`
  color: #000;
  margin-left: 10px;
  font-size: ${screenHeight / 36}px;
`;

const RegionName = styled(Text)`
  color: #999;
  font-weight: 600;
  font-size: ${screenHeight / 45}px;
`;

const Title = styled(Text)`
  font-size: ${screenHeight / 30}px;
  font-weight: 300,
  color: #000
`;

const Bold = styled(Text)`
  font-weight: 800;
`;
