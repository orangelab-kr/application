import React, {createRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components';
import {FormatterInput, FormatterInputProps} from './FormatterInput';

export interface ShadowInputProps extends FormatterInputProps {
  buttonName?: string;
  onPress?: () => any;
}

export const ShadowInput: React.FC<ShadowInputProps> = ({
  buttonName,
  onPress,
  onChangeText,
  ...props
}) => {
  const [value, setValue] = useState(props.defaultValue);
  const onKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key !== 'Enter') return;
    if (onPress) onPress();
  };

  const onChangeTextByInput = (text: string) => {
    text = text.replace(/\n/g, '');

    setValue(text);
    if (onChangeText) onChangeText(text);
  };

  return (
    <View
      style={{
        marginTop: 25,
        borderRadius: 2,
        backgroundColor: '#fff',
        shadowColor: '#999',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        shadowOffset: {
          height: 0,
          width: 0,
        },
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Input
        value={value}
        onChangeText={onChangeTextByInput}
        placeholderTextColor="#999"
        multiline={true}
        onKeyPress={onKeyPress}
        {...props}
      />
      {buttonName && (
        <TouchableOpacity onPress={onPress}>
          <InputButton>{buttonName}</InputButton>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Input = styled(FormatterInput)`
  flex: auto;
  font-size: 18px;
  font-weight: 600;
  padding: 10px;
`;

const InputButton = styled(Text)`
  font-size: 20px;
  font-weight: 500;
  margin: 12px;
  padding-right: 6px;
  border-radius: 2px;
  color: #999;
`;
