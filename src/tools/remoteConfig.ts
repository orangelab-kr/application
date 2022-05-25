import RemoteConfig from '@react-native-firebase/remote-config';

let initalized = false;
export let remoteConfig = RemoteConfig();
const defaultConfig = {};

export const onRemoteConfigInitalize = async () => {
  if (initalized) return;
  initalized = true;

  await remoteConfig.setDefaults(defaultConfig);
  await remoteConfig.setConfigSettings({
    minimumFetchIntervalMillis: 30000,
  });

  await remoteConfig.fetch(600);
  const fetchedRemotely = await remoteConfig.activate();
  if (fetchedRemotely) {
    console.log('Configs were retrieved from the backend and activated.');
  } else {
    console.log(
      'No configs were fetched from the backend, and the local configs were already activated',
    );
  }
};
