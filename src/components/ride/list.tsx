import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {RideClient, RideRide} from '../../api/ride';
import {screenWidth} from '../../constants/screenSize';
import {RideItem} from './item';

export const RideList: FC = () => {
  const navigation = useNavigation();
  const [rides, setRides] = useState<RideRide[]>([]);

  const loadRides = () =>
    RideClient.getRides({}).then(({rides}) => setRides(rides));

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadRides);
    return unsubscribe;
  }, []);

  return rides.length > 0 ? (
    <>
      {rides.map(ride => (
        <RideItem key={ride.rideId} ride={ride} />
      ))}
    </>
  ) : (
    <NoRideContainer>
      <NoRide>한달 뒤에는 이 화면이 꽉 찰지도 몰라요. 🤫</NoRide>
    </NoRideContainer>
  );
};

const NoRide = styled(Text)`
  font-size: ${screenWidth / 23}px;
  width: 100%;
  text-align: center;
  font-weight: 600;
  padding: 10px;
`;

const NoRideContainer = styled(View)`
  border-radius: 5px;
  background-color: #eee;
  margin-top: ${screenWidth * 0.05}px;
`;
