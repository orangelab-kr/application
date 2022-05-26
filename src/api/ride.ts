import {CommonResponse} from '../models/common';
import {createClient} from './client';

export interface RequestRideGetNearKickboard {
  lat: number;
  lng: number;
  radius?: number;
}

export interface RideRegionPricing {
  pricingId: string;
  name: string;
  standardPrice: number;
  nightlyPrice: number;
  standardTime: number;
  maxPrice: number;
  perMinuteStandardPrice: number;
  perMinuteNightlyPrice: number;
  surchargePrice: number;
  helmetLostPrice: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface RideRegionGeofenceGeojson {
  type: string;
  coordinates: [[[number, number]]];
}

export interface RideRegionGeofenceProfile {
  profileId: string;
  name: string;
  priority: number;
  speed?: any;
  color: string;
  canReturn: boolean;
  hasSurcharge: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface RideRegionGeofence {
  geofenceId: string;
  enabled: boolean;
  name: string;
  geojson: RideRegionGeofenceGeojson;
  regionId: string;
  profileId: string;
  weblink: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  profile: RideRegionGeofenceProfile;
}

export interface RideRegion {
  regionId: string;
  enabled: boolean;
  name: string;
  pricingId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  pricing: RideRegionPricing;
  geofences: RideRegionGeofence[];
}

export interface RideKickboard {
  kickboardId: string;
  kickboardCode: string;
  lost?: number;
  status: {
    gps: {
      latitude: number;
      longitude: number;
    };
    power: {
      scooter: {
        battery: number;
      };
    };
  };
  helmetId: string | null;
}

export interface RequestRideTerminate {
  latitude?: number;
  longitude?: number;
}

export interface RequestRideStart {
  kickboardCode: string;
  latitude: number;
  longitude: number;
  couponId?: string;
  debug?: boolean;
}

export type ResponseRideGetAllRegions = CommonResponse<{
  regions: RideRegion[];
}>;

export type ResponseRideGetNearKickboards = CommonResponse<{
  kickboards: RideKickboard[];
}>;

export type ResponseRideGetKickboard = CommonResponse<{
  kickboard: RideKickboard;
}>;

export type ResponseRideGetRides = CommonResponse<{
  rides: RideRide[];
  total: number;
}>;

export interface RideOpenApi {
  rideId: string;
}

export interface RideProperties {
  openapi: RideOpenApi;
}

export interface RequestRideGetRides {
  take?: number;
  skip?: number;
  orderByField?: string;
  orderBySort?: string;
}

export interface RideRide {
  rideId: string;
  userId: string;
  kickboardCode: string;
  photo?: any;
  couponId?: any;
  properties: RideProperties;
  price: number;
  isLocked: boolean;
  isLightsOn: boolean;
  maxSpeed: number;
  endedAt?: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
}

export type ResponseRideGetRide = CommonResponse<{ride: RideRide}>;

export class RideClient {
  private static client = createClient('ride');

  static async getAllRegions(): Promise<ResponseRideGetAllRegions> {
    return this.client.get('/regions').then(r => r.data);
  }

  static async getNearKickboards(
    params: RequestRideGetNearKickboard,
  ): Promise<ResponseRideGetNearKickboards> {
    return this.client.get('/kickboards', {params}).then(r => r.data);
  }

  static async getKickboard(
    kickboardCode: string,
  ): Promise<ResponseRideGetKickboard> {
    return this.client.get(`/kickboards/${kickboardCode}`).then(r => r.data);
  }

  static async start(params: RequestRideStart): Promise<ResponseRideGetRide> {
    return this.client.post('/current', {}, {params}).then(r => r.data);
  }

  static async terminate(
    params: RequestRideTerminate,
  ): Promise<CommonResponse> {
    return this.client.delete('/current', {params}).then(r => r.data);
  }

  static async getCurrentRide(): Promise<ResponseRideGetRide> {
    return this.client.get('/current').then(r => r.data);
  }

  static async getKickboardCodeByQrcode(url: string): Promise<string> {
    return this.client
      .post('/kickboards/qrcode', {url})
      .then(r => r.data.kickboardCode);
  }

  static async setReturnedPhotoInRide(
    rideId: string,
    photo: string,
  ): Promise<void> {
    return this.client.post(`/histories/${rideId}/photo`, {photo});
  }

  public static async getRides(
    params: RequestRideGetRides,
  ): Promise<ResponseRideGetRides> {
    return this.client.get('/histories', {params}).then(r => r.data);
  }
}
