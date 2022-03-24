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
import {Depth} from '../../../components/Depth';
import {ShadowInput} from '../../../components/ShadowInput';
import {screenHeight} from '../../../constants/screenSize';

export const AuthSignupName: React.FC = () => {
  const navigation = useNavigation();
  const onClick = () => navigation.navigate('SignupBirthday');

  return (
    <SafeAreaView>
      <ScrollView>
        <Depth disabled />
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
          <Container>
            <Title>안녕하세요?</Title>
            <Title>
              <Bold>이름</Bold>이 어떻게 되시나요? 🤔
            </Title>
            <ShadowInput
              autoFocus={true}
              placeholder="이름"
              maxLength={6}
              onPress={onClick}
            />
            <Button onPress={onClick}>
              <ButtonText>다음</ButtonText>
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
