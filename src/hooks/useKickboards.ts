import {useEffect, useState} from 'react';
import {RideClient, RideKickboard} from '../api/ride';
import {calculateMeter, distance} from '../models/calculateMeter';
import {CameraLoc} from '../models/cameraLoc';
import {HookResult} from '../models/hookResult';

export const useKickboards = (
  cameraLoc?: CameraLoc,
): HookResult<RideKickboard[]> => {
  const [previousCameraLoc, setPreviousCameraLoc] = useState<CameraLoc>();
  const [kickboards, setKickboards] = useState<RideKickboard[] | null>();
  useEffect(() => {
    if (!cameraLoc) return;
    if (previousCameraLoc) {
      const meter = distance(
        cameraLoc.latitude,
        cameraLoc.longitude,
        previousCameraLoc.latitude,
        previousCameraLoc.longitude,
      );

      if (meter <= 150) {
        console.log(`Moved to close. not requesting api (${meter}m)`);
        return;
      }
    }

    const props = {
      lat: cameraLoc.latitude,
      lng: cameraLoc.longitude,
      radius: Math.min(Math.round(calculateMeter(cameraLoc)), 10000),
    };

    setPreviousCameraLoc(cameraLoc);
    RideClient.getNearKickboards(props)
      .then(({kickboards}) => setKickboards(kickboards))
      .catch(() => setKickboards(null));
  }, [cameraLoc]);

  return [kickboards, setKickboards];
};
