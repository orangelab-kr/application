import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import {useUser} from '../../../../hooks/useUser';

export const MainHomeSheetWelcome: React.FC = () => {
  const user = useUser({cache: true});
  if (!user) return <></>;
  return (
    <Container>
      <Title>
        <Bold>{user.realname}</Bold>님{'\n'}라이드를 시작해볼까요?
      </Title>
    </Container>
  );
};

const Container = styled(View)`
  padding: 20px 30px 20px 30px;
`;

const Title = styled(Text)`
  font-size: 28px;
  font-weight: 300,
  color: #000
`;

const Bold = styled(Text)`
  font-weight: 800;
`;
