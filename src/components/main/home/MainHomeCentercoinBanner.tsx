import React, { Suspense } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';
import { screenHeight } from '../../../constants/screenSize';
import { navigationRef } from '../../../navigators/navigation';
import { loginedUserState } from '../../../recoils/loginedUser';
import { useRecoilValueMaybe } from '../../../tools/recoil';

export const MainHomeCentercoinBanner: React.FC = () => {
  const insets = useSafeAreaInsets();
  const loginedUser = useRecoilValueMaybe(loginedUserState);
  const topMargin = Math.floor(screenHeight * 0.01 + insets.top);
  const balance = loginedUser?.centercoinAddress
    ? loginedUser.centercoinBalance
    : 1000;

  const onClick = () =>
    navigationRef.current?.navigate('Notice', {page: 'centercoin'});
  return (
    <Button style={{top: topMargin}} onPress={onClick}>
      <MyBalance>
        💸 내 리워드{' '}
        <MyBalanceNumber>{balance.toLocaleString()}원</MyBalanceNumber>
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
  color: #0a0c0c;
`;

const MyBalance = styled(Text)`
  font-size: ${screenHeight * 0.026}px;
  font-weight: 400;
  color: #0a0c0c;
`;

const MyBalanceNumber = styled(Text)`
  color: darkblue;
  font-weight: 800;
`;
