import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';

export const TermsGroup: React.FC = ({children}) => {
  return <Container>{children}</Container>;
};

const Container = styled(View)`
  margin-top: 5px;
`;
