import React, {createRef, useEffect} from 'react';
import NaverMapView, {
  LayerGroup,
  MapType,
  TrackingMode,
} from 'react-native-nmap';
import {useSetRecoilState} from 'recoil';
import {useRecoilValueDebounce} from '../../../../hooks/useRecoilValueDebounce';
import {cameraLocState} from '../../../../recoils/cameraLoc';
import {confirmState} from '../../../../recoils/confirm';
import {selectedKickboardState} from '../../../../recoils/selectedKickboard';
import {selectedKickboardCodeState} from '../../../../recoils/selectedKickboardCode';
import {selectedRegionState} from '../../../../recoils/selectedRegion';
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
  const onMapClick = () => {
    setConfirm(false);
    if (selectedKickboard) {
      setSelectedKickboard(undefined);
      return;
    }

    setSelectedRegion(undefined);
  };

  useEffect(() => {
    mapRef.current?.setLocationTrackingMode(TrackingMode.Follow);
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
