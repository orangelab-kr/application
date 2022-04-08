import {useEffect, useState} from 'react';
import {RideClient, RideKickboard} from '../api/ride';
import {CameraLoc} from '../models/cameraLoc';
import {HookResult} from '../models/hookResult';

export const useKickboards = (
  location?: CameraLoc,
): HookResult<RideKickboard[]> => {
  const [kickboards, setKickboards] = useState<RideKickboard[] | null>();
  useEffect(() => {
    if (!location) return;
    const props = {lat: location.latitude, lng: location.longitude};
    RideClient.getNearKickboards(props)
      .then(({kickboards}) => setKickboards(kickboards))
      .catch(() => setKickboards(null));
  }, [location]);

  return [kickboards, setKickboards];
};
