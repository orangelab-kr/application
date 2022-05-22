import React from 'react';
import {Button, Text, View} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {Depth} from '../../components/Depth';
import {screenHeight} from '../../constants/screenSize';

export const DebugBluetooth: React.FC = () => {
  const onStart = () => {
    BleManager.start({showAlert: false}).then(() => {
      console.log('Module initialized');
    });
  };

  const onScan = async () => {
    await BleManager.scan([], 5, true).then(() => {
      console.log('Scan started');
    });
  };

  const getDiscoveredPeripherals = async () => {
    await BleManager.getDiscoveredPeripherals().then(peripheralsArray => {
      console.log('Discovered peripherals: ' + peripheralsArray.length);
    });
  };

  return (
    <SafeAreaView>
      <Depth />
      <Container>
        <Title>
          <Bold>디버깅</Bold> / 블루투스
        </Title>
        <Button title="블루투스 시작" onPress={onStart} />
        <Button title="블루투스 스캔" onPress={onScan} />
        <Button title="블루투스 리스트" onPress={getDiscoveredPeripherals} />
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  margin: 12% 8%;
  margin-top: ${screenHeight * 0.1}px;
`;

const Title = styled(Text)`
  font-size: 26px;
  shadow-color: #999;
  shadow-opacity: 0.3;
  shadow-radius: 3px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
  font-weight: 300;
`;

const Bold = styled(Text)`
  font-weight: 900;
`;
