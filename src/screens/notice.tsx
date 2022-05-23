import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import {Depth} from '../components/Depth';
import {RootNavigatorRouteParams} from '../models/navigation';

export const Notice: React.FC = () => {
  const {params} = useRoute<RouteProp<RootNavigatorRouteParams, 'Notice'>>();
  const path = params?.page || 'notice';

  return (
    <SafeAreaView style={{flex: 1}}>
      <Depth />
      <WebView
        style={{height: '100%', width: '100%', opacity: 0.99, minHeight: 1}}
        source={{uri: `https://i.hikick.kr/${path}`}}
        javascriptEnabled
        startInLoadingState
        scalesPageToFit
      />
    </SafeAreaView>
  );
};
