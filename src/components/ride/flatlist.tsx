import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import styled from 'styled-components/native';
import {PaymentsClient, PaymentsRecord} from '../../api/payments';
import {RequestRideGetRides, RideClient, RideRide} from '../../api/ride';
import {screenWidth} from '../../constants/screenSize';
import {CommonText} from '../common/CommonText';
import {RideItem} from './item';

export const RideFlatlist: FC = () => {
  const navigation = useNavigation();
  const [rides, setRides] = useState<RideRide[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>();
  const [unpaidRecords, setUnpaidRecords] = useState<PaymentsRecord[]>([]);
  const [params, setParams] = useState<RequestRideGetRides>({
    skip: 0,
    take: 10,
  });

  const loadUnpaidRecords = async () => {
    const {records} = await PaymentsClient.getRecords({
      onlyUnpaid: true,
      take: 1000,
    });

    setUnpaidRecords(records);
  };

  const loadRides = async () => {
    loadUnpaidRecords();

    try {
      if (loading) return;
      setLoading(true);
      const {rides, total} = await RideClient.getRides(params);
      setRides(c => [..._.pullAllBy(c, rides, 'rideId'), ...rides]);
      setTotal(total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRides();
  }, [params]);

  useEffect(() => navigation.addListener('focus', loadRides), [loadRides]);
  const onEndReached = ({distanceFromEnd}: {distanceFromEnd: number}) => {
    if (distanceFromEnd < 0) return;
    if (loading) return;
    if (!total || total <= rides.length) return;
    setParams(params => {
      let {take, skip} = params;
      if (!skip) skip = 0;
      if (!take) take = 10;
      skip += take;
      return {take, skip};
    });
  };

  return (
    <FlatList
      bounces
      data={rides}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.6}
      keyExtractor={ride => ride.rideId}
      renderItem={props => (
        <RideItem ride={props.item} unpaidRecords={unpaidRecords} />
      )}
      ListFooterComponent={loading ? <Loading size="large" /> : <></>}
      ListEmptyComponent={
        <NoRideContainer>
          <NoRide>🤫 한달 뒤에는{'\n'}이 화면이 꽉 찰지도 몰라요.</NoRide>
        </NoRideContainer>
      }
    />
  );
};

const Loading = styled(ActivityIndicator)`
  margin-top: 20px;
`;

const NoRide = styled(CommonText)`
  color: #0a0c0c;
  font-size: ${screenWidth / 18}px;
  width: 100%;
  text-align: center;
  font-weight: 500;
  padding: 10px;
`;

const NoRideContainer = styled(View)`
  border-radius: 12px;
  background-color: #fcfeff;
  margin-top: ${screenWidth * 0.05}px;
  margin: 10px 5px;
  shadow-color: #999;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
`;
