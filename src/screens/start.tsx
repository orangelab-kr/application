import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, KeyboardAvoidingView, StatusBar, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {ShadowInput} from '../components/ShadowInput';
import {screenHeight} from '../constants/screenSize';
import {onPhoneFormatter} from '../tools/formatter';

export const Start: React.FC = () => {
  const navigation = useNavigation();
  const onLogin = () => navigation.navigate('Auth');

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView behavior="position">
        <BackgroundImage source={require('../assets/start-background.png')} />
        <Container>
          <Title>이동의 즐거움,</Title>
          <Title>지금 시작해볼까요? 🛴🛴</Title>
          <ShadowInput
            onPress={onLogin}
            onFormat={onPhoneFormatter}
            textContentType="telephoneNumber"
            dataDetectorTypes="phoneNumber"
            placeholder="전화번호"
            keyboardType="phone-pad"
            maxLength={16}
            buttonName="로그인"
          />
        </Container>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const BackgroundImage = styled(Image)`
  height: ${screenHeight * 0.72}px;
  width: 100%;
`;

const Container = styled(View)`
  margin: 12% 8%;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: 900;
`;
