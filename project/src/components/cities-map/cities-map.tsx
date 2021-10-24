import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from 'hooks/useMap';
import type { CityCoordinates } from 'types/city-coordinates';
import type { LocationInfo } from 'types/location-info';

const URL_MARKER_DEFAULT = 'img/pin.svg';
const URL_MARKER_CURRENT = 'img/pin-active.svg';

interface CitiesMapProps {
  city: CityCoordinates;
  points: LocationInfo[];
  selectedPoint: LocationInfo;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function CitiesMap({
  city,
  points,
  selectedPoint,
}: CitiesMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map && points?.length > 0) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

  return <div style={{ height: '500px' }} ref={mapRef}></div>;
}

export default CitiesMap;
