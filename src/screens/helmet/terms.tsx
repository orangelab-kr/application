import {useNavigation} from '@react-navigation/native';
import {Formik, FormikProps} from 'formik';
import React, {createRef} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {Terms} from '../../components/auth/signup/terms/Terms';
import {TermsGroup} from '../../components/auth/signup/terms/TermsGroup';
import {Depth} from '../../components/Depth';
import {ValidateMessage} from '../../components/ValidateMessage';
import {screenHeight} from '../../constants/screenSize';
import {navigationRef} from '../../navigators/navigation';

export interface HelmetTermsForm {
  helmetTerms: boolean;
}

const HelmetTermsSchema: Yup.SchemaOf<HelmetTermsForm> = Yup.object().shape({
  helmetTerms: Yup.boolean().isTrue('반드시 동의하여야 합니다.').required(),
});

export const HelmetTerms: React.FC = () => {
  const formRef = createRef<FormikProps<HelmetTermsForm>>();
  const initialValues: HelmetTermsForm = {helmetTerms: false};
  const onCheckbox = (key: keyof HelmetTermsForm) => (value: boolean) => {
    formRef.current?.setFieldValue(key, value);
  };

  return (
    <SafeAreaView>
      <Depth />
      <Container>
        <Title>헬멧 대여</Title>
        <Description>이용약관에 동의가 필요합니다.</Description>
        <Formik
          innerRef={formRef}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={() =>
            navigationRef.current?.navigate('Helmet', {screen: 'Borrow'})
          }
          validationSchema={HelmetTermsSchema}
          initialValues={initialValues}>
          {({handleSubmit, values, errors}) => (
            <View>
              <TermsGroup>
                <Terms
                  name="📝 헬멧 이용약관"
                  url="https://i.hikick.kr/terms/helmet"
                  value={values.helmetTerms}
                  onChange={onCheckbox('helmetTerms')}
                  required
                />
                <ValidateMessage message={errors.helmetTerms} />
              </TermsGroup>
              <Button onPress={handleSubmit}>
                <ButtonText>헬멧 대여하기</ButtonText>
              </Button>
            </View>
          )}
        </Formik>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  margin: 12% 8%;
  margin-top: ${screenHeight * 0.25}px;
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
