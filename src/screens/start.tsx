import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import _ from 'lodash';
import React, {useState} from 'react';
import {Image, KeyboardAvoidingView, StatusBar, Text, View} from 'react-native';
import styled from 'styled-components';
import * as Yup from 'yup';
import {AccountsClient} from '../api/accounts';
import {ShadowInput} from '../components/ShadowInput';
import {screenHeight} from '../constants/screenSize';
import {onPhoneFormatter} from '../tools/formatter';

export interface StartForm {
  phoneNo: string;
}

const StartSchema: Yup.SchemaOf<StartForm> = Yup.object().shape({
  phoneNo: Yup.string().required().min(9).max(13),
});

export const Start: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const initialValues: StartForm = {phoneNo: ''};
  const onLogin = async (params: StartForm) => {
    try {
      setLoading(true);
      const phoneNo = `+82${params.phoneNo.substring(1).replace(/-/g, '')}`;
      await AccountsClient.requestPhone(phoneNo);
      navigation.navigate('Auth', {screen: 'Verify', params: {phoneNo}});
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView behavior="position">
        <BackgroundImage source={require('../assets/start-background.png')} />
        <Container pointerEvents={loading ? 'none' : 'auto'}>
          <Title>이동의 즐거움,</Title>
          <Title>지금 시작해볼까요? 🛴🛴</Title>
          <Formik
            validateOnMount
            validateOnChange
            onSubmit={onLogin}
            validationSchema={StartSchema}
            initialValues={initialValues}>
            {({handleChange, handleBlur, handleSubmit, errors}) => (
              <ShadowInput
                editable={!loading}
                onChangeText={handleChange('phoneNo')}
                onBlur={handleBlur('phoneNo')}
                onFormat={onPhoneFormatter}
                textContentType="telephoneNumber"
                dataDetectorTypes="phoneNumber"
                placeholder="전화번호"
                keyboardType="phone-pad"
                maxLength={16}
                buttonName={loading ? '준비 중...' : '로그인'}
                onPress={handleSubmit.bind(this)}
                hideButton={!_.isEmpty(errors)}
              />
            )}
          </Formik>
        </Container>
      </KeyboardAvoidingView>
    </View>
  );
};

const BackgroundImage = styled(Image)`
  height: ${screenHeight * 0.7}px;
  width: 100%;
`;

const Container = styled(View)`
  margin: 12% 8%;
`;

const Title = styled(Text)`
  color: #000;
  font-size: 24px;
  font-weight: 900;
`;
