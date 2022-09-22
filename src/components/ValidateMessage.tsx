import React from 'react';
import styled from 'styled-components/native';
import {CommonText} from './common/CommonText';

export interface ValidateMessageProps {
  message?: any;
}

export const ValidateMessage: React.FC<ValidateMessageProps> = ({message}) => {
  if (!message) return <></>;
  return <Message>{message}</Message>;
};

const Message = styled(CommonText)`
  margin: 8px 0 2px 3px;
  font-weight: 400;
  text-align: right;
  color: red;
`;
