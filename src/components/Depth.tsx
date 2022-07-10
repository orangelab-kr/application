import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {screenWidth} from '../constants/screenSize';
import {navigationRef} from '../navigators/navigation';

export interface DepthProps {
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
}

export const Depth: React.FC<DepthProps> = ({
  onPress,
  disabled,
  color = '#000',
}) => {
  const onAction = () => {
    if (disabled) return;
    if (onPress) return onPress();
    navigationRef.current?.goBack();
  };

  return (
    <Container onPress={onAction}>
      {!disabled && <FontAwesomeIcon icon={faAngleLeft} color={color} />}
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  height: 50px;
  width: ${screenWidth}px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
`;
