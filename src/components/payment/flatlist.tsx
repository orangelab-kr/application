import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {Text} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import styled from 'styled-components/native';
import {PaymentsCard, PaymentsClient} from '../../api/payments';
import {screenWidth} from '../../constants/screenSize';
import {PaymentItem} from './item';

export const PaymentFlatlist: FC = () => {
  const navigation = useNavigation();
  const [cards, setCards] = useState<PaymentsCard[]>([]);
  const itemRefs = useRef(new Map());

  const loadCards = () =>
    PaymentsClient.getCards().then(({cards}) => setCards(cards));

  useEffect(() => {
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
        titleStyle: {color: '#fff'},
      },
    });

    await PaymentsClient.deleteCard(cardId).then(loadCards);
  };

  return cards.length > 0 ? (
    <DraggableFlatList
      data={cards}
      keyExtractor={card => card.cardId}
      onDragEnd={({data}) => setCards(data)}
      renderItem={props => (
        <PaymentItem
          {...props}
          itemRefs={itemRefs}
          onDelete={onDelete(props.item)}
        />
      )}
    />
  ) : (
    <NoCard>아직 카드가 없습니다.{'\n'}결제 수단을 등록해볼까요?</NoCard>
  );
};

const NoCard = styled(Text)`
  width: 100%;
  text-align: center;
  font-weight: 300;
  margin-top: ${screenWidth * 0.05}px;
  font-size: ${screenWidth / 15}px;
`;
