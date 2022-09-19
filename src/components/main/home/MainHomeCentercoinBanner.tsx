import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {screenHeight, screenWidth} from '../../../constants/screenSize';
import {navigationRef} from '../../../navigators/navigation';
import {loginedUserState} from '../../../recoils/loginedUser';
import {useRecoilValueMaybe} from '../../../tools/recoil';

export const MainHomeCentercoinBanner: React.FC = () => {
  const loginedUser = useRecoilValueMaybe(loginedUserState);
  const balance = loginedUser?.centercoinAddress
    ? loginedUser.centercoinBalance
    : 1000;

  const onClick = () =>
    navigationRef.current?.navigate('Notice', {page: 'centercoin'});
  return (
    <Button onPress={onClick}>
      <MyBalance>
        내 리워드{' '}
        <MyBalanceNumber>{balance.toLocaleString()}원 </MyBalanceNumber>
      </MyBalance>
      <ButtonText>지금 바로 킥보드타고 캐시백 받자!</ButtonText>
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  position: absolute;
  background-color: #fcfeff;
  justify-content: center;
  align-items: center;
  border-radius: ${screenHeight * 0.02}px;
  padding: ${screenHeight * 0.011}px ${screenWidth * 0.05}px;
  right: ${screenHeight * 0.1}px;
  left: ${screenHeight * 0.1}px;
  shadow-color: #999;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 6px, height: 6px};
  bottom: 15px;
`;

const ButtonText = styled(Text)`
  font-size: ${screenHeight * 0.015}px;
  font-weight: 600;
  color: #0a0c0c;
`;

const MyBalance = styled(Text)`
  font-size: ${screenHeight * 0.02}px;
  font-weight: 400;
  color: #0a0c0c;
`;

const MyBalanceNumber = styled(Text)`
  color: darkblue;
  font-weight: 800;
`;
