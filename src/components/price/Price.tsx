import React from 'react';
import {Text, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import styled from 'styled-components/native';
import {screenHeight} from '../../constants/screenSize';
import {currentRegionState} from '../../recoils/currentRegion';
import {selectedGeofenceState} from '../../recoils/selectedRegion';

export const Price: React.FC = () => {
  const selectedRegion = useRecoilValue(currentRegionState);
  const pricing = selectedRegion?.region.pricing;

  return (
    <Container>
      <PriceInfo style={{color: '#fff'}}>
        잠금해제 {pricing?.standardPrice.toLocaleString()}원
      </PriceInfo>
      <PriceInfo style={{color: '#fff'}}>
        분당 {pricing?.perMinuteStandardPrice.toLocaleString()}원
      </PriceInfo>
    </Container>
  );
};

const Container = styled(View)`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: ${screenHeight * 0.86}px;
  padding: ${screenHeight * 0.005}px;
  left: 0;
  right: 0;
`;

const PriceInfo = styled(Text)`
  color: #0a0c0c;
  font-weight: 600;
  shadow-color: #999;
  shadow-opacity: 0.6;
  shadow-radius: 5px;
  elevation: 1;
  shadow-offset: {width: 3px, height: 3px};
`;
