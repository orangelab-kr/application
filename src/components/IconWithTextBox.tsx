import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {CommonText} from './common/CommonText';

export interface IconWithMessageProps {
  icon: IconProp;
  children: React.ReactNode;
}

export const IconWithTextBox: React.FC<IconWithMessageProps> = ({
  icon,
  children,
}) => (
  <Container>
    <IconContainer>
      <FontAwesomeIcon icon={icon} size={32} />
    </IconContainer>
    <TextContainer>{children}</TextContainer>
  </Container>
);

const Container = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  border-color: #eee;
  border-width: 1px;
  border-radius: 2px;
  margin-top: 10px;
`;

const IconContainer = styled(View)`
  width: 20%;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled(CommonText)`
  color: #0a0c0c;
  padding: 10px;
  font-size: 18px;
  width: 80%;
  font-weight: 300;
`;
