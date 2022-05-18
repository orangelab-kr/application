import React, {FC} from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

interface UnderlayRightProps {
  onPress: () => void | Promise<void>;
}

export const UnderlayRight: FC<UnderlayRightProps> = ({onPress}) => {
  return (
    <Animated.View
      style={{
        flex: 1,
        padding: 15,
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'tomato',
        justifyContent: 'flex-start',
        borderRadius: 2,
      }}>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={{
            fontWeight: '600',
            color: 'white',
            fontSize: 25,
          }}>
          삭제
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
