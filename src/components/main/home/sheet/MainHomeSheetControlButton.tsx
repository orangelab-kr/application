import {faHelmetSafety} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';
import {navigationRef} from '../../../../navigators/navigation';

export interface MainHomeSheetControlButtonProps {
  sheetRef: React.MutableRefObject<BottomSheet | null>;
}

export const MainHomeSheetControlButton: React.FC<
  MainHomeSheetControlButtonProps
> = () => {
  const onHelmet = () => navigationRef.current?.navigate('Helmet');
  return (
    <Button onPress={onHelmet}>
      <FontAwesomeIcon icon={faHelmetSafety} color="#fcfeff" />
      <ButtonText>헬멧</ButtonText>
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  background-color: #0a0c0c;
  border-radius: 10px;
  padding: 15px;
  flex-direction: row;
  margin: 2px 0;
`;

const ButtonText = styled(Text)`
  color: #fcfeff;
  font-size: ${screenHeight / 48}px;
  margin-left: 6px;
`;
