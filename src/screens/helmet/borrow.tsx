import crypto from 'crypto';
import _ from 'lodash';
import AnimatedLottieView, {AnimationObject} from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, Text, View} from 'react-native';
import {BleManager, Characteristic} from 'react-native-ble-plx';
import styled from 'styled-components/native';
import {RideClient, RideHelmetCredentials} from '../../api/ride';
import {BottomButton} from '../../components/BottomButton';
import {Depth} from '../../components/Depth';
import {screenHeight} from '../../constants/screenSize';
import {navigationRef} from '../../navigators/navigation';

export const manager = new BleManager();
export let writer: Characteristic | undefined;
export let reader: Characteristic | undefined;

export type ConnectStatus = 'request' | 'searching' | 'pairing' | 'completed';

export const icons: {[key in ConnectStatus]: AnimationObject} = {
  request: require('../../assets/lotties/86974-registration.json'),
  searching: require('../../assets/lotties/28925-wait-to-connect.json'),
  pairing: require('../../assets/lotties/95717-connect-onekey-by-bluetooth.json'),
  completed: require('../../assets/lotties/97163-upload-complete.json'),
};

const messages: {[key in ConnectStatus]: string} = {
  request: '서버에 요청 중...',
  searching: '주변에 헬멧을 찾는 중...',
  pairing: '헬멧을 해제하는 중...',
  completed: '완료되었습니다.',
};

export const HelmetBorrow: React.FC = () => {
  const [token, setToken] = useState([0x00, 0x00, 0x00, 0x00]);
  const serviceId = '0000fee7-0000-1000-8000-00805f9b34fb';
  const writeId = '000036f5-0000-1000-8000-00805f9b34fb';
  const readId = '000036f6-0000-1000-8000-00805f9b34fb';
  const [status, setStatus] = useState<ConnectStatus>('request');
  const [credentials, setCredentials] = useState<RideHelmetCredentials>();

  const onComplete = () => navigationRef.current?.navigate('Main');
  const onBack = () => {
    const onPress = () => navigationRef.current?.goBack();
    Alert.alert(
      '헬멧과 통신하는 중...',
      '헬멧 대여를 취소하시겠습니까?',
      [
        {text: '아니요', style: 'cancel'},
        {text: '네, 취소합니다', onPress},
      ],
      {cancelable: true},
    );
  };

  const onRequest = async () => {
    setStatus('request');
    await RideClient.borrowHelmet('Debug');
    const {helmet} = await RideClient.getHelmetCredentials();
    setCredentials(helmet);
  };

  const onSearching = async () => {
    setStatus('searching');
    manager.startDeviceScan(
      [serviceId],
      {allowDuplicates: false},
      (err, device) => {
        if (err) throw err;
        if (!device || !device.manufacturerData) return;
        const helmetId = Buffer.from(device.manufacturerData, 'base64')
          .toString('hex')
          .substring(4, 16);

        if (helmetId !== credentials!.macAddress) return;
        onPairing(device.id);
        manager.stopDeviceScan();
      },
    );
  };

  const onPairing = async (bluetoothId: string) => {
    setStatus('pairing');

    const device = await manager.connectToDevice(bluetoothId);
    await device.discoverAllServicesAndCharacteristics();
    const services = await device.services();
    const service = services.find(s => s.uuid === serviceId);
    if (!service) return;
    const characteristics = await service.characteristics();
    writer = characteristics.find(c => c.uuid === writeId);
    reader = characteristics.find(c => c.uuid === readId);
    if (!writer || !reader) return;

    await onHandshake();
  };

  const unlock = async () => {
    await write([0x05, 0x01, 0x06], {withPassword: true});
    const [i] = await waitForResponse([0x05, 0x02, 0x01], {size: 1});
    if (i === 0) {
      await RideClient.borrowHelmetComplete();
      setStatus('completed');
    }
  };

  const onHandshake = async () => {
    await write([0x06, 0x01, 0x01, 0x01], {withToken: false});
    const token = await waitForResponse([0x06, 0x02, 0x08], {size: 4});
    setToken(token);
  };

  const waitForResponse = async (
    prefix: number[],
    {size = 16},
  ): Promise<number[]> =>
    new Promise((resolve, reject) => {
      const validate = (payload?: string | null) => {
        if (!payload) return;
        const decryptedPayload = decrypt(payload);
        for (let i = 0; i < prefix.length; i++) {
          if (decryptedPayload[i] !== prefix[i]) return;
        }

        const start = prefix.length;
        const end = start + size;
        return decryptedPayload.slice(start, end);
      };

      const monitor = reader!.monitor((err, msg) => {
        const payload = validate(msg?.value);
        if (!payload) return;

        monitor.remove();
        resolve(payload);
      });

      setTimeout(() => {
        monitor.remove();
        reject(new Error(`시간이 초과되었습니다.`));
      }, 3000);
    });

  const write = async (
    payload: number[],
    {withToken = true, withPassword = false},
  ): Promise<void> => {
    if (withPassword) payload.push(...Buffer.from('000000', 'utf-8'));
    if (withToken) payload.push(...token);
    const margins = _.times(16 - payload.length, () => _.random(0, 255));
    payload.push(...margins);
    await writer!.writeWithResponse(encrypt(payload));
  };

  const encrypt = (payload: number[]): string => {
    const key = Buffer.from(credentials?.encryptKey!, 'base64');
    const cipher = crypto.createCipheriv('aes-128-ecb', key, '');
    cipher.setAutoPadding(false);
    return Buffer.concat([
      cipher.update(Buffer.from(payload)),
      cipher.final(),
    ]).toString('base64');
  };

  const decrypt = (raw: string): number[] => {
    const key = Buffer.from(credentials?.encryptKey!, 'base64');
    const cipher = crypto.createDecipheriv('aes-128-ecb', key, '');
    cipher.setAutoPadding(false);
    return Array.prototype.slice.call(
      Buffer.concat([
        cipher.update(Buffer.from(raw, 'base64')),
        cipher.final(),
      ]),
    );
  };

  useEffect(() => {
    onRequest();
  }, []);

  useEffect(() => {
    if (status !== 'request' || !credentials) return;
    onSearching();
  }, [credentials]);

  useEffect(() => {
    if (!token) return;
    unlock();
  }, [token]);

  return (
    <SafeAreaView style={{height: '100%'}}>
      <Depth
        onPress={onBack}
        color={status === 'completed' ? '#fff' : '#000'}
        disabled={status === 'completed'}
      />
      <Container>
        <Title>{messages[status]}</Title>
        <Description>
          {status === 'completed'
            ? '이제 헬멧을 꺼내어 착용해주세요.'
            : '다소 시간이 걸릴 수 있습니다.'}
        </Description>
        <LottieView
          source={icons[status]}
          loop={status !== 'completed'}
          autoPlay
        />
      </Container>
      {status === 'completed' && (
        <BottomButton onPress={onComplete}>이어서 라이드하기</BottomButton>
      )}
    </SafeAreaView>
  );
};

const Container = styled(View)`
  margin: 12% 8%;
  margin-top: ${screenHeight * 0.1}px;
`;

const Title = styled(Text)`
  font-size: ${screenHeight / 25}px;
  font-weight: 900;
`;

const Description = styled(Text)`
  font-size: ${screenHeight / 40}px;
  font-weight: 300;
`;

const LottieView = styled(AnimatedLottieView)`
  padding-top: ${screenHeight * 0.6}px;
`;
