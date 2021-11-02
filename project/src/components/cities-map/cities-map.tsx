import { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from 'hooks/useMap';
import type { CityCoordinates } from 'types/city-coordinates';
import type { LocationInfo } from 'types/location-info';

interface CitiesMapProps {
  city: CityCoordinates;
  points: LocationInfo[];
  selectedPoint: LocationInfo | undefined;
}

function CitiesMap({
  city,
  points,
  selectedPoint,
}: CitiesMapProps): JSX.Element {
  const mapRef = useRef(null);

  useMap(mapRef, city, points, selectedPoint);

  return <div style={{ height: '100%' }} ref={mapRef} />;
}

export default CitiesMap;
