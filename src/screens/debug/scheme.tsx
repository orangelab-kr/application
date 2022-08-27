import React from 'react';
import {Button, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {Depth} from '../../components/Depth';
import {screenHeight} from '../../constants/screenSize';
import {onSchemeAction} from '../../tools/scheme';

export const DebugScheme: React.FC = () => {
  const schemes = [
    {name: '라이드 기록', path: 'rides'},
    {name: '결제 수단 목록', path: 'payments'},
    {name: '결제 수단 등록', path: 'payments/register?password=99'},
    {name: '쿠폰 목록', path: 'coupons'},
    {name: '쿠폰 등록', path: 'coupons/register?code=coupon'},
    {name: '알림', path: 'weblink/notifications'},
    {name: '패스', path: 'weblink/pass'},
    {name: '초대하기+', path: 'weblink/referral'},
    {name: '공지사항', path: 'notices'},
    {name: '공지사항(게시글ID)', path: 'notices/mykick'},
    {name: '설정', path: 'weblink/settings'},
    {name: '고객센터', path: 'kakaotalk'},
    {name: '카카오 연동', path: 'methods/kakao/connect'},
    {name: '카카오 해제', path: 'methods/kakao/disconnect'},
    {name: '애플 연동', path: 'methods/apple/connect'},
    {name: '애플 해제', path: 'methods/apple/disconnect'},
    {name: '로그아웃', path: 'auth/logout'},
  ];

  return (
    <SafeAreaView>
      <Depth />
      <Container>
        <Title>
          <Bold>디버깅</Bold> / 스킴
        </Title>
        {schemes.map(({name, path}) => (
          <Button
            key={path}
            title={name}
            onPress={() => onSchemeAction(`hikick://${path}`)}
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
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
  font-weight: 300;
`;

const Bold = styled(Text)`
  font-weight: 800;
`;
