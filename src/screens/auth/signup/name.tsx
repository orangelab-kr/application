import {RouteProp, useRoute} from '@react-navigation/native';
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
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {Depth} from '../../../components/Depth';
import {ShadowInput} from '../../../components/ShadowInput';
import {ValidateMessage} from '../../../components/ValidateMessage';
import {screenHeight} from '../../../constants/screenSize';
import {AuthNavigatorRouteParams} from '../../../models/navigation';
import {navigationRef} from '../../../navigators/navigation';

export interface AuthSignupNameForm {
  realname: string;
}

const AuthSignupNameSchema: Yup.SchemaOf<AuthSignupNameForm> =
  Yup.object().shape({
    realname: Yup.string()
      .required()
      .matches(/^[가-힣]+$/, '실명으로 입력해주세요.')
      .min(2, '실명으로 입력해주세요.')
      .max(16, '이름이 너무 깁니다.')
      .required('반드시 입력해주세요.'),
  });

export const AuthSignupName: React.FC = () => {
  const initialValues: AuthSignupNameForm = {realname: ''};
  const {params} =
    useRoute<RouteProp<AuthNavigatorRouteParams, 'SignupName'>>();
  const onNext = (payload: AuthSignupNameForm) =>
    navigationRef.current?.navigate('SignupBirthday', {...params, ...payload});

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="position">
        <Depth disabled />
        <StatusBar barStyle="dark-content" />
        <ScrollView keyboardShouldPersistTaps="always">
          <Container>
            <Title>안녕하세요?</Title>
            <Title>
              <Bold>이름</Bold>이 어떻게 되시나요? 🤔
            </Title>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={onNext}
              validationSchema={AuthSignupNameSchema}
              initialValues={initialValues}>
              {({handleChange, handleBlur, handleSubmit, values, errors}) => (
                <View>
                  <ShadowInput
                    value={values.realname}
                    onChangeText={handleChange('realname')}
                    onBlur={handleBlur('realname')}
                    onPress={handleSubmit}
                    autoFocus={true}
                    placeholder="성함"
                    maxLength={16}
                  />

                  <ValidateMessage message={errors.realname} />
                  <Button onPress={handleSubmit}>
                    <ButtonText>다음</ButtonText>
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
  font-weight: 800;
`;
