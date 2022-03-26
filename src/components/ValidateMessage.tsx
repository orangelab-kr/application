import {FormikErrors} from 'formik';
import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';

export interface ValidateMessageProps {
  message?: any;
}

export const ValidateMessage: React.FC<ValidateMessageProps> = ({message}) => {
  if (!message) return <></>;
  return <Message>{message}</Message>;
};

const Message = styled(Text)`
  margin: 8px 0 5px 3px;
  font-weight: 400;
  text-align: right;
  color: red;
`;
