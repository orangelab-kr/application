import {useNavigation} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {Alert, SafeAreaView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {BottomButton} from '../../components/BottomButton';
import {Depth} from '../../components/Depth';
import {screenHeight} from '../../constants/screenSize';
import {useInterval} from '../../hooks/useInterval';
import {ConnectStatus, icons} from './borrow';

export const messages: {[key in ConnectStatus]: string} = {
  request: '서버에 요청 중...',
  searching: '주변에 헬멧을 찾는 중...',
  pairing: '잠금을 기다리는 중...',
  completed: '완료되었습니다.',
};

export const HelmetReturn: React.FC = () => {
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
      '라이드를 종료하는 중...',
      '이어서 라이드를 진행하시겠습니까?',
      [
        {text: '아니요', style: 'cancel'},
        {text: '네, 취소합니다', onPress},
      ],
      {cancelable: true},
    );
  };

  const onLost = () => {
    const onPress = () => navigation.goBack();
    Alert.alert(
      '헬멧이 파손되었거나 분실되었나요?',
      '파손 및 분실의 경우, 이용 정책에 따라 15,000원이 추가로 결제됩니다. 오류일 경우, 오류를 증명할 수 있는 사진과 함께 고객센터에 문의주시면 환불 조치해드립니다.',
      [
        {text: '아니요', style: 'cancel'},
        {text: '네, 결제합니다', onPress},
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
        <Title>헬멧을 반납해주세요.</Title>
        <Description>{messages[status]}</Description>
        <LottieView
          style={{marginTop: -50}}
          source={icons[status]}
          loop={status !== 'completed'}
          autoPlay
        />
        {status !== 'completed' && (
          <LostButton onPress={onLost}>
            <LostButtonText>
              혹시 헬멧을 잃어버렸거나 파손되었나요?
            </LostButtonText>
          </LostButton>
        )}
      </Container>
      {status === 'completed' && (
        <BottomButton onPress={onComplete}>반납 완료</BottomButton>
      )}
    </SafeAreaView>
  );
};

const Container = styled(View)`
  margin: 12% 8%;
  margin-top: ${screenHeight * 0.1}px;
`;

const LostButton = styled(TouchableOpacity)`
  margin-top: ${screenHeight * 0.63}px;
  justify-content: center;
  align-items: center;
`;

const LostButtonText = styled(Text)`
  font-size: ${screenHeight / 46}px;
  font-weight: 900;
  color: #696969;
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
