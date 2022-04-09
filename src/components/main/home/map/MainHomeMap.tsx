import NaverMapView, {
  LayerGroup,
  MapType,
  TrackingMode,
} from 'react-native-nmap';
import {MainHomeMapKickboard} from './MainHomeMapKickboards';
import {MainHomeMapRegionBulk} from './MainHomeMapRegionBulk';
import React, {createRef, useEffect} from 'react';
import {CameraLoc} from '../../../../models/cameraLoc';

export interface MainHomeMap {
  cameraLoc?: CameraLoc;
  setCameraLoc: React.Dispatch<React.SetStateAction<CameraLoc | undefined>>;
}

export const MainHomeMap: React.FC<MainHomeMap> = ({
  cameraLoc,
  setCameraLoc,
}) => {
  const mapRef = createRef<NaverMapView>();
  useEffect(() => {
    mapRef.current?.setLocationTrackingMode(TrackingMode.Follow);
    mapRef.current?.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BUILDING, true);
    mapRef.current?.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BICYCLE, true);
  }, []);

  return (
    <NaverMapView
      ref={mapRef}
      style={{height: '100%', width: '100%'}}
      compass={false}
      scaleBar={false}
      zoomControl={true}
      mapType={MapType.Basic}
      minZoomLevel={12}
      onCameraChange={setCameraLoc}
      useTextureView>
      <MainHomeMapRegionBulk />
      <MainHomeMapKickboard cameraLoc={cameraLoc} />
    </NaverMapView>
  );
};
