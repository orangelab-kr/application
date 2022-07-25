import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {screenHeight} from '../../../constants/screenSize';

export const MainHomeCentercoinBanner: React.FC = () => {
  const insets = useSafeAreaInsets();
  const topMargin = Math.floor(screenHeight * 0.01 + insets.top);

  return (
    <Button style={{top: topMargin}}>
      <MyBalance>
        💸 내 리워드 <MyBalanceNumber>1,000원</MyBalanceNumber>
      </MyBalance>
      <ButtonText>지금 당장 킥보드타고 캐시백 받자!</ButtonText>
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  position: absolute;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border-radius: ${screenHeight * 0.02}px;
  padding: ${screenHeight * 0.005}px;
  right: ${screenHeight * 0.02}px;
  left: ${screenHeight * 0.02}px;
  shadow-color: #999;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 6px, height: 6px};
`;

const ButtonText = styled(Text)`
  font-size: ${screenHeight * 0.02}px;
  font-weight: 600;
  color: #000;
`;

const MyBalance = styled(Text)`
  font-size: ${screenHeight * 0.026}px;
  font-weight: 400;
  color: #000;
`;

const MyBalanceNumber = styled(Text)`
  color: darkblue;
  font-weight: 900;
`;
