import _ from 'lodash';
import {useEffect, useState} from 'react';
import {RideClient, RideKickboard} from '../api/ride';
import {CameraLoc} from '../models/cameraLoc';
import {HookResult} from '../models/hookResult';
import {calculateMeter, distance} from '../tools/calculateMeter';

export const useKickboards = (
  cameraLoc?: CameraLoc | null,
): HookResult<{[key: string]: RideKickboard}, never> => {
  const [previousCameraLoc, setPreviousCameraLoc] = useState<CameraLoc>();
  const [kickboards, setKickboards] = useState<{
    [key: string]: RideKickboard;
  }>({});

  useEffect(() => {
    if (!cameraLoc) return;
    if (previousCameraLoc) {
      const level = cameraLoc.zoom - previousCameraLoc.zoom;
      const meter = distance(
        cameraLoc.latitude,
        cameraLoc.longitude,
        previousCameraLoc.latitude,
        previousCameraLoc.longitude,
      );

      if (meter <= 150 && level >= 0) {
        console.log(
          `Moved too close. not requesting api (Distance: ${meter}m, Level: ${level})`,
        );

        return;
      }
    }

    const props = {
      lat: cameraLoc.latitude,
      lng: cameraLoc.longitude,
      radius: Math.min(Math.round(calculateMeter(cameraLoc)), 10000),
    };

    setPreviousCameraLoc(cameraLoc);
    RideClient.getNearKickboards(props).then(({kickboards}) =>
      setKickboards(beforeKickboards => {
        const updatedKickboards = _.keyBy(kickboards, 'kickboardCode');
        return {...beforeKickboards, ...updatedKickboards};
      }),
    );
  }, [cameraLoc]);

  return [kickboards, setKickboards];
};
