import CheckBox from '@react-native-community/checkbox';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { openInAppBrowser } from '../../../../tools/openInAppBrowser';

export interface TermsProps {
  name: string;
  required?: boolean;
  onChange: (value: boolean) => any;
  value: boolean;
  url?: string;
}

export const Terms: React.FC<TermsProps> = ({
  name,
  required,
  value,
  onChange,
  url,
}) => {
  const openURL = () => url && openInAppBrowser(url);
  const onPress = () => onChange(!value);
  useEffect(() => {
    if (!onChange) return;
    onChange(value);
  }, [value]);

  return (
    <Container>
      <CheckBoxAndName onPress={onPress}>
        <CheckBoxWithSize
          value={value}
          animationDuration={0.1}
          onAnimationType="fade"
          offAnimationType="fade"
        />
        <Name>{name}</Name>
        {required && <Required>(필수)</Required>}
      </CheckBoxAndName>
      {url && (
        <TouchableOpacity onPress={openURL}>
          <Link>보기</Link>
        </TouchableOpacity>
      )}
    </Container>
  );
};

const Link = styled(Text)`
  color: blue;
  text-decoration-line: underline;
  padding: 15px;
`;

const Container = styled(View)`
  margin-top: 5px;
  border-color: #eee;
  border-width: 1px;
  border-radius: 3px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CheckBoxAndName = styled(TouchableOpacity)`
  flex: 1;
  padding: 15px;
  flex-direction: row;
`;

const Name = styled(Text)`
  color: #0a0c0c;
  font-size: 16px;
  margin-left: 8px;
`;

const Required = styled(Text)`
  color: red;
  font-size: 12px;
  margin-left: 4px;
`;

const CheckBoxWithSize = styled(CheckBox)`
  width: 20px;
  height: 20px;
`;
