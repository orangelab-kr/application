import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import {CommonText} from './common/CommonText';

interface UnderlayRightProps {
  onPress: () => void | Promise<void>;
}

export const UnderlayRight: FC<UnderlayRightProps> = ({onPress}) => {
  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <CommonText
          style={{
            fontWeight: '600',
            color: 'white',
            fontSize: 25,
          }}>
          삭제
        </CommonText>
      </TouchableOpacity>
    </Container>
  );
};

export const Container = styled(Animated.View)`
  flex: 1;
  margin: 12px;
  padding: 15px;
  align-items: center;
  flex-direction: row;
  background-color: tomato;
  border-radius: 16px;
  justify-content: flex-start;
  shadow-color: #999;
  shadow-opacity: 0.2;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
`;
