import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Formik, FormikProps} from 'formik';
import React, {createRef, useState} from 'react';
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
import * as Yup from 'yup';
import {AccountsClient, RequestAccountsAuthSignup} from '../../../api/accounts';
import {Terms} from '../../../components/auth/signup/terms/Terms';
import {TermsGroup} from '../../../components/auth/signup/terms/TermsGroup';
import {Depth} from '../../../components/Depth';
import {ValidateMessage} from '../../../components/ValidateMessage';
import {screenHeight} from '../../../constants/screenSize';
import {AuthNavigatorRouteParams} from '../../../models/navigation';

export interface AuthSignupTermsForm {
  terms: boolean;
  privacy: boolean;
  locationPrivacy: boolean;
  receiveSMS: boolean;
  receivePush: boolean;
}

const AuthSignupTermsSchema: Yup.SchemaOf<AuthSignupTermsForm> =
  Yup.object().shape({
    terms: Yup.boolean().isTrue('반드시 동의하여야 합니다.').required(),
    privacy: Yup.boolean().isTrue('반드시 동의하여야 합니다.').required(),
    locationPrivacy: Yup.boolean()
      .isTrue('반드시 동의하여야 합니다.')
      .required(),
    receiveSMS: Yup.boolean().required(),
    receivePush: Yup.boolean().required(),
  });

export const AuthSignupTerms: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const formRef = createRef<FormikProps<AuthSignupTermsForm>>();
  const initialValues: AuthSignupTermsForm = {
    terms: false,
    privacy: false,
    locationPrivacy: false,
    receiveSMS: true,
    receivePush: true,
  };

  const {params} =
    useRoute<RouteProp<AuthNavigatorRouteParams, 'SignupTerms'>>();
  const onCheckbox = (key: keyof AuthSignupTermsForm) => (value: boolean) => {
    formRef.current?.setFieldValue(key, value);
  };

  const onSignup = async ({receiveSMS, receivePush}: AuthSignupTermsForm) => {
    try {
      setLoading(true);
      const body: RequestAccountsAuthSignup = {
        ...params,
        receiveSMS,
        receivePush,
        receiveEmail: false,
      };

      const {sessionId} = await AccountsClient.signup(body);
      await AsyncStorage.setItem('accessToken', sessionId);
      navigation.dispatch(
        CommonActions.reset({index: 0, routes: [{name: 'Main'}]}),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="position">
        <Depth />
        <StatusBar barStyle="dark-content" />
        <ScrollView keyboardShouldPersistTaps="never">
          <Container>
            <Title>거의 다 완료되었어요. 👍</Title>
            <Title>
              아래 <Bold>이용약관</Bold>에 동의해주세요.
            </Title>
            <Formik
              innerRef={formRef}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={onSignup}
              validationSchema={AuthSignupTermsSchema}
              initialValues={initialValues}>
              {({handleSubmit, values, errors}) => (
                <View>
                  <TermsGroup>
                    <Terms
                      name="📝 이용약관"
                      url="https://i.hikick.kr/terms"
                      value={values.terms}
                      onChange={onCheckbox('terms')}
                      required
                    />
                    <ValidateMessage message={errors.terms} />
                    <Terms
                      name="🔒 개인정보취급방침"
                      url="https://i.hikick.kr/policy"
                      value={values.privacy}
                      onChange={onCheckbox('privacy')}
                      required
                    />
                    <ValidateMessage message={errors.privacy} />
                    <Terms
                      name="🗺 위치기반서비스"
                      url="https://i.hikick.kr/terms/location"
                      value={values.locationPrivacy}
                      onChange={onCheckbox('locationPrivacy')}
                      required
                    />
                    <ValidateMessage message={errors.locationPrivacy} />
                    <Terms
                      name="☎️ SMS 수신 동의"
                      value={values.receiveSMS}
                      onChange={onCheckbox('receiveSMS')}
                    />
                    <ValidateMessage message={errors.receiveSMS} />
                    <Terms
                      name="📳 푸시 수신 동의"
                      value={values.receivePush}
                      onChange={onCheckbox('receivePush')}
                    />
                    <ValidateMessage message={errors.receivePush} />
                  </TermsGroup>
                  <Button onPress={handleSubmit}>
                    <ButtonText>
                      {loading ? '처리 중...' : '완료하기'}
                    </ButtonText>
                  </Button>
                </View>
              )}
            </Formik>
          </Container>
        </ScrollView>
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
