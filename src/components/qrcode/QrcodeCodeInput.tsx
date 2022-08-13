import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { screenHeight } from '../../constants/screenSize';
import { GetKickboardCodeEvent } from '../../screens/qrcode';
import { onKickboardCodeFormatter } from '../../tools/formatter';
import { FormatterInput } from '../FormatterInput';
import { TransparentButton } from '../TransparentButton';

interface QrcodeCodeInputProps {
  onKickboardCode: GetKickboardCodeEvent;
}

export const QrcodeCodeInput: React.FC<QrcodeCodeInputProps> = ({
  onKickboardCode,
}) => {
  const [kickboardCode, setKickboardCode] = useState('');

  return (
    <Container>
      <Input
        placeholder="킥보드 코드"
        onFormat={onKickboardCodeFormatter}
        onChangeText={setKickboardCode}
        value={kickboardCode}
        maxLength={6}
      />

      {kickboardCode.length >= 6 && (
        <TransparentButton
          size={12}
          icon={faAngleRight}
          onPress={() => onKickboardCode(kickboardCode)}>
          다음
        </TransparentButton>
      )}
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
  color: #fcfeff;
  margin-bottom: 15px;
`;
