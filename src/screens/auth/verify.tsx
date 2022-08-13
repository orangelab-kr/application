import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, RouteProp, useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CodePush from 'react-native-code-push';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {
  AccountsClient,
  AuthVerifyPhone,
  ResponseAccountsAuthLogin,
} from '../../api/accounts';
import {Depth} from '../../components/Depth';
import {ShadowInput} from '../../components/ShadowInput';
import {ValidateMessage} from '../../components/ValidateMessage';
import {screenHeight} from '../../constants/screenSize';
import {AuthNavigatorRouteParams} from '../../models/navigation';
import {navigationRef} from '../../navigators/navigation';
import {onPhoneFormatter} from '../../tools/formatter';
export interface AuthVerifyForm {
  code: string;
}

const AuthVerifySchema: Yup.SchemaOf<AuthVerifyForm> = Yup.object().shape({
  code: Yup.string()
    .required('인증번호를 입력해주세요.')
    .length(6, '올바르지 않은 인증번호입니다.'),
});

export const AuthVerify: React.FC = () => {
  const initialValues: AuthVerifyForm = {code: ''};
  const {params} = useRoute<RouteProp<AuthNavigatorRouteParams, 'Verify'>>();
  const onVerify = async (form: AuthVerifyForm) => {
    try {
      const {phone} = await AccountsClient.verifyPhone(
        params.phoneNo,
        form.code,
      );

      const login = await onLogin(phone);
      if (!login) return navigationRef.current?.navigate('SignupName', {phone});
      await AsyncStorage.setItem('accessToken', login.sessionId);
      CodePush.restartApp();
    } catch (err) {
      console.log(err);
    }
  };

  const onLogin = async (
    phone: AuthVerifyPhone,
  ): Promise<ResponseAccountsAuthLogin | undefined> => {
    try {
      return await AccountsClient.loginByPhone(phone);
    } catch (err) {}
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="position">
        <StatusBar barStyle="dark-content" />
        <Depth />
        <Container>
          <Title>{onPhoneFormatter(params.phoneNo)}</Title>
          <Title>
            <Bold>인증번호</Bold>를 발송하였습니다. ✅
          </Title>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={onVerify}
            validationSchema={AuthVerifySchema}
            initialValues={initialValues}>
            {({handleChange, handleBlur, handleSubmit, errors, values}) => (
              <View>
                <ShadowInput
                  value={values.code}
                  onChangeText={handleChange('code')}
                  onBlur={handleBlur('code')}
                  autoFocus={true}
                  onFormat={onPhoneFormatter}
                  placeholder="인증번호 6자리"
                  keyboardType="phone-pad"
                  maxLength={6}
                  onPress={handleSubmit}
                />
                <ValidateMessage message={errors.code} />
                <Button onPress={handleSubmit}>
                  <ButtonText>확인</ButtonText>
                </Button>
              </View>
            )}
          </Formik>
        </Container>
      </KeyboardAvoidingView>
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
  color: #0a0c0c;
  font-size: 26px;
  shadow-color: #999;
  shadow-opacity: 0.3;
  shadow-radius: 3px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
  font-weight: 300;
`;

const Bold = styled(Text)`
  font-weight: 800;
`;
