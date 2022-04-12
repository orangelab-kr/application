import React, {createRef, useEffect} from 'react';
import NaverMapView, {
  LayerGroup,
  MapType,
  TrackingMode,
} from 'react-native-nmap';
import {RideKickboard} from '../../../../api/ride';
import {CameraLoc} from '../../../../models/cameraLoc';
import {
  HookResultSetValue,
  HookResultValue,
} from '../../../../models/hookResult';
import {MainHomeMapKickboard} from './MainHomeMapKickboards';
import {MainHomeMapRegionBulk} from './MainHomeMapRegionBulk';

export interface MainHomeMap {
  cameraLoc?: HookResultValue<CameraLoc>;
  setCameraLoc: HookResultSetValue<CameraLoc>;
  selectedKickboard?: HookResultValue<RideKickboard>;
  setSelectedKickboard: HookResultSetValue<RideKickboard>;
  mode: HookResultValue<string, never>;
  setMode: HookResultSetValue<string, never>;
}

export const MainHomeMap: React.FC<MainHomeMap> = ({
  cameraLoc,
  setCameraLoc,
  selectedKickboard,
  setSelectedKickboard,
  mode,
  setMode,
}) => {
  const mapRef = createRef<NaverMapView>();
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
      useTextureView>
      <MainHomeMapRegionBulk />
      <MainHomeMapKickboard
        // Camera Loc
        cameraLoc={cameraLoc}
        // Selected Kickboard
        selectedKickboard={selectedKickboard}
        setSelectedKickboard={setSelectedKickboard}
        // Mode
        mode={mode}
        setMode={setMode}
      />
    </NaverMapView>
  );
};
