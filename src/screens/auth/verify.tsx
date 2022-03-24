import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
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
import {Depth} from '../../components/Depth';
import {ShadowInput} from '../../components/ShadowInput';
import {screenHeight} from '../../constants/screenSize';
import {onPhoneFormatter} from '../../tools/formatter';

export const AuthVerify: React.FC = () => {
  const navigation = useNavigation();
  const onVerify = () => navigation.navigate('SignupName');

  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
          <Depth />
          <Container>
            <Title>010-9563-7570</Title>
            <Title>
              <Bold>인증번호</Bold>를 발송하였습니다. ✅
            </Title>
            <ShadowInput
              autoFocus={true}
              onFormat={onPhoneFormatter}
              placeholder="인증번호 6자리"
              keyboardType="phone-pad"
              maxLength={6}
              onPress={onVerify}
            />
            <Button onPress={onVerify}>
              <ButtonText>
                확인 <FontAwesomeIcon icon={faSpinner} />
              </ButtonText>
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
