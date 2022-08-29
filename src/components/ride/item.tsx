import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import dayjs from 'dayjs';
import React, {FC, useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {PaymentsRecord} from '../../api/payments';
import {RideRide} from '../../api/ride';

export interface RideItemProps {
  ride: RideRide;
  unpaidRecords: PaymentsRecord[];
}

export const RideItem: FC<RideItemProps> = ({ride, unpaidRecords: records}) => {
  const unpaidPrice = useMemo(
    () =>
      records
        .filter(r => r.properties.coreservice.rideId === ride.rideId)
        .map(r => r.amount)
        .reduce((a, b) => a + b, 0),
    [records],
  );

  return (
    <Container>
      <RideLabel>
        <RideDate>
          {dayjs(ride.createdAt).format('M월 DD일 h시 m분 s초')}
          {' ~ '}
          {dayjs(ride.endedAt).format('h시 m분 s초')}
        </RideDate>
        <RideName>{ride.kickboardCode}</RideName>
        <RideDescription>
          {ride.price.toLocaleString()}원{' '}
          {unpaidPrice ? (
            <UnpaidPriceText>
              ({unpaidPrice.toLocaleString()}원 결제 실패)
            </UnpaidPriceText>
          ) : (
            <></>
          )}
        </RideDescription>
      </RideLabel>
      <TouchableRight>
        <FontAwesomeIcon icon={faAngleRight} color="#999" size={23} />
      </TouchableRight>
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  padding: 8px;
  margin: 12px 8px 5px;
  border-radius: 12px;
  background-color: #fcfeff;
  flex-direction: row;
  justify-content: space-between;
  shadow-color: #999;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
  align-items: center;
`;

const UnpaidPriceText = styled(Text)`
  color: #ed2839;
  font-weight: 600;
`;

const RideLabel = styled(View)`
  width: 80%;
  margin-left: 10px;
`;

const RideName = styled(Text)`
  color: #0a0c0c;
  font-weight: 800;
  font-size: 26px;
`;

const RideDescription = styled(Text)`
  color: #0a0c0c;
  font-weight: 400;
  font-size: 18px;
`;

const RideDate = styled(Text)`
  color: #0a0c0c;
  font-size: 13px;
  font-weight: 400;
`;

const TouchableRight = styled(View)`
  padding: 18px;
`;
