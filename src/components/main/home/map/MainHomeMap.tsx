import React, {createRef, useEffect} from 'react';
import NaverMapView, {
  LayerGroup,
  MapType,
  TrackingMode,
} from 'react-native-nmap';
import {RideKickboard} from '../../../../api/ride';
import {CameraLoc} from '../../../../models/cameraLoc';
import {MainHomeMapKickboard} from './MainHomeMapKickboards';
import {MainHomeMapRegionBulk} from './MainHomeMapRegionBulk';

export interface MainHomeMap {
  cameraLoc?: CameraLoc;
  setCameraLoc: React.Dispatch<React.SetStateAction<CameraLoc | undefined>>;
  selectedKickboard?: RideKickboard;
  setSelectedKickboard: React.Dispatch<
    React.SetStateAction<RideKickboard | undefined>
  >;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
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
      minZoomLevel={12}
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
