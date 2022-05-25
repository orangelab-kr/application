import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {BottomButton} from '../../components/BottomButton';
import {Depth} from '../../components/Depth';
import {PaymentFlatlist} from '../../components/payment/flatlist';
import {screenHeight} from '../../constants/screenSize';

export const PaymentList: FC = () => {
  const navigation = useNavigation();
  const onRegisterPress = () =>
    navigation.navigate('Payment', {screen: 'Register'});

  return (
    <SafeAreaView style={{height: '100%'}}>
      <Depth />
      <Container>
        <Title>결제 수단</Title>
        <Description>필요한 만큼만, 알뜰하게 결제하세요. 👍</Description>
        <PaymentFlatlist />
      </Container>
      <BottomButton onPress={onRegisterPress}>카드 추가</BottomButton>
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
