import {RouteProp, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import NaverMapView, {Path} from 'react-native-nmap';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {PaymentsClient, PaymentsRecord} from '../../api/payments';
import {RideClient, RideRide, RideTimeline} from '../../api/ride';
import {BottomButton} from '../../components/BottomButton';
import {Depth} from '../../components/Depth';
import {screenHeight, screenWidth} from '../../constants/screenSize';
import {RidesNavigatorRouteParams} from '../../models/navigation';
import {navigationRef} from '../../navigators/navigation';

export const RideDetail: FC = () => {
  const [ride, setRide] = useState<RideRide>();
  const [timeline, setTimeline] = useState<RideTimeline[]>();
  const [records, setRecords] = useState<PaymentsRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const {params} = useRoute<RouteProp<RidesNavigatorRouteParams, 'Detail'>>();
  const unpaidPrice = useMemo(
    () =>
      records
        .filter(r => !r.processedAt && !r.refundedAt)
        .map(r => r.amount)
        .reduce((a, b) => a + b, 0),
    [records],
  );

  const loadRecords = async () => {
    const {records} = await PaymentsClient.getRecords({
      rideId: params.rideId,
      take: 1000,
    });

    setRecords(records);
  };

  const onRetryUnpaid = async () => {
    if (!unpaidPrice) return;
    setLoading(true);

    try {
      for (const record of records) {
        if (record.processedAt) return;
        await PaymentsClient.retryRecord(record.recordId);
      }

      loadRecords();
      Notifier.showNotification({
        title: '결제에 성공하였습니다. 이용해주셔서 감사합니다.',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'success',
          titleStyle: {color: '#fcfeff'},
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      loadRecords();
      RideClient.getRide(params.rideId).then(({ride}) => setRide(ride));
      RideClient.getRideTimeline(params.rideId).then(({timeline}) =>
        setTimeline(timeline),
      );
    } catch (err) {
      navigationRef.current?.goBack();
      Notifier.showNotification({
        title: '해당 라이드를 조회할 수 없습니다.',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'success',
          titleStyle: {color: '#fcfeff'},
        },
      });
    }
  }, [params]);

  console.log(timeline);
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Depth />
      <ScrollView>
        <Container>
          <Title>{ride?.kickboardCode || '로드 중...'}</Title>
          <DetailText>
            {dayjs(ride?.createdAt).format('M월 DD일 h시 m분')}
            {' ~ '}
            {dayjs(ride?.endedAt).format('h시 m분')}
          </DetailText>
          {timeline && (
            <Map
              style={{height: screenHeight / 4, width: '100%'}}
              compass={false}
              scaleBar={false}
              zoomControl={false}
              center={{...timeline[0], zoom: 12}}
              useTextureView>
              {timeline && (
                <Path
                  coordinates={timeline}
                  pattern={require('../../assets/path-arrow.png')}
                  color="#0a0c0c"
                  width={10}
                />
              )}
            </Map>
          )}
          <Title>
            결제{' '}
            <DetailText>
              {ride ? `총 ${ride.price.toLocaleString()}원` : '로드 중...'}
            </DetailText>
          </Title>

          {records
            .filter(r => r.processedAt && !r.refundedAt)
            .map(record => (
              <RecordContainer>
                <RecordText>{record.displayName}</RecordText>
                <RecordPrice>{record.amount.toLocaleString()}원</RecordPrice>
              </RecordContainer>
            ))}

          {unpaidPrice ? (
            <UnpaidPriceText>
              {unpaidPrice.toLocaleString()}원 결제 실패하였습니다. 아래 버튼을
              클릭하여 재결제를 시도할 수 있습니다.
            </UnpaidPriceText>
          ) : (
            <></>
          )}
        </Container>
      </ScrollView>
      {unpaidPrice ? (
        <BottomButton
          disabled={loading}
          onPress={onRetryUnpaid}
          backgroundColor="#ed2839"
          color="#fff">
          {loading ? '재결제 중...' : '재결제 시도'}
        </BottomButton>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

const Container = styled(SafeAreaView)`
  margin: 10px 30px;
  margin-bottom: ${screenHeight * 0.08}px;
`;

const Title = styled(Text)`
  color: #0a0c0c;
  font-size: ${screenHeight / 25}px;
  font-weight: 800;
`;

const DetailText = styled(Text)`
  color: #0a0c0c;
  font-size: ${screenHeight / 35}px;
  font-weight: 300;
`;

const Map = styled(NaverMapView)`
  height: 50%;
  width: 100%;
  border-radius: 16px;
  margin: 15px 0;
  overflow: hidden;
`;

const UnpaidPriceText = styled(Text)`
  margin-top: 10px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #ed2839;
  padding: 10px;
  font-size: ${screenWidth / 20}px;
  color: #ed2839;
  font-weight: 600;
`;

const RecordContainer = styled(View)`
  padding: 12px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #0a0c0c;
  margin: 5px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RecordText = styled(Text)`
  font-size: ${screenWidth / 17}px;
  font-weight: 500;
`;

const RecordPrice = styled(Text)`
  font-size: ${screenWidth / 22}px;
  font-weight: 300;
`;
