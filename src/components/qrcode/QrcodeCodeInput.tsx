import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../../constants/screenSize';
import {GetKickboardCodeEvent} from '../../screens/qrcode';
import {FormatterInput} from '../FormatterInput';
import {TransparentButton} from '../TransparentButton';

interface QrcodeCodeInputProps {
  onKickboardCode: GetKickboardCodeEvent;
}

export const QrcodeCodeInput: React.FC<QrcodeCodeInputProps> = ({onKickboardCode}) => {
  return (
    <Container>
      <Input placeholder="킥보드 코드" maxLength={6} />
      <TransparentButton icon={faAngleRight}>이용</TransparentButton>
    </Container>
  );
};

const Container = styled(View)`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: ${screenHeight * 0.2}px;
  left: 0;
  right: 0;
`;

const Input = styled(FormatterInput)`
  font-weight: 600;
  font-size: 32px;
  color: #fff;
  margin-bottom: 5px;
`;
