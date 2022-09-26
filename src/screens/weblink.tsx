import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {Depth} from '../components/Depth';
import {RootNavigatorRouteParams} from '../models/navigation';

interface WeblinkProps {
  isPopup?: boolean;
}

export const Weblink: React.FC<WeblinkProps> = ({isPopup}) => {
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

  const style = isPopup
    ? {borderRadius: 20}
    : {
        height: '100%',
        width: '100%',
        opacity: 0.99,
        minHeight: 1,
      };

  const page = params?.page || 'bottombar';
  if (!accessToken) return <></>;
  return (
    <SafeAreaView style={{flex: 1}}>
      {!isPopup && <Depth />}
      <WebView
        style={style}
        source={{uri: `https://weblink.hikick.kr/${page}`}}
        injectedJavaScriptBeforeContentLoaded={injectAccessToken}
        javascriptEnabled
        startInLoadingState
        scalesPageToFit
      />
    </SafeAreaView>
  );
};
