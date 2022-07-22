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
  padding: 8px;
  margin: 12px 8px 5px;
  border-radius: 16px;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  shadow-color: #999;
  shadow-opacity: 1;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
  align-items: center;
`;

const RideLabel = styled(View)`
  width: 90%;
  margin-left: 10px;
`;

const RideName = styled(Text)`
  color: #000;
  font-weight: 900;
  font-size: 26px;
`;

const RideDescription = styled(Text)`
  color: #000;
  font-weight: 600;
  font-size: 18px;
`;

const RideDate = styled(Text)`
  color: #000;
  font-size: 13px;
  font-weight: 400;
`;
