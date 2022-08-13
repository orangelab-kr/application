import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { screenHeight } from '../../../../constants/screenSize';
import { CouponSelectorState } from '../../../../recoils/couponSelector';
import { selectedCouponState } from '../../../../recoils/selectedCoupon';

export const MainHomeSheetCouponSelect: React.FC = () => {
  const selectedCoupon = useRecoilValue(selectedCouponState);
  const setCouponSelector = useSetRecoilState(CouponSelectorState);

  return (
    <Button onPress={() => setCouponSelector(true)}>
      <ButtonText>
        <CouponLabel>쿠폰</CouponLabel>
        <CouponSelect>
          {selectedCoupon ? selectedCoupon.couponGroup.name : '선택 안함'}
          <FontAwesomeIcon
            color="#999"
            icon={faAngleRight}
            style={{marginLeft: 15}}
            size={screenHeight / 48}
          />
        </CouponSelect>
      </ButtonText>
    </Button>
  );
};

const CouponLabel = styled(Text)`
  color: #0a0c0c;
  font-size: ${screenHeight / 45}px;
  font-weight: 800;
`;

const CouponSelect = styled(Text)`
  color: #999;
  font-size: ${screenHeight / 46}px;
  font-weight: 500;
`;

const Button = styled(TouchableOpacity)`
  width: 100%;
  height: ${screenHeight * 0.055}px;
  border-radius: ${screenHeight * 0.018}px;
  padding: 10px 15px;
  background-color: #fcfeff;
  margin: 10px 0;
  shadow-color: #999;
  shadow-opacity: 1;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
`;

const ButtonText = styled(View)`
  flex: 1;
  color: #0a0c0c;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  shadow-color: #999;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 5;
`;
