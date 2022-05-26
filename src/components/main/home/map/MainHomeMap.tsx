import React, {createRef, useEffect} from 'react';
import NaverMapView, {LayerGroup, MapType} from 'react-native-nmap';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {useRecoilValueDebounce} from '../../../../hooks/useRecoilValueDebounce';
import {cameraLocState} from '../../../../recoils/cameraLoc';
import {confirmState} from '../../../../recoils/confirm';
import {selectedKickboardState} from '../../../../recoils/selectedKickboard';
import {selectedKickboardCodeState} from '../../../../recoils/selectedKickboardCode';
import {selectedRegionState} from '../../../../recoils/selectedRegion';
import {trackingModeState} from '../../../../recoils/trackingMode';
import {useRecoilValueMaybe} from '../../../../tools/recoil';
import {MainHomeMapKickboard} from './MainHomeMapKickboards';
import {MainHomeMapRegionBulk} from './MainHomeMapRegionBulk';

export interface MainHomeMap {}

export const MainHomeMap: React.FC<MainHomeMap> = ({}) => {
  const mapRef = createRef<NaverMapView>();
  const selectedKickboard = useRecoilValueMaybe(selectedKickboardState);
  const setSelectedKickboard = useSetRecoilState(selectedKickboardCodeState);
  const setConfirm = useSetRecoilState(confirmState);
  const [, setCameraLoc] = useRecoilValueDebounce(cameraLocState, 800);
  const setSelectedRegion = useSetRecoilState(selectedRegionState);
  const trackingMode = useRecoilValue(trackingModeState);

  const onMapClick = () => {
    setConfirm(false);
    if (selectedKickboard) {
      setSelectedKickboard(undefined);
      return;
    }

    setSelectedRegion(undefined);
  };

  useEffect(() => {
    mapRef.current?.setLocationTrackingMode(trackingMode);
  }, [trackingMode]);

  useEffect(() => {
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
      // minZoomLevel={12}
      onCameraChange={setCameraLoc}
      onMapClick={onMapClick}
      useTextureView>
      <MainHomeMapRegionBulk />
      <MainHomeMapKickboard />
    </NaverMapView>
  );
};
