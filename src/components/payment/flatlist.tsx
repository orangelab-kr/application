import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import {PaymentsCard, PaymentsClient} from '../../api/payments';
import {PaymentItem} from './item';

export const PaymentFlatlist: FC = () => {
  const navigation = useNavigation();
  const [cards, setCards] = useState<PaymentsCard[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () =>
      PaymentsClient.getCards().then(({cards}) => setCards(cards)),
    );

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

  return (
    <NestableScrollContainer>
      <NestableDraggableFlatList
        data={cards}
        renderItem={PaymentItem}
        keyExtractor={card => card.cardId}
        onDragEnd={({data}) => setCards(data)}
      />
    </NestableScrollContainer>
  );
};
