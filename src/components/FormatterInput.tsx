import _ from 'lodash';
import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
} from 'react-native';

export interface FormatterInputProps extends TextInputProps {
  onFormat?: (value: string) => string;
}

export const FormatterInput: React.FC<FormatterInputProps> = ({
  onFormat,
  onChange,
  onChangeText,
  ...props
}) => {
  const [value, setValue] = useState(props.defaultValue);
  const onChangeByFormatter = (
    props: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    let {text} = props.nativeEvent;
    if (onFormat) text = onFormat(text);
    setValue(text);

    _.set(props, 'nativeEvent.text', text);
    if (onChange) onChange(props);
    if (onChangeText) onChangeText(props.nativeEvent.text);
  };

  return <TextInput onChange={onChangeByFormatter} value={value} {...props} />;
};
