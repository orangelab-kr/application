import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import {Depth} from '../components/Depth';
import {RootNavigatorRouteParams} from '../models/navigation';

export const Weblink: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>();
  const {params} = useRoute<RouteProp<RootNavigatorRouteParams, 'Weblink'>>();
  useEffect(() => {
    AsyncStorage.getItem('accessToken').then(setAccessToken);
  }, []);

  let injectAccessToken = `(function() {
    let token = window.localStorage.getItem('weblink-session-id');
      if(!token || (token && token != '${accessToken}')){
        window.localStorage.setItem('weblink-session-id', '${accessToken}');
        window.location.reload();
      }
    })();`;

  if (!accessToken) return <></>;
  return (
    <SafeAreaView style={{flex: 1}}>
      <Depth />
      <WebView
        style={{height: '100%', width: '100%', opacity: 0.99, minHeight: 1}}
        source={{uri: `https://weblink.hikick.kr/${params.page}`}}
        injectedJavaScriptBeforeContentLoaded={injectAccessToken}
        javascriptEnabled
        startInLoadingState
        scalesPageToFit
      />
    </SafeAreaView>
  );
};
