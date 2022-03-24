import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {Terms} from '../../../components/auth/signup/terms/Terms';
import {TermsGroup} from '../../../components/auth/signup/terms/TermsGroup';
import {Depth} from '../../../components/Depth';
import {screenHeight} from '../../../constants/screenSize';

export const AuthSignupTerms: React.FC = () => {
  const navigation = useNavigation();
  const onSignup = () => navigation.navigate('Verify');

  return (
    <SafeAreaView>
      <ScrollView>
        <Depth />
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
          <Container>
            <Title>거의 다 완료되었어요. 👍</Title>
            <Title>
              아래 <Bold>이용약관</Bold>에 동의해주세요.
            </Title>
            <TermsGroup>
              <Terms
                name="📝 이용약관"
                url="https://i.hikick.kr/terms"
                required
              />
              <Terms
                name="🔒 개인정보취급방침"
                url="https://i.hikick.kr/policy"
                required
              />
              <Terms
                name="🗺 위치기반서비스"
                url="https://i.hikick.kr/terms/location"
                required
              />
            </TermsGroup>
            <Button onPress={onSignup}>
              <ButtonText>회원가입 완료</ButtonText>
            </Button>
          </Container>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  margin: 12% 8%;
  margin-top: ${screenHeight * 0.2}px;
`;

const Button = styled(TouchableOpacity)`
  margin: 15px 0;
  width: 100%;
  height: ${screenHeight * 0.05}px;
  align-items: center;
  justify-content: center;
  background-color: black;
  border-radius: 3px;
  shadow-color: #999;
  shadow-opacity: 0.3;
  shadow-radius: 3px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
`;

const ButtonText = styled(Text)`
  color: white;
  font-weight: 600;
`;

const Title = styled(Text)`
  font-size: 26px;
  shadow-color: #999;
  shadow-opacity: 0.3;
  shadow-radius: 3px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
  font-weight: 300;
`;

const Bold = styled(Text)`
  font-weight: 900;
`;
