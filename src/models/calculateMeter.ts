import {CameraLoc} from './cameraLoc';

export function calculateMeter(cameraLoc: CameraLoc) {
  const [, topLeft, , bottomRight] = cameraLoc.coveringRegion;
  const meter = distance(
    topLeft.latitude,
    topLeft.longitude,
    bottomRight.latitude,
    bottomRight.longitude,
  );

  return meter * 950;
}

// Ref: https://www.htmlgoodies.com/javascript/calculate-the-distance-between-two-points-in-your-web-apps/
function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var radlon1 = (Math.PI * lon1) / 180;
  var radlon2 = (Math.PI * lon2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
}
