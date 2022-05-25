import React, {FC} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {Depth} from '../components/Depth';
import {screenHeight} from '../constants/screenSize';

export const Rides: FC = () => {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Depth />
      <Container>
        <Title>라이드 기록</Title>
        <Description>그만큼 하이킥이 편하다는 증거 👍</Description>
      </Container>
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
  font-weight: 300;z
`;
