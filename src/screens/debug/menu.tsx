import React from 'react';
import {Button, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {Depth} from '../../components/Depth';
import {screenHeight} from '../../constants/screenSize';
import {navigationRef} from '../../navigators/navigation';

export const DebugMenu: React.FC = () => {
  const menus: {name: string; screen: any}[] = [
    {name: '스킴', screen: 'Scheme'},
    {name: '블루투스', screen: 'Bluetooth'},
  ];

  return (
    <SafeAreaView>
      <Depth />
      <Container>
        <Title>
          <Bold>디버깅</Bold> / 메뉴
        </Title>
        {menus.map(({name, screen}) => (
          <Button
            key={screen}
            title={name}
            onPress={() => navigationRef.current?.navigate('Debug', {screen})}
          />
        ))}
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  margin: 12% 8%;
  margin-top: ${screenHeight * 0.1}px;
`;

const Title = styled(Text)`
  font-size: 26px;
  shadow-color: #999;
  shadow-opacity: 0.3;
  shadow-radius: 3px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
  font-weight: 300;
`;

const Bold = styled(Text)`
  font-weight: 800;
`;
