import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
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
import styled from 'styled-components/native';
import {Depth} from '../../../components/Depth';
import {screenHeight} from '../../../constants/screenSize';
import {AuthNavigatorRouteParams} from '../../../models/navigation';
import * as Yup from 'yup';
import {ValidateMessage} from '../../../components/ValidateMessage';

export interface AuthSignupBirthdayForm {
  birthday: Date;
}

const defaultBirthday = new Date(946734800000);
const AuthSignupBirthdaySchema: Yup.SchemaOf<AuthSignupBirthdayForm> =
  Yup.object().shape({
    birthday: Yup.date().nope(
      [defaultBirthday],
      '생년월일을 반드시 입력하세요.',
    ),
  });

export const AuthSignupBirthday: React.FC = () => {
  const navigation = useNavigation();
  const initialValues: AuthSignupBirthdayForm = {birthday: defaultBirthday};
  const {params} =
    useRoute<RouteProp<AuthNavigatorRouteParams, 'SignupBirthday'>>();
  const onVerify = (payload: AuthSignupBirthdayForm) =>
    navigation.navigate('SignupTerms', {...params, ...payload});

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="position">
        <Depth />
        <StatusBar barStyle="dark-content" />
        <ScrollView keyboardShouldPersistTaps="always">
          <Container>
            <Title>{params.realname}님 반가워요.</Title>
            <Title>
              <Bold>생년월일</Bold>을 알려주세요! 🥳
            </Title>
            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={onVerify}
              validationSchema={AuthSignupBirthdaySchema}
              initialValues={initialValues}>
              {({handleChange, handleSubmit, values, errors}) => (
                <View>
                  <DatePicker
                    date={new Date(values.birthday)}
                    onDateChange={d => handleChange('birthday')(`${d}`)}
                    mode="date"
                  />
                  <ValidateMessage message={errors.birthday} />
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
  font-weight: 900;
`;
