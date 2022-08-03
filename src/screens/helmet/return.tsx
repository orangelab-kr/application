import crypto from 'crypto';
import _ from 'lodash';
import AnimatedLottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, Text, View} from 'react-native';
import {BleManager, Characteristic} from 'react-native-ble-plx';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {RideClient, RideHelmetCredentials} from '../../api/ride';
import {BottomButton} from '../../components/BottomButton';
import {Depth} from '../../components/Depth';
import {screenHeight} from '../../constants/screenSize';
import {navigationRef} from '../../navigators/navigation';
import {ConnectStatus, icons} from './borrow';

export const messages: {[key in ConnectStatus]: string} = {
  request: '서버에 요청 중...',
  searching: '주변에 헬멧을 찾는 중...',
  pairing: '잠금을 기다리는 중...',
  completed: '완료되었습니다.',
};

export const manager = new BleManager();
export let writer: Characteristic | undefined;
export let reader: Characteristic | undefined;

export const HelmetReturn: React.FC = () => {
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
      '라이드를 종료하는 중...',
      '이어서 라이드를 진행하시겠습니까?',
      [
        {text: '아니요', style: 'cancel'},
        {text: '네, 취소합니다', onPress},
      ],
      {cancelable: true},
    );
  };

  const onLost = () => {
    const onPress = () => navigationRef.current?.goBack();
    Alert.alert(
      '헬멧이 파손되었거나 분실되었나요?',
      '파손 및 분실의 경우, 이용 정책에 따라 15,000원이 추가로 결제됩니다. 오류일 경우, 오류를 증명할 수 있는 사진과 함께 고객센터에 문의주시면 환불 조치해드립니다.',
      [
        {text: '아니요', style: 'cancel'},
        {text: '네, 결제합니다', onPress},
      ],
      {cancelable: true},
    );
  };

  const onRequest = async () => {
    setStatus('request');
    await RideClient.returnHelmet();
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

  const isLocked = async () => {
    await write([0x05, 0x0e, 0x01, 0x01], {});
    const [i] = await waitForResponse([0x05, 0x0f, 0x01], {size: 1});
    return i === 1;
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
    if (!payload) return '';
    const key = Buffer.from(credentials?.encryptKey!, 'base64');
    const cipher = crypto.createCipheriv('aes-128-ecb', key, '');
    cipher.setAutoPadding(false);
    return Buffer.concat([
      cipher.update(Buffer.from(payload)),
      cipher.final(),
    ]).toString('base64');
  };

  const decrypt = (raw: string): number[] => {
    if (!raw) return [];
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

  const waitUntilLocked = async () => {
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    while (true) {
      const locked = await isLocked().catch(() => false);
      if (!locked) {
        await sleep(1500);
        continue;
      }

      await RideClient.returnHelmetComplete();
      setStatus('completed');
      break;
    }
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
    waitUntilLocked();
  }, [token]);

  return (
    <SafeAreaView style={{height: '100%'}}>
      <Depth
        onPress={onBack}
        color={status === 'completed' ? '#fff' : '#000'}
        disabled={status === 'completed'}
      />
      <Container>
        <Title>헬멧을 반납해주세요.</Title>
        <Description>{messages[status]}</Description>
        <LottieView
          style={{marginTop: -50}}
          source={icons[status]}
          loop={status !== 'completed'}
          autoPlay
        />
        {status !== 'completed' && (
          <LostButton onPress={onLost}>
            <LostButtonText>
              혹시 헬멧을 잃어버렸거나 파손되었나요?
            </LostButtonText>
          </LostButton>
        )}
      </Container>
      {status === 'completed' && (
        <BottomButton onPress={onComplete}>반납 완료</BottomButton>
      )}
    </SafeAreaView>
  );
};

const Container = styled(View)`
  margin: 12% 8%;
  margin-top: ${screenHeight * 0.1}px;
`;

const LostButton = styled(TouchableOpacity)`
  margin-top: ${screenHeight * 0.63}px;
  justify-content: center;
  align-items: center;
`;

const LostButtonText = styled(Text)`
  color: #000;
  font-size: ${screenHeight / 46}px;
  font-weight: 800;
  color: #696969;
`;

const Title = styled(Text)`
  color: #000;
  font-size: ${screenHeight / 25}px;
  font-weight: 800;
`;

const Description = styled(Text)`
  color: #000;
  font-size: ${screenHeight / 40}px;
  font-weight: 300;
`;

const LottieView = styled(AnimatedLottieView)`
  padding-top: ${screenHeight * 0.6}px;
`;
