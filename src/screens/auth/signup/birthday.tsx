import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {Depth} from '../../../components/Depth';
import {ShadowInput} from '../../../components/ShadowInput';
import {screenHeight} from '../../../constants/screenSize';

export const AuthSignupBirthday: React.FC = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState(new Date(946684800000));
  const onVerify = () => navigation.navigate('SignupTerms');

  return (
    <SafeAreaView>
      <ScrollView>
        <Depth />
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
          <Container>
            <Title>다니엘님 반가워요.</Title>
            <Title>
              <Bold>생년월일</Bold>을 알려주세요! 🥳
            </Title>
            <DatePicker date={value} onDateChange={setValue} mode="date" />
            <Button onPress={onVerify}>
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
