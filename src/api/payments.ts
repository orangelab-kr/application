import {CommonResponse} from '../models/common';
import {createClient} from './client';

export type ResponsePaymentsCard = CommonResponse<{card: PaymentsCard}>;
export type ResponsePaymentsCards = CommonResponse<{cards: PaymentsCard[]}>;

export interface RequestPaymentsRegisterCard {
  cardNumber: string;
  expiry: string;
  birthday: string;
  password: string;
}

export interface PaymentsCard {
  cardId: string;
  userId: string;
  orderBy: number;
  cardName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export class PaymentsClient {
  private static client = createClient('payments');

  public static async registerCard(
    body: RequestPaymentsRegisterCard,
  ): Promise<ResponsePaymentsCard> {
    return this.client.post('/cards', body).then(r => r.data);
  }

  public static async getCards(): Promise<ResponsePaymentsCards> {
    return this.client.get('/cards').then(r => r.data);
  }

  public static async setCardOrders(cardIds: string[]): Promise<void> {
    return this.client.post('/cards/orderBy', cardIds).then(r => r.data);
  }
}
