import React from 'react';
import {View} from 'react-native';
import {useRecoilValue} from 'recoil';
import styled from 'styled-components/native';
import {screenHeight, screenWidth} from '../../constants/screenSize';
import {currentRegionState} from '../../recoils/currentRegion';
import {CommonText} from '../common/CommonText';

export const Price: React.FC = () => {
  const selectedRegion = useRecoilValue(currentRegionState);
  const pricing = selectedRegion?.region.pricing;

  return (
    <BottomPrice>
      <View>
        <PriceInfo>
          <Bold>잠금해제</Bold> {pricing?.standardPrice.toLocaleString()}원
        </PriceInfo>
        <PriceInfo>
          <Bold>반납금지구역 반납료</Bold>{' '}
          {pricing?.surchargePrice.toLocaleString()}원
        </PriceInfo>
      </View>
      <Divider />
      <View>
        <PriceInfo>
          <Bold>분당</Bold> {pricing?.perMinuteStandardPrice.toLocaleString()}원
        </PriceInfo>
        <PriceInfo>
          <Bold>헬멧 분실료</Bold> {pricing?.helmetLostPrice.toLocaleString()}원
        </PriceInfo>
      </View>
    </BottomPrice>
  );
};

const Container = styled(View)`
  position: absolute;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  top: ${screenHeight * 0.75}px;
  padding: ${screenHeight * 0.005}px;
  left: 0;
  right: 0;
`;

const BottomPrice = styled(Container)``;

const Divider = styled(View)`
  margin: 0 10px;
  background-color: #fff;
  height: ${screenHeight / 19}px;
  width: 1px;
`;

const PriceInfo = styled(CommonText)`
  color: #fff;
  font-weight: 500;
  text-align: center;
  shadow-color: #999;
  shadow-opacity: 0.6;
  shadow-radius: 5px;
  elevation: 1;
  font-size: ${screenWidth / 25}px;
  shadow-offset: {width: 3px, height: 3px};
  `;

const Bold = styled(PriceInfo)`
  font-weight: 900;
`;
