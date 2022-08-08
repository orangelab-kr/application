import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {useRecoilRefresher_UNSTABLE} from 'recoil';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';
import {loginedUserState} from '../../../../recoils/loginedUser';
import {useRecoilValueMaybe} from '../../../../tools/recoil';

export const MainHomeSheetWelcome: React.FC = () => {
  const navigation = useNavigation();
  const user = useRecoilValueMaybe(loginedUserState);
  const refreshUser = useRecoilRefresher_UNSTABLE(loginedUserState);
  useEffect(() => navigation.addListener('focus', refreshUser), []);

  return (
    <Title>
      {user && (
        <>
          <Bold>{user?.realname}</Bold>
          {'님\n'}
        </>
      )}
      라이드를 시작해볼까요?
    </Title>
  );
};

const Title = styled(Text)`
  font-size: ${screenHeight / 38}px;
  font-weight: 300,
  color: #000
`;

const Bold = styled(Text)`
  font-weight: 800;
`;
