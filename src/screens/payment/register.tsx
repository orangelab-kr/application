import {RouteProp, useRoute} from '@react-navigation/native';
import {Formik, FormikProps} from 'formik';
import React, {FC, useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {PaymentsClient, RequestPaymentsRegisterCard} from '../../api/payments';
import {BottomButton} from '../../components/BottomButton';
import {Depth} from '../../components/Depth';
import {ShadowInput} from '../../components/ShadowInput';
import {ValidateMessage} from '../../components/ValidateMessage';
import {screenHeight} from '../../constants/screenSize';
import {PaymentsNavigatorRouteParams} from '../../models/navigation';
import {navigationRef} from '../../navigators/navigation';
import {onCardNumberFormatter, onExpiryFormatter} from '../../tools/formatter';

export type PaymentRegisterForm = RequestPaymentsRegisterCard;
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
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false);
  const formRef = useRef<FormikProps<PaymentRegisterForm>>(null);
  const {params} =
    useRoute<RouteProp<PaymentsNavigatorRouteParams, 'Register'>>();
  const initialValues: PaymentRegisterForm = {
    cardNumber: '',
    expiry: '',
    birthday: '',
    password: '',
    ...params,
  };

  useEffect(() => {
    setRerender(!rerender);
  }, []);

  const onRegister = async (body: PaymentRegisterForm) => {
    try {
      setLoading(true);
      const {card} = await PaymentsClient.registerCard({
        ...body,
        cardNumber: body.cardNumber.replace(/-/g, ''),
        expiry: body.expiry.replace(/\//, ''),
      });

      Notifier.showNotification({
        title: `${card.cardName} 카드를 등록하였습니다.`,
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'success',
          titleStyle: {color: '#fff'},
        },
      });

      navigationRef.current?.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{height: '100%'}}>
      <KeyboardAvoidingView behavior="position">
        <Depth />
        <ScrollView>
          <Container>
            <Title>카드 등록</Title>
            <Description>자동 결제로 간편하게 결제하세요. ✅</Description>
            <Formik
              innerRef={formRef}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={onRegister}
              validationSchema={PaymentRegisterScheme}
              initialValues={initialValues}>
              {({handleChange, handleBlur, values, errors}) => (
                <View>
                  <ShadowInput
                    editable={!loading}
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
                    editable={!loading}
                    maxLength={7}
                    value={values.expiry}
                    onChangeText={handleChange('expiry')}
                    onBlur={handleBlur('expiry')}
                    onFormat={onExpiryFormatter}
                    placeholder="만료일(YYYY/MM)"
                    keyboardType="phone-pad"
                  />
                  <ValidateMessage message={errors.expiry} />

                  <ShadowInput
                    editable={!loading}
                    maxLength={10}
                    value={values.birthday}
                    onChangeText={handleChange('birthday')}
                    onBlur={handleBlur('birthday')}
                    placeholder="주민등록번호 6자리 또는 사업자등록번호"
                    keyboardType="phone-pad"
                  />
                  <ValidateMessage message={errors.birthday} />

                  <ShadowInput
                    editable={!loading}
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
      <BottomButton onPress={formRef.current?.submitForm}>확인</BottomButton>
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
