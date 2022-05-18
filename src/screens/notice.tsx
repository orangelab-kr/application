import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import {Depth} from '../components/Depth';
import {RootNavigatorRouteParams} from '../models/navigation';

export const Notice: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Depth />
      <WebView
        style={{height: '100%', width: '100%', opacity: 0.99, minHeight: 1}}
        source={{uri: `https://i.hikick.kr/notice`}}
        javascriptEnabled
        startInLoadingState
        scalesPageToFit
      />
    </SafeAreaView>
  );
};
