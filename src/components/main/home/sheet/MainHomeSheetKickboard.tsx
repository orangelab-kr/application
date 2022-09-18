import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSetRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {selectedKickboardState} from '../../../../recoils/selectedKickboard';
import {selectedKickboardCodeState} from '../../../../recoils/selectedKickboardCode';
import {useRecoilValueMaybe} from '../../../../tools/recoil';
import {KickboardStatus} from '../../../kickboard/KickboardStatus';
import {MainHomeSheetCommonProps} from './MainHomeSheet';

export const MainHomeSheetKickboard: React.FC<
  MainHomeSheetCommonProps
> = ({}) => {
  const setSelectedKickboard = useSetRecoilState(selectedKickboardCodeState);
  const selectedKickboard = useRecoilValueMaybe(selectedKickboardState);

  useEffect(() => {
    if (selectedKickboard !== null) return;
    setSelectedKickboard(null);
  }, [selectedKickboard]);

  return (
    <Container>
      <View style={{marginRight: 10}}>
        {selectedKickboard && <KickboardStatus kickboard={selectedKickboard} />}
      </View>
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: row;
`;
