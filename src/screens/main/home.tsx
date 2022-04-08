import BottomSheet from '@gorhom/bottom-sheet';
import React, {createRef, useEffect, useState} from 'react';
import {View} from 'react-native';
import NaverMapView, {
  LayerGroup,
  MapType,
  TrackingMode,
} from 'react-native-nmap';
import {useDebounce} from 'use-debounce';
import {MainHomeMapKickboard} from '../../components/main/home/map/MainHomeMapKickboards';
import {MainHomeMapRegionBulk} from '../../components/main/home/map/MainHomeMapRegionBulk';
import {MainHomeSheetWelcome} from '../../components/main/home/sheet/MainHomeSheetWelcome';
import {CameraLoc} from '../../models/cameraLoc';

export const Home: React.FC = () => {
  const mapRef = createRef<NaverMapView>();
  const [unstableCameraLoc, setCameraLoc] = useState<CameraLoc>();
  const [cameraLoc] = useDebounce(unstableCameraLoc, 1500);

  useEffect(() => {
    mapRef.current?.setLocationTrackingMode(TrackingMode.Follow);
    mapRef.current?.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BUILDING, true);
    mapRef.current?.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BICYCLE, true);
  }, []);

  return (
    <View>
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
      <BottomSheet enableHandlePanningGesture={false} snapPoints={['18%']}>
        <MainHomeSheetWelcome />
      </BottomSheet>
    </View>
  );
};
