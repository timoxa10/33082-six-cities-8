import { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from 'hooks/useMap';
import type { CityCoordinates } from 'types/city-coordinates';
import type { LocationInfo } from 'types/location-info';

interface CitiesMapProps {
  city: CityCoordinates;
  points: LocationInfo[];
  selectedPoint: LocationInfo | null;
  isHovered: boolean | null;
}

function CitiesMap({
  city,
  points,
  selectedPoint,
  isHovered,
}: CitiesMapProps): JSX.Element {
  const mapRef = useRef(null);

  useMap(mapRef, city, points, selectedPoint, isHovered);

  return <div style={{ height: '100%' }} ref={mapRef} />;
}

export default CitiesMap;
