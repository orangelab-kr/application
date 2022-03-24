import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {screenWidth} from '../constants/screenSize';

export interface DepthProps {
  disabled?: boolean;
}

export const Depth: React.FC<DepthProps> = ({disabled}) => {
  const navigation = useNavigation();

  return (
    <Container onPress={() => !disabled && navigation.goBack()}>
      {!disabled && <FontAwesomeIcon icon={faAngleLeft} />}
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
