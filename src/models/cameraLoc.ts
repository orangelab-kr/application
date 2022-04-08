import {Coord} from 'react-native-nmap';

export interface CameraLoc {
  latitude: number;
  longitude: number;
  zoom: number;
  contentsRegion: [Coord, Coord, Coord, Coord, Coord];
  coveringRegion: [Coord, Coord, Coord, Coord, Coord];
}
