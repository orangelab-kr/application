import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import styled from 'styled-components/native';
import {PaymentsCard, PaymentsClient} from '../../api/payments';
import {screenWidth} from '../../constants/screenSize';
import {CommonText} from '../common/CommonText';
import {PaymentItem} from './item';

export const PaymentFlatlist: FC = () => {
  const navigation = useNavigation();
  const [cards, setCards] = useState<PaymentsCard[]>([]);
  const itemRefs = useRef(new Map());

  const loadCards = () =>
    PaymentsClient.getCards().then(({cards}) => setCards(cards));

  useEffect(() => {
    loadCards();
    const unsubscribe = navigation.addListener('focus', loadCards);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!cards) return;
    const changes = cards.findIndex((c, i) => c.orderBy !== i);
    if (changes <= -1) return;

    const cardIds = cards.map(c => c.cardId);
    PaymentsClient.setCardOrders(cardIds).then(() =>
      setCards(cards => cards.map((card, i) => ({...card, orderBy: i}))),
    );
  }, [cards]);

  const onDelete = (card: PaymentsCard) => async () => {
    const {cardId} = card;
    Notifier.showNotification({
      title: `${card.cardName} 카드를 삭제하였습니다.`,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'error',
        titleStyle: {color: '#fcfeff'},
      },
    });

    await PaymentsClient.deleteCard(cardId).then(loadCards);
  };

  return (
    <DraggableFlatList
      data={cards}
      keyExtractor={card => card.cardId}
      onDragEnd={({data}) => setCards(data)}
      ListEmptyComponent={
        <NoCardContainer>
          <NoCard>
            🧐 아직 카드가 없습니다.{'\n'}결제 수단을 등록해볼까요?
          </NoCard>
        </NoCardContainer>
      }
      renderItem={props => (
        <PaymentItem
          {...props}
          itemRefs={itemRefs}
          onDelete={onDelete(props.item)}
        />
      )}
    />
  );
};

const NoCard = styled(CommonText)`
  color: #0a0c0c;
  font-size: ${screenWidth / 22}px;
  width: 100%;
  text-align: center;
  font-weight: 600;
  padding: 10px;
`;

const NoCardContainer = styled(View)`
  margin: 10px;
  border-radius: 16px;
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
