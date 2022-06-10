import {useNavigation} from '@react-navigation/native';
import AnimatedLottieView, {AnimationObject} from 'lottie-react-native';
import React, {useState} from 'react';
import {Alert, SafeAreaView, Text, View} from 'react-native';
import styled from 'styled-components/native';
import {BottomButton} from '../../components/BottomButton';
import {Depth} from '../../components/Depth';
import {screenHeight} from '../../constants/screenSize';
import {useInterval} from '../../hooks/useInterval';

type ConnectStatus = 'request' | 'searching' | 'pairing' | 'completed';
const icons: {[key in ConnectStatus]: AnimationObject} = {
  request: require('../../assets/lotties/86974-registration.json'),
  searching: require('../../assets/lotties/28925-wait-to-connect.json'),
  pairing: require('../../assets/lotties/95717-connect-onekey-by-bluetooth.json'),
  completed: require('../../assets/lotties/97163-upload-complete.json'),
};

const messages: {[key in ConnectStatus]: string} = {
  request: '서버에 요청 중...',
  searching: '헬멧을 찾는 중...',
  pairing: '헬멧을 해제하는 중...',
  completed: '완료되었습니다.',
};

export const HelmetBorrow: React.FC = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState<ConnectStatus>('request');
  useInterval(
    () => {
      if (status === 'completed') return;
      const steps = Object.keys(messages);
      const idx = steps.indexOf(status) + 1;
      setStatus(steps[idx] as ConnectStatus);
    },
    status !== 'completed' ? 4000 : 0,
  );

  const onComplete = () => navigation.navigate('Main');
  const onBack = () => {
    const onPress = () => navigation.goBack();
    Alert.alert(
      '헬멧과 통신하는 중...',
      '헬멧 대여를 취소하시겠습니까?',
      [
        {text: '아니요', style: 'cancel'},
        {text: '네, 취소합니다', onPress},
      ],
      {cancelable: true},
    );
  };

  return (
    <SafeAreaView style={{height: '100%'}}>
      <Depth
        onPress={onBack}
        color={status === 'completed' ? '#fff' : '#000'}
        disabled={status === 'completed'}
      />
      <Container>
        <Title>{messages[status]}</Title>
        <Description>
          {status === 'completed'
            ? '이제 헬멧을 꺼내어 착용해주세요.'
            : '다소 시간이 걸릴 수 있습니다.'}
        </Description>
        <LottieView
          source={icons[status]}
          loop={status !== 'completed'}
          autoPlay
        />
      </Container>
      {status === 'completed' && (
        <BottomButton onPress={onComplete}>이어서 라이드하기</BottomButton>
      )}
    </SafeAreaView>
  );
};

const Container = styled(View)`
  margin: 12% 8%;
  margin-top: ${screenHeight * 0.1}px;
`;

const Title = styled(Text)`
  font-size: ${screenHeight / 25}px;
  font-weight: 900;
`;

const Description = styled(Text)`
  font-size: ${screenHeight / 40}px;
  font-weight: 300;
`;

const LottieView = styled(AnimatedLottieView)`
  padding-top: ${screenHeight * 0.6}px;
`;
