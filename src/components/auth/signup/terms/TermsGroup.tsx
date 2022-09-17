import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

export const TermsGroup: React.FC<React.PropsWithChildren> = ({children}) => {
  return <Container>{children}</Container>;
};

const Container = styled(View)`
  margin-top: 5px;
`;
