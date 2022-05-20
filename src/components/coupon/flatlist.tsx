import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import styled from 'styled-components/native';
import {PaymentsClient, PaymentsCoupon} from '../../api/payments';
import {screenWidth} from '../../constants/screenSize';
import {CouponItem} from './item';

export const CouponFlatlist: FC = () => {
  const navigation = useNavigation();
  const [coupons, setCoupons] = useState<PaymentsCoupon[]>([]);
  const itemRefs = useRef(new Map());

  const loadCoupons = () =>
    PaymentsClient.getCoupons({}).then(({coupons}) => setCoupons(coupons));

  useEffect(() => {
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

  return coupons.length > 0 ? (
    <DraggableFlatList
      data={coupons}
      keyExtractor={coupon => coupon.couponId}
      renderItem={props => (
        <CouponItem
          {...props}
          itemRefs={itemRefs}
          onDelete={onDelete(props.item)}
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
  font-size: ${screenWidth / 23}px;
  width: 100%;
  text-align: center;
  font-weight: 600;
  padding: 10px;
`;

const NoCouponContainer = styled(View)`
  border-radius: 5px;
  background-color: #eee;
  margin-top: ${screenWidth * 0.05}px;
`;
