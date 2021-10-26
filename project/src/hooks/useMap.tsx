/* eslint-disable no-console */
import { useEffect, useState, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';
import { Icon, Marker } from 'leaflet';
import type { CityCoordinates } from 'types/city-coordinates';
import type { LocationInfo } from 'types/location-info';

const URL_MARKER_DEFAULT = 'img/pin.svg';
const URL_MARKER_CURRENT = 'img/pin-active.svg';

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

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: CityCoordinates,
  points: LocationInfo[],
  selectedPoint: LocationInfo | undefined,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);
    }
  }, [mapRef, map, city]);

  useEffect(() => {
    if (map && points?.length > 0) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        console.log(selectedPoint, points);

        if (selectedPoint !== undefined && point === selectedPoint) {
          marker.setIcon(currentCustomIcon).addTo(map);
        } else {
          marker.setIcon(defaultCustomIcon).addTo(map);
        }
      });
    }
  }, [map, points, selectedPoint]);

  return map;
}

export default useMap;
