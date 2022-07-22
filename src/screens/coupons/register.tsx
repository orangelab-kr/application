import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Formik, FormikProps} from 'formik';
import React, {FC, useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {
  PaymentsClient,
  RequestPaymentsRegisterCoupon,
} from '../../api/payments';
import {BottomButton} from '../../components/BottomButton';
import {Depth} from '../../components/Depth';
import {ShadowInput} from '../../components/ShadowInput';
import {ValidateMessage} from '../../components/ValidateMessage';
import {screenHeight} from '../../constants/screenSize';
import {CouponsNavigatorRouteParams} from '../../models/navigation';
import {navigationRef} from '../../navigators/navigation';

export type CouponRegisterForm = RequestPaymentsRegisterCoupon;
const CouponRegisterScheme: Yup.SchemaOf<CouponRegisterForm> =
  Yup.object().shape({
    code: Yup.string().required('쿠폰 코드를 입력해주세요.'),
  });

export const CouponRegister: FC = () => {
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false);
  const formRef = useRef<FormikProps<CouponRegisterForm>>(null);
  const {params} =
    useRoute<RouteProp<CouponsNavigatorRouteParams, 'Register'>>();
  const initialValues: CouponRegisterForm = {code: '', ...params};

  useEffect(() => {
    setRerender(!rerender);
  }, []);

  const onRegister = async (body: CouponRegisterForm) => {
    try {
      setLoading(true);
      const {coupon} = await PaymentsClient.registerCoupon(body);
      Notifier.showNotification({
        title: `${coupon.couponGroup.name} 쿠폰을 등록하였습니다.`,
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
      <ScrollView>
        <KeyboardAvoidingView behavior="position">
          <Depth />
          <Container>
            <Title>쿠폰 등록</Title>
            <Description>코드를 입력하여 쿠폰을 등록하세요. 😎</Description>
            <Formik
              innerRef={formRef}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={onRegister}
              validationSchema={CouponRegisterScheme}
              initialValues={initialValues}>
              {({handleChange, handleBlur, values, errors}) => (
                <View>
                  <ShadowInput
                    editable={!loading}
                    value={values.code}
                    onChangeText={handleChange('code')}
                    onBlur={handleBlur('code')}
                    placeholder="쿠폰 코드"
                  />
                  <ValidateMessage message={errors.code} />
                </View>
              )}
            </Formik>
          </Container>
        </KeyboardAvoidingView>
      </ScrollView>
      <BottomButton onPress={formRef.current?.submitForm}>등록</BottomButton>
    </SafeAreaView>
  );
};

const Container = styled(SafeAreaView)`
  margin: 10px 30px;
`;

const Title = styled(Text)`
  color: #000;
  font-size: ${screenHeight / 25}px;
  font-weight: 900;
`;

const Description = styled(Text)`
  color: #000;
  font-size: ${screenHeight / 40}px;
  font-weight: 300;
`;
