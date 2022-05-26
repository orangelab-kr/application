import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import styled from 'styled-components/native';
import {PaymentsClient, PaymentsCoupon} from '../../api/payments';
import {screenWidth} from '../../constants/screenSize';
import {CouponItem} from './item';

export interface CouponFlatlistProps {
  onSelect?: (coupon: PaymentsCoupon) => any;
}

export const CouponFlatlist: React.FC<CouponFlatlistProps> = ({onSelect}) => {
  const navigation = useNavigation();
  const [coupons, setCoupons] = useState<PaymentsCoupon[]>([]);
  const itemRefs = useRef(new Map());

  const loadCoupons = () =>
    PaymentsClient.getCoupons({}).then(({coupons}) => setCoupons(coupons));

  useEffect(() => {
    loadCoupons();
    const unsubscribe = navigation.addListener('focus', loadCoupons);
    return unsubscribe;
  }, []);

  const onDelete = (coupon: PaymentsCoupon) => async () => {
    const {couponId, couponGroup} = coupon;
    Notifier.showNotification({
      title: `${couponGroup.name} 쿠폰을 삭제하였습니다.`,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'error',
        titleStyle: {color: '#fff'},
      },
    });

    await PaymentsClient.deleteCoupon(couponId).then(loadCoupons);
  };

  const onPress = (coupon: PaymentsCoupon) => () =>
    onSelect && onSelect(coupon);
  return coupons.length > 0 ? (
    <DraggableFlatList
      data={coupons}
      keyExtractor={coupon => coupon.couponId}
      renderItem={props => (
        <CouponItem
          {...props}
          itemRefs={itemRefs}
          onDelete={onDelete(props.item)}
          onPress={onPress(props.item)}
        />
      )}
    />
  ) : (
    <NoCouponContainer>
      <NoCoupon>🤨 아직 쿠폰이 없습니다.</NoCoupon>
    </NoCouponContainer>
  );
};

const NoCoupon = styled(Text)`
  font-size: ${screenWidth / 16}px;
  width: 100%;
  text-align: center;
  font-weight: 600;
  padding: 10px;
`;

const NoCouponContainer = styled(View)`
  border-radius: 8px;
  background-color: #fff;
  margin-top: ${screenWidth * 0.05}px;
  margin: 10px 0;
  shadow-color: #999;
  shadow-opacity: 1;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
`;
