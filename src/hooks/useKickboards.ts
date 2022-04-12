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
    RideClient.getNearKickboards(props)
      .then(({kickboards}) => setKickboards(kickboards))
      .catch(() => setKickboards(null));
  }, [cameraLoc]);

  return [kickboards, setKickboards];
};
