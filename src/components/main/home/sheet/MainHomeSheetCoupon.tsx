import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSetRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {PaymentsCoupon} from '../../../../api/payments';
import {screenHeight, screenWidth} from '../../../../constants/screenSize';
import {CouponSelectorState} from '../../../../recoils/couponSelector';
import {selectedCouponState} from '../../../../recoils/selectedCoupon';
import {CouponFlatlist} from '../../../coupon/flatlist';

export const MainHomeSheetCoupon: React.FC = () => {
  const setSelectedCoupon = useSetRecoilState(selectedCouponState);
  const setCouponSelector = useSetRecoilState(CouponSelectorState);

  const onSelect = (coupon?: PaymentsCoupon) => {
    setCouponSelector(false);
    setSelectedCoupon(coupon);
  };

  return (
    <View style={{width: '100%'}}>
      <TopBar>
        <TouchableOpacity onPress={() => onSelect()}>
          <FontAwesomeIcon icon={faAngleLeft} size={screenWidth / 15} />
        </TouchableOpacity>
        <Title>쿠폰 선택</Title>
      </TopBar>
      <CouponFlatlist onSelect={onSelect} />
    </View>
  );
};

const TopBar = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled(Text)`
  font-size: ${screenHeight / 30}px;
  font-weight: 900;
  color: #000;
`;
