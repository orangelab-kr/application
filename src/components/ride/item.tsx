import dayjs from 'dayjs';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {RideRide} from '../../api/ride';

export interface RideItemProps {
  ride: RideRide;
}

export const RideItem: FC<RideItemProps> = ({ride}) => {
  return (
    <Container>
      <RideLabel>
        <RideDate>
          {dayjs(ride.createdAt).format('M월 DD일 h시 m분 s초')}
          {' ~ '}
          {dayjs(ride.endedAt).format('h시 m분 s초')}
        </RideDate>
        <RideName>{ride.kickboardCode}</RideName>
        <RideDescription>{ride.price.toLocaleString()}원 </RideDescription>
      </RideLabel>
    </Container>
  );
};

const Container = styled(View)`
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;
  background-color: #eee;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

const RideLabel = styled(View)`
  width: 90%;
  margin-left: 10px;
`;

const RideName = styled(Text)`
  font-weight: 900;
  font-size: 26px;
`;

const RideDescription = styled(Text)`
  font-weight: 600;
  font-size: 18px;
`;

const RideDate = styled(Text)`
  font-size: 13px;
  font-weight: 400;
`;
