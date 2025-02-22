import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {BottomButton} from '../../components/BottomButton';
import {CommonText} from '../../components/common/CommonText';
import {CouponFlatlist} from '../../components/coupon/flatlist';
import {Depth} from '../../components/Depth';
import {screenHeight} from '../../constants/screenSize';
import {navigationRef} from '../../navigators/navigation';

export const CouponList: FC = () => {
  const onRegisterPress = () =>
    navigationRef.current?.navigate('Coupon', {screen: 'Register'});

  return (
    <SafeAreaView style={{height: '100%'}}>
      <Depth />
      <Container>
        <Title>쿠폰</Title>
        <Description>모든 것이 공짜가 되는 순간까지 ⭐️</Description>
        <CouponFlatlist />
      </Container>
      <BottomButton onPress={onRegisterPress}>쿠폰 등록</BottomButton>
    </SafeAreaView>
  );
};

const Container = styled(SafeAreaView)`
  margin: 10px 30px;
  margin-bottom: ${screenHeight * 0.22}px;
`;

const Title = styled(CommonText)`
  color: #0a0c0c;
  font-size: ${screenHeight / 25}px;
  font-weight: 700;
`;

const Description = styled(CommonText)`
  color: #0a0c0c;
  font-size: ${screenHeight / 40}px;
  font-weight: 300;
`;
