import {CommonResponse} from '../models/common';
import {createClient} from './client';

export type ResponsePaymentsCard = CommonResponse<{card: PaymentsCard}>;
export type ResponsePaymentsCards = CommonResponse<{cards: PaymentsCard[]}>;
export type ResponsePaymentsCoupon = CommonResponse<{coupon: PaymentsCoupon}>;
export type ResponsePaymentsCoupons = CommonResponse<{
  coupons: PaymentsCoupon[];
  total: number;
}>;

export type ResponsePaymentsRecords = CommonResponse<{
  records: PaymentsRecord[];
  total: number;
}>;

export interface PaymentsRecord {
  recordId: string;
  userId: string;
  cardId: Date | null;
  paymentKeyId: string;
  name: string;
  displayName: string;
  amount: number;
  initialAmount: number;
  description: string;
  tid: string | null;
  refundedAt: Date | null;
  reason: string | null;
  processedAt: Date | null;
  retiredAt: string;
  properties: PaymentsRecordProperties;
  dunnedAt: Date | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentsRecordProperties {
  coreservice: PaymentsRecordPropertiesCoreservice;
  openapi: PaymentsRecordPropertiesOpenapi;
}

export interface PaymentsRecordPropertiesCoreservice {
  rideId: string;
}

export interface PaymentsRecordPropertiesOpenapi {
  paymentId: string;
  description: string;
  platformId: string;
  franchiseId: string;
  paymentType: string;
  initialAmount: number;
  amount: number;
  rideId: string;
  reason: string | null;
  refundedAt: Date | null;
  processedAt: Date | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: Date | null;
}

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
  deletedAt: null;
}

export interface PaymentsCouponGroup {
  couponGroupId: string;
  type: string;
  name: string;
  description: string;
  abbreviation?: string;
  validity?: number;
  limit?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface PaymentsCoupon {
  couponId: string;
  userId: string;
  couponGroupId: string;
  couponGroup: PaymentsCouponGroup;
  usedAt?: any;
  expiredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
}

export interface RequestPaymentsGetCoupons {
  take?: number;
  skip?: number;
  search?: number;
  showUsed?: boolean;
  orderByField?: string;
  orderBySort?: string;
}

export interface RequestPaymentsGetRecords {
  take?: number;
  skip?: number;
  search?: string;
  userId?: string;
  orderByField?:
    | 'amount'
    | 'refundedAt'
    | 'processedAt'
    | 'retriedAt'
    | 'createdAt'
    | 'updatedAt';
  orderBySort?: 'asc' | 'desc';
  onlyUnpaid?: boolean;
}

export interface RequestPaymentsRegisterCoupon {
  code: string;
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

  public static async deleteCard(cardId: string): Promise<void> {
    return this.client.delete(`/cards/${cardId}`).then(r => r.data);
  }

  public static async deleteCoupon(couponId: string): Promise<void> {
    return this.client.delete(`/coupons/${couponId}`).then(r => r.data);
  }

  public static async getRecords(
    params: RequestPaymentsGetRecords,
  ): Promise<ResponsePaymentsRecords> {
    return this.client.get('/records', {params}).then(r => r.data);
  }

  public static async getCoupons(
    params: RequestPaymentsGetCoupons,
  ): Promise<ResponsePaymentsCoupons> {
    return this.client.get('/coupons', {params}).then(r => r.data);
  }

  public static async registerCoupon(
    body: RequestPaymentsRegisterCoupon,
  ): Promise<ResponsePaymentsCoupon> {
    return this.client.post('/coupons', body).then(r => r.data);
  }
}
