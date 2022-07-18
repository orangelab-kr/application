import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {screenHeight} from '../../../constants/screenSize';

export const MainHomeCentercoinBanner: React.FC = () => {
  return (
    <Button>
      <MyBalance>
        💸 내 리워드 <MyBalanceNumber>1,000원</MyBalanceNumber>
      </MyBalance>
      <ButtonText>지금 당장 킥보드타고 캐시백 받자!</ButtonText>
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  position: absolute;
  padding: 5px;
  border-radius: 7px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  top: ${screenHeight * 0.05}px;
  right: ${screenHeight * 0.02}px;
  left: ${screenHeight * 0.02}px;
  shadow-color: #999;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 6px, height: 6px};
`;

const ButtonText = styled(Text)`
  font-size: 17px;
  font-weight: 600;
  color: #000;
`;

const MyBalance = styled(Text)`
  font-size: 22px;
  font-weight: 400;
  color: #000;
`;

const MyBalanceNumber = styled(Text)`
  color: darkblue;
  font-weight: 900;
`;
