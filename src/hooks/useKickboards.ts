import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {RideClient, RideKickboard} from '../api/ride';
import {calculateMeter, distance} from '../tools/calculateMeter';
import {CameraLoc} from '../models/cameraLoc';
import {HookResult} from '../models/hookResult';
import {currentRideState} from '../recoils/currentRide';

export const useKickboards = (
  cameraLoc?: CameraLoc,
): HookResult<{[key: string]: RideKickboard}, never> => {
  const currentRide = useRecoilState(currentRideState);
  const [previousCameraLoc, setPreviousCameraLoc] = useState<CameraLoc>();
  const [kickboards, setKickboards] = useState<{
    [key: string]: RideKickboard;
  }>({});

  useEffect(() => {
    if (!cameraLoc || currentRide) return;
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
        kickboards.forEach(kickboard => {
          if (!kickboard) return;
          beforeKickboards[kickboard.kickboardCode] = kickboard;
        });

        return beforeKickboards;
      }),
    );
  }, [cameraLoc]);

  return [kickboards, setKickboards];
};
