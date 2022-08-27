import {Buffer} from 'buffer';
import crypto from 'crypto';
import _ from 'lodash';
import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import {BleManager, Characteristic, Device} from 'react-native-ble-plx';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {Depth} from '../../components/Depth';
import {screenHeight} from '../../constants/screenSize';

export const manager = new BleManager();
let device: Device | undefined;
let writer: Characteristic | undefined;
let reader: Characteristic | undefined;

export const DebugBluetooth: React.FC = () => {
  const [bluetoothId, setBluetoothId] = useState<string>();
  const [token, setToken] = useState([0x00, 0x00, 0x00, 0x00]);
  const serviceId = '0000fee7-0000-1000-8000-00805f9b34fb';
  const writeId = '000036f5-0000-1000-8000-00805f9b34fb';
  const readId = '000036f6-0000-1000-8000-00805f9b34fb';
  const encryptKey = 'IFcvUjZLP0cwUEFYEWMtKw==';

  const onScan = async () => {
    manager.startDeviceScan(
      [serviceId],
      {allowDuplicates: false},
      (err, device) => {
        if (err) throw err;
        if (!device || !device.manufacturerData) return;

        const helmetId = Buffer.from(device.manufacturerData, 'base64')
          .toString('hex')
          .substring(4, 16);

        if (helmetId !== 'fc45c38c37df') return;
        setBluetoothId(device.id);
        manager.stopDeviceScan();
      },
    );
  };

  const connect = async () => {
    if (!bluetoothId) return;
    console.log('Try connecting to bluetooth helmet.');
    device = await manager.connectToDevice(bluetoothId);
    await device.discoverAllServicesAndCharacteristics();
    const services = await device.services();
    const service = services.find(s => s.uuid === serviceId);
    if (!service) return;
    const characteristics = await service.characteristics();
    writer = characteristics.find(c => c.uuid === writeId);
    reader = characteristics.find(c => c.uuid === readId);
    if (!writer || !reader) return;

    await write(writer, [0x06, 0x01, 0x01, 0x01], {withToken: false});
    await waitForResponse(reader, [0x06, 0x02, 0x08], {size: 4}).then(setToken);
    console.log('Connected!');
  };

  const waitForResponse = async (
    reader: Characteristic,
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

      const monitor = reader.monitor((err, msg) => {
        const payload = validate(msg?.value);
        console.log(err, payload);
        if (!payload) return;

        console.log('Fine!');
        monitor.remove();
        resolve(payload);
      });

      setTimeout(() => {
        monitor.remove();
        reject(new Error(`시간이 초과되었습니다.`));
      }, 3000);
    });

  const write = async (
    writer: Characteristic,
    payload: number[],
    {withToken = true, withPassword = false},
  ): Promise<void> => {
    if (!bluetoothId) return;
    if (withPassword) payload.push(...Buffer.from('000000', 'utf-8'));
    if (withToken) payload.push(...token);
    const margins = _.times(16 - payload.length, () => _.random(0, 255));
    payload.push(...margins);

    await writer.writeWithResponse(encrypt(payload));
  };

  const encrypt = (payload: number[]): string => {
    const key = Buffer.from(encryptKey, 'base64');
    const cipher = crypto.createCipheriv('aes-128-ecb', key, '');
    cipher.setAutoPadding(false);
    return Buffer.concat([
      cipher.update(Buffer.from(payload)),
      cipher.final(),
    ]).toString('base64');
  };

  const decrypt = (raw: string): number[] => {
    const key = Buffer.from(encryptKey, 'base64');
    const cipher = crypto.createDecipheriv('aes-128-ecb', key, '');
    cipher.setAutoPadding(false);
    return Array.prototype.slice.call(
      Buffer.concat([
        cipher.update(Buffer.from(raw, 'base64')),
        cipher.final(),
      ]),
    );
  };

  const unlock = async () => {
    if (!writer || !reader) return;
    await write(writer, [0x05, 0x01, 0x06], {withPassword: true});
    const [i] = await waitForResponse(reader, [0x05, 0x02, 0x01], {size: 1});
    return i === 1;
  };

  const isLocked = async () => {
    if (!writer || !reader) return;
    await write(writer, [0x05, 0x0e, 0x01, 0x01], {});
    const [i] = await waitForResponse(reader, [0x05, 0x0f, 0x01], {size: 1});
    return i === 1;
  };

  return (
    <SafeAreaView>
      <Depth />
      <Container>
        <Title>
          <Bold>디버깅</Bold> / 블루투스
        </Title>
        <Button title="블루투스 스캔" onPress={onScan} />
        <Button
          title="블루투스 연결"
          onPress={connect}
          disabled={!bluetoothId}
        />
        <Button
          title="헬멧 장착 여부"
          onPress={isLocked}
          disabled={!bluetoothId}
        />
        <Button title="잠금 해제" onPress={unlock} disabled={!bluetoothId} />
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
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
  font-weight: 300;
`;

const Bold = styled(Text)`
  font-weight: 800;
`;
