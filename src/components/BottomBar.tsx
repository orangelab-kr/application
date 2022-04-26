import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';

export const BottomBar: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>();
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
      <WebView
        incognito
        style={{height: '100%', width: '100%', opacity: 0.99, minHeight: 1}}
        source={{uri: `https://weblink.hikick.kr/bottombar`}}
        injectedJavaScriptBeforeContentLoaded={injectAccessToken}
        javascriptEnabled
        startInLoadingState
        scalesPageToFit
        bounces={false}
        scrollEnabled={false}
      />
    </SafeAreaView>
  );
};
