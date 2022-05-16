import {Formik, FormikProps} from 'formik';
import React, {FC, useRef} from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {BottomButton} from '../../components/BottomButton';
import {Depth} from '../../components/Depth';
import {ShadowInput} from '../../components/ShadowInput';
import {ValidateMessage} from '../../components/ValidateMessage';
import {screenHeight} from '../../constants/screenSize';
import {onCardNumberFormatter, onExpiryFormatter} from '../../tools/formatter';

export interface PaymentRegisterForm {
  cardNumber: string;
  expiry: string;
  birthday: string;
  password: string;
}

const PaymentRegisterScheme: Yup.SchemaOf<PaymentRegisterForm> =
  Yup.object().shape({
    cardNumber: Yup.string().required('카드 번호를 입력해주세요.'),
    expiry: Yup.string().required('올바른 만료일을 입력해주세요.'),
    birthday: Yup.string()
      .min(6, '올바른 생년월일 또는 사업자등록번호를 입력해주세요.')
      .required('생년월일 또는 사업자등록증번호를 입력해주세요.'),
    password: Yup.string().length(2).required('비밀번호 2자리를 입력해주세요.'),
  });

export const PaymentRegister: FC = () => {
  const formRef = useRef<FormikProps<PaymentRegisterForm>>();
  const initialValues: PaymentRegisterForm = {
    cardNumber: '',
    expiry: '',
    birthday: '',
    password: '',
  };

  return (
    <SafeAreaView style={{height: '100%'}}>
      <KeyboardAvoidingView behavior="position">
        <Depth />
        <ScrollView>
          <Container>
            <Title>카드 등록</Title>
            <Description>국제표준으로 안전하게, 🔒</Description>
            <Description>사용한 만큼만 스마트하게! ✅</Description>
            <Formik
              ref={formRef}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={console.log}
              validationSchema={PaymentRegisterScheme}
              initialValues={initialValues}>
              {({handleChange, handleBlur, values, errors}) => (
                <View>
                  <ShadowInput
                    value={values.cardNumber}
                    onChangeText={handleChange('cardNumber')}
                    onBlur={handleBlur('cardNumber')}
                    placeholder="카드 번호"
                    keyboardType="phone-pad"
                    maxLength={19}
                    onFormat={onCardNumberFormatter}
                  />
                  <ValidateMessage message={errors.cardNumber} />

                  <ShadowInput
                    maxLength={5}
                    value={values.expiry}
                    onChangeText={handleChange('expiry')}
                    onBlur={handleBlur('expiry')}
                    onFormat={onExpiryFormatter}
                    placeholder="만료일(MM/YY)"
                    keyboardType="phone-pad"
                  />
                  <ValidateMessage message={errors.expiry} />

                  <ShadowInput
                    maxLength={10}
                    value={values.birthday}
                    onChangeText={handleChange('birthday')}
                    onBlur={handleBlur('birthday')}
                    placeholder="주민등록번호 6자리 또는 사업자등록번호"
                    keyboardType="phone-pad"
                  />
                  <ValidateMessage message={errors.birthday} />

                  <ShadowInput
                    maxLength={2}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder="비밀번호"
                    keyboardType="phone-pad"
                    secureTextEntry
                  />
                  <ValidateMessage message={errors.password} />
                </View>
              )}
            </Formik>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomButton onPress={formRef.current?.submitForm}>등록</BottomButton>
    </SafeAreaView>
  );
};

const Container = styled(SafeAreaView)`
  margin: 10px 30px;
`;

const Title = styled(Text)`
  font-size: ${screenHeight / 25}px;
  font-weight: 900;
`;

const Description = styled(Text)`
  font-size: ${screenHeight / 40}px;
  font-weight: 300;
`;
