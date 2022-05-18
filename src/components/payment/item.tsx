import {faAngleRight, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
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
import {PaymentsCard} from '../../api/payments';
import {UnderlayRight} from '../UnderlayRight';

export interface PaymentItemProps extends RenderItemParams<PaymentsCard> {
  itemRefs: React.MutableRefObject<Map<any, any>>;
  onDelete: () => void | Promise<void>;
}

export const PaymentItem: FC<PaymentItemProps> = props => {
  const {drag, item, itemRefs, onDelete} = props;

  return (
    <ScaleDecorator>
      <SwipeableItem
        key={item.cardId}
        item={item}
        overSwipe={20}
        snapPointsRight={[75]}
        renderUnderlayRight={() => (
          <UnderlayRight {...props} onPress={onDelete} />
        )}
        ref={ref => {
          if (!ref || itemRefs.current.get(item.cardId)) return;
          itemRefs.current.set(item.cardId, ref);
        }}
        onChange={({open}) => {
          if (!open) return;
          [...itemRefs.current.entries()].forEach(([key, ref]) => {
            if (key !== item.cardId && ref) ref.close();
          });
        }}>
        <Container>
          <TouchableCard onPressIn={drag}>
            <FontAwesomeIcon icon={faEllipsisV} color="#999" size={23} />
            <CardLabel>
              <CardName>{item.cardName}</CardName>
              <CardDate>
                {dayjs(item.createdAt).format('YYYY년 MM월 DD일 등록')}
              </CardDate>
            </CardLabel>
          </TouchableCard>
          <TouchableRight>
            <FontAwesomeIcon icon={faAngleRight} color="#999" size={23} />
          </TouchableRight>
        </Container>
      </SwipeableItem>
    </ScaleDecorator>
  );
};

const Container = styled(View)`
  margin-top: 10px;
  border-radius: 3px;
  background-color: #eee;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TouchableCard = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 18px 0 18px 18px;
`;

const CardLabel = styled(View)`
  margin-left: 15px;
`;

const CardName = styled(Text)`
  font-weight: 600;
  font-size: 25px;
`;

const CardDate = styled(Text)`
  font-size: 15px;
`;

const TouchableRight = styled(TouchableOpacity)`
  padding: 18px;
`;
