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

export type ResponseRideGetAllRegions = CommonResponse<{
  regions: RideRegion[];
}>;

export type ResponseRideGetNearKickboards = CommonResponse<{
  kickboards: RideKickboard[];
}>;

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
}
