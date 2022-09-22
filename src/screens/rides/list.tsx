import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {CommonText} from '../../components/common/CommonText';
import {Depth} from '../../components/Depth';
import {RideFlatlist} from '../../components/ride/flatlist';
import {screenHeight} from '../../constants/screenSize';

export const RideList: FC = () => {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Depth />
      <Container>
        <Title>라이드 기록</Title>
        <Description>그만큼 하이킥이 편하다는 증거 👍</Description>
        <RideFlatlist />
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(SafeAreaView)`
  margin: 10px 30px;
  margin-bottom: ${screenHeight * 0.08}px;
`;

const Title = styled(CommonText)`
  color: #0a0c0c;
  font-size: ${screenHeight / 25}px;
  font-weight: 700;
`;

const Description = styled(CommonText)`
  color: #0a0c0c;
  font-size: ${screenHeight / 40}px;
  font-weight: 300;z
`;
