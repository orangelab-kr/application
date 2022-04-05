import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import _ from 'lodash';

interface LocationCoord {
  latitude: number;
  longitude: number;
}

export default function useGeolocation() {
  const [coords, setCoords] = useState<LocationCoord>();

  useEffect(
    () =>
      Geolocation.getCurrentPosition(position =>
        setCoords(_.pick(position.coords, 'latitude', 'longitude')),
      ),
    [],
  );

  return coords;
}
