import axios from 'axios';
import React, {createRef, useEffect} from 'react';
import NaverMapView, {LayerGroup, MapType} from 'react-native-nmap';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {RideClient, RideRegionGeofence} from '../../../../api/ride';
import {useRecoilValueDebounce} from '../../../../hooks/useRecoilValueDebounce';
import {cameraLocState} from '../../../../recoils/cameraLoc';
import {confirmState} from '../../../../recoils/confirm';
import {mainGeofenceState} from '../../../../recoils/mainGeofence';
import {selectedKickboardState} from '../../../../recoils/selectedKickboard';
import {selectedKickboardCodeState} from '../../../../recoils/selectedKickboardCode';
import {selectedGeofenceState} from '../../../../recoils/selectedRegion';
import {trackingModeState} from '../../../../recoils/trackingMode';
import {useRecoilValueMaybe} from '../../../../tools/recoil';
import {MainHomeMapGeofences} from './MainHomeMapGeofences';
import {MainHomeMapKickboard} from './MainHomeMapKickboards';
import {MainHomeMapRegion} from './MainHomeMapRegion';
export interface MainHomeMap {}

export const MainHomeMap: React.FC<MainHomeMap> = ({}) => {
  const mapRef = createRef<NaverMapView>();
  const selectedKickboard = useRecoilValueMaybe(selectedKickboardState);
  const setSelectedKickboard = useSetRecoilState(selectedKickboardCodeState);
  const setConfirm = useSetRecoilState(confirmState);
  const [, setCameraLoc] = useRecoilValueDebounce(cameraLocState, 100);
  const setSelectedRegion = useSetRecoilState(selectedGeofenceState);
  const trackingMode = useRecoilValue(trackingModeState);
  const setMainGeofence = useSetRecoilState(mainGeofenceState);

  const onMapClick = () => {
    setConfirm(false);
    if (selectedKickboard) {
      setSelectedKickboard(undefined);
      return;
    }

    setSelectedRegion(undefined);
  };

  const initalize = async () => {
    const {regions} = await RideClient.getRegions();
    const region = regions.find(region => region.main);
    if (!region) return;

    const geofences = await axios
      .get(region.cacheUrl)
      .then(r => r.data as RideRegionGeofence[]);
    const geofence = geofences.find(geofence => geofence.main);
    setMainGeofence(geofence);
  };

  useEffect(() => {
    mapRef.current?.setLocationTrackingMode(trackingMode);
  }, [trackingMode]);

  useEffect(() => {
    initalize();
    mapRef.current?.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BUILDING, true);
    mapRef.current?.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BICYCLE, true);
  }, []);

  useEffect(() => {
    if (!selectedKickboard) return;
    const {gps} = selectedKickboard.status;
    mapRef.current?.animateToCoordinate(gps);
  }, [selectedKickboard]);

  return (
    <NaverMapView
      ref={mapRef}
      style={{height: '100%', width: '100%'}}
      compass={false}
      scaleBar={false}
      zoomControl={true}
      mapType={MapType.Basic}
      minZoomLevel={14}
      onCameraChange={setCameraLoc}
      onMapClick={onMapClick}
      useTextureView>
      <MainHomeMapRegion />
      <MainHomeMapGeofences />
      <MainHomeMapKickboard />
    </NaverMapView>
  );
};
