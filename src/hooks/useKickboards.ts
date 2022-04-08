import {useEffect, useState} from 'react';
import {RideClient, RideKickboard} from '../api/ride';
import {calculateMeter} from '../models/calculateMeter';
import {CameraLoc} from '../models/cameraLoc';
import {HookResult} from '../models/hookResult';

export const useKickboards = (
  cameraLoc?: CameraLoc,
): HookResult<RideKickboard[]> => {
  const [kickboards, setKickboards] = useState<RideKickboard[] | null>();
  useEffect(() => {
    if (!cameraLoc) return;
    const props = {
      lat: cameraLoc.latitude,
      lng: cameraLoc.longitude,
      radius: Math.min(Math.round(calculateMeter(cameraLoc)), 10000),
    };

    RideClient.getNearKickboards(props)
      .then(({kickboards}) => setKickboards(kickboards))
      .catch(() => setKickboards(null));
  }, [cameraLoc]);

  return [kickboards, setKickboards];
};
