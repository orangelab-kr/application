import {faGamepad} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../../../../constants/screenSize';

export interface MainHomeSheetControlButtonProps {
  sheetRef: React.MutableRefObject<BottomSheet | null>;
}

export const MainHomeSheetControlButton: React.FC<
  MainHomeSheetControlButtonProps
> = ({sheetRef}) => {
  const onControl = () => sheetRef.current?.snapToIndex(1);
  return (
    <Button onPress={onControl}>
      <FontAwesomeIcon icon={faGamepad} color="#fff" />
      <ButtonText>컨트롤</ButtonText>
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  background-color: #000;
  border-radius: 10px;
  padding: 15px;
  flex-direction: row;
  margin: 2px 0;
`;

const ButtonText = styled(Text)`
  color: #fff;
  font-size: ${screenHeight / 48}px;
  margin-left: 6px;
`;
