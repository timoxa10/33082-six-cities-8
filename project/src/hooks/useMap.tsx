import { useEffect, useState, MutableRefObject } from 'react';
import { Map, TileLayer, Icon, Marker, LayerGroup } from 'leaflet';
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

let prevCity: string | undefined;

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: CityCoordinates,
  points: LocationInfo[],
  selectedPoint: LocationInfo | null,
  isHovered: boolean,
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
    const iconsGroup = new LayerGroup();

    if (map && points?.length > 0) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker.setIcon(defaultCustomIcon);

        if (selectedPoint !== undefined && point === selectedPoint) {
          marker.setIcon(currentCustomIcon);
        }

        if (!isHovered) {
          marker.setIcon(defaultCustomIcon);
        }

        marker.addTo(iconsGroup);
      });

      iconsGroup.addTo(map);

      if (prevCity !== city.name) {
        map.flyTo(
          {
            lat: city.location.latitude,
            lng: city.location.longitude,
          },
          city.location.zoom,
        );
        prevCity = city.name;
      }
    }

    return () => {
      if (map) {
        map.removeLayer(iconsGroup);
      }
    };
  }, [map, points, selectedPoint]);

  return map;
}

export default useMap;
