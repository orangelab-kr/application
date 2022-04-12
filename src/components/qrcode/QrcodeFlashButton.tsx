import {faLightbulb} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../../constants/screenSize';
import {HookResultSetValue, HookResultValue} from '../../models/hookResult';
import {TransparentButton} from '../TransparentButton';

interface QrcodeFlashButtonProps {
  flash: HookResultValue<boolean, never>;
  setFlash: HookResultSetValue<boolean, never>;
}

export const QrcodeFlashButton: React.FC<QrcodeFlashButtonProps> = ({
  flash,
  setFlash,
}) => {
  return (
    <Container>
      <TransparentButton icon={faLightbulb} onPress={() => setFlash(t => !t)}>
        {flash ? '라이트 끄기' : '라이트 켜기'}
      </TransparentButton>
    </Container>
  );
};

const Container = styled(View)`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: ${screenHeight * 0.8}px;
  left: 0;
  right: 0;
`;
