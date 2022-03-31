import BottomSheet from '@gorhom/bottom-sheet';
import React, {createRef, useEffect} from 'react';
import {View} from 'react-native';
import NaverMapView, {Gravity, LayerGroup, MapType} from 'react-native-nmap';
import {MainHomeSheetWelcome} from '../../components/main/home/sheet/MainHomeSheetWelcome';

export const Home: React.FC = () => {
  const mapRef = createRef<NaverMapView>();

  useEffect(() => {
    mapRef.current?.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BUILDING, true);
    mapRef.current?.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BICYCLE, true);
  });

  return (
    <View>
      <NaverMapView
        ref={mapRef}
        style={{height: '100%', width: '100%'}}
        compass={false}
        scaleBar={false}
        zoomControl={false}
        mapType={MapType.Basic}
        logoGravity={Gravity.RIGHT}
        minZoomLevel={12}
        useTextureView></NaverMapView>
      <BottomSheet
        enableHandlePanningGesture={false}
        snapPoints={['18%']}
        onChange={console.log}>
        <MainHomeSheetWelcome />
      </BottomSheet>
    </View>
  );
};
