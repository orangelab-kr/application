import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import styled from 'styled-components/native';
import {
  PaymentsClient,
  PaymentsCoupon,
  RequestPaymentsGetCoupons,
} from '../../api/payments';
import {screenWidth} from '../../constants/screenSize';
import {CommonText} from '../common/CommonText';
import {CouponItem} from './item';

export interface CouponFlatlistProps {
  onSelect?: (coupon: PaymentsCoupon) => any;
}

export const CouponFlatlist: React.FC<CouponFlatlistProps> = ({onSelect}) => {
  const navigation = useNavigation();
  const [coupons, setCoupons] = useState<PaymentsCoupon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>();
  const itemRefs = useRef(new Map());
  const [params, setParams] = useState<RequestPaymentsGetCoupons>({
    skip: 0,
    take: 10,
  });

  const loadCoupons = async () => {
    try {
      if (loading) return;
      setLoading(true);
      const {coupons, total} = await PaymentsClient.getCoupons(params);
      setCoupons(c => [..._.pullAllBy(c, coupons, 'couponId'), ...coupons]);
      setTotal(total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, [params]);

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
        titleStyle: {color: '#fcfeff'},
      },
    });

    await PaymentsClient.deleteCoupon(couponId);
    setCoupons(coupons => coupons.filter(c => c.couponId !== couponId));
  };

  const onEndReached = ({distanceFromEnd}: {distanceFromEnd: number}) => {
    if (distanceFromEnd < 0) return;
    if (loading) return;
    if (!total || total <= coupons.length) return;
    setParams(params => {
      let {take, skip} = params;
      if (!skip) skip = 0;
      if (!take) take = 10;
      skip += take;
      return {take, skip};
    });
  };

  const onPress = (coupon: PaymentsCoupon) => () =>
    onSelect && onSelect(coupon);
  return (
    <DraggableFlatList
      bounces
      data={coupons}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.6}
      keyExtractor={coupon => coupon.couponId}
      ListFooterComponent={loading ? <Loading size="large" /> : <></>}
      ListEmptyComponent={
        <NoCouponContainer>
          <NoCoupon>🤨 아직 쿠폰이 없습니다.</NoCoupon>
        </NoCouponContainer>
      }
      renderItem={props => (
        <CouponItem
          {...props}
          itemRefs={itemRefs}
          onDelete={onDelete(props.item)}
          onPress={onSelect && onPress(props.item)}
        />
      )}
    />
  );
};

const Loading = styled(ActivityIndicator)`
  margin-top: 20px;
`;

const NoCoupon = styled(CommonText)`
  color: #0a0c0c;
  font-size: ${screenWidth / 20}px;
  width: 100%;
  text-align: center;
  font-weight: 500;
  padding: 5px;
`;

const NoCouponContainer = styled(View)`
  padding: 8px;
  margin: 12px 8px 5px;
  border-radius: 12px;
  background-color: #fcfeff;
  flex-direction: row;
  justify-content: space-between;
  shadow-color: #999;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
  align-items: center;
`;
