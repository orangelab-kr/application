import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {screenWidth} from '../constants/screenSize';

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
  const navigation = useNavigation();
  const onAction = () => {
    if (disabled) return;
    if (onPress) return onPress();
    navigation.goBack();
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
