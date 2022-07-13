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

export type RideShortRegion = Partial<RideRegion> &
  Pick<RideRegion, 'regionId' | 'name' | 'cacheUrl' | 'main'> & {
    geofences: RideRegionGeofence[];
  };

export interface RideRegion {
  regionId: string;
  enabled: boolean;
  name: string;
  main: boolean;
  cacheUrl: string;
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

export interface RequestRideGetCurrentGeofence {
  lat: number;
  lng: number;
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

export type ResponseRideGetRegions = CommonResponse<{
  regions: Pick<RideRegion, 'regionId' | 'name' | 'cacheUrl' | 'main'>[];
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

export interface RideHelmet {
  borrowId: string;
  status: 'IDLE' | 'BORROWED' | 'RETURNED';
  deviceInfo: string;
  returnedAt: Date | null;
  rideId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface RideHelmetCredentials {
  _id: string;
  status: number;
  macAddress: string;
  version: number;
  battery: number;
  password: string;
  encryptKey: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ResponseRideGetRide = CommonResponse<{ride: RideRide}>;
export type ResponseRideHelmet = CommonResponse<{helmet: RideHelmet}>;
export type ResponseRideHelmetCredentials = CommonResponse<{
  helmet: RideHelmetCredentials;
}>;

export type ResponseRideGetGeofence = CommonResponse<{
  geofence: RideRegionGeofence & {region: RideRegion};
}>;

export class RideClient {
  private static client = createClient('ride');

  static async getRegions(): Promise<ResponseRideGetRegions> {
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

  public static async lights(on: boolean): Promise<void> {
    await this.client.get(`/current/lights/${on ? 'on' : 'off'}`);
  }

  public static async lock(on: boolean): Promise<void> {
    await this.client.get(`/current/lock/${on ? 'on' : 'off'}`);
  }

  public static async borrowHelmet(
    deviceInfo: string,
  ): Promise<ResponseRideHelmet> {
    return this.client
      .get(`/current/helmet/borrow`, {params: {deviceInfo}})
      .then(r => r.data);
  }

  public static async getHelmetStatus(): Promise<ResponseRideHelmet> {
    return this.client.get(`/current/helmet`).then(r => r.data);
  }

  public static async borrowHelmetComplete(): Promise<ResponseRideHelmet> {
    return this.client.patch(`/current/helmet/borrow`).then(r => r.data);
  }

  public static async returnHelmet(): Promise<ResponseRideHelmet> {
    return this.client.get(`/current/helmet/return`).then(r => r.data);
  }

  public static async returnHelmetComplete(): Promise<ResponseRideHelmet> {
    return this.client.patch(`/current/helmet/return`).then(r => r.data);
  }

  public static async getHelmetCredentials(): Promise<ResponseRideHelmetCredentials> {
    return this.client.get(`/current/helmet/credentials`).then(r => r.data);
  }

  public static async getCurrentGeofence(
    params: RequestRideGetCurrentGeofence,
  ): Promise<ResponseRideGetGeofence> {
    return this.client.get(`/location`, {params}).then(r => r.data);
  }
}
