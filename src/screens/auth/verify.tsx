import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
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
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {number} from 'yup/lib/locale';
import {Depth} from '../../components/Depth';
import {ShadowInput} from '../../components/ShadowInput';
import {screenHeight} from '../../constants/screenSize';
import {AuthNavigatorRouteParams} from '../../models/navigation';
import {onPhoneFormatter} from '../../tools/formatter';
import * as Yup from 'yup';
import {ValidateMessage} from '../../components/ValidateMessage';
export interface AuthVerifyForm {
  code: string;
}

const AuthVerifySchema: Yup.SchemaOf<AuthVerifyForm> = Yup.object().shape({
  code: Yup.string()
    .required('인증번호를 입력해주세요.')
    .length(6, '올바르지 않은 인증번호입니다.'),
});

export const AuthVerify: React.FC = () => {
  const navigation = useNavigation();
  const initialValues: AuthVerifyForm = {code: ''};
  const {params} = useRoute<RouteProp<AuthNavigatorRouteParams, 'Verify'>>();
  // const onVerify = (phone: AuthVerifyPhone) =>
  const onVerify = () =>
    navigation.navigate('SignupName', {
      phone: {phoneId: '123123', phoneNo: params.phoneNo, code: '123123'},
    });

  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
          <Depth />
          <Container>
            <Title>{params.phoneNo}</Title>
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
