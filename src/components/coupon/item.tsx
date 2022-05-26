import dayjs from 'dayjs';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SwipeableItem from 'react-native-swipeable-item';
import styled from 'styled-components/native';
import {PaymentsCoupon} from '../../api/payments';
import {UnderlayRight} from '../UnderlayRight';

export interface CouponItemProps extends RenderItemParams<PaymentsCoupon> {
  itemRefs: React.MutableRefObject<Map<any, any>>;
  onDelete: () => void | Promise<void>;
  onPress: () => any;
}

export const CouponItem: FC<CouponItemProps> = props => {
  const {item, itemRefs, onDelete, onPress} = props;

  return (
    <ScaleDecorator>
      <SwipeableItem
        key={item.couponId}
        item={item}
        overSwipe={20}
        snapPointsRight={[75]}
        renderUnderlayRight={() => (
          <UnderlayRight {...props} onPress={onDelete} />
        )}
        ref={ref => {
          if (!ref || itemRefs.current.get(item.couponId)) return;
          itemRefs.current.set(item.couponId, ref);
        }}
        onChange={({open}) => {
          if (!open) return;
          [...itemRefs.current.entries()].forEach(([key, ref]) => {
            if (key !== item.couponId && ref) ref.close();
          });
        }}>
        <Container>
          <TouchableCoupon onPress={onPress}>
            <CouponLabel>
              <CouponName>{item.couponGroup.name}</CouponName>
              <CouponLabelDivider />
              {item.couponGroup.description && (
                <CouponDescription>
                  {item.couponGroup.description}
                </CouponDescription>
              )}
              <CouponDate>
                {dayjs(item.createdAt).format('YYYY년 MM월 DD일 등록')}
              </CouponDate>
            </CouponLabel>
          </TouchableCoupon>
        </Container>
      </SwipeableItem>
    </ScaleDecorator>
  );
};

const Container = styled(View)`
  margin: 12px 8px 5px;
  border-radius: 16px;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  shadow-color: #999;
  shadow-opacity: 1;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
  align-items: center;
`;

const TouchableCoupon = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 9px;
`;

const CouponLabel = styled(View)`
  width: 90%;
  margin-left: 15px;
`;

const CouponName = styled(Text)`
  font-weight: 900;
  font-size: 26px;
`;

const CouponDescription = styled(Text)`
  font-weight: 600;
  font-size: 18px;
`;

const CouponLabelDivider = styled(View)`
  border-width: 0.5px;
  border-color: #000;
  margin: 3px 0;
`;

const CouponDate = styled(Text)`
  font-size: 13px;
  font-weight: 400;
`;
