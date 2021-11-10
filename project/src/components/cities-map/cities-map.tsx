/* eslint-disable comma-dangle */
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css';
import useMap from 'hooks/useMap';
import {
  getCity,
  getSelectedPoint,
  getOffersByCity,
  getNearbyOffers,
} from 'store/app-data/selectors';

interface CitiesMapProps {
  isHovered: boolean;
  useOffersByCityPoints?: boolean;
}

function CitiesMap({
  isHovered,
  useOffersByCityPoints,
}: CitiesMapProps): JSX.Element {
  const mapRef = useRef(null);

  const city = useSelector(getCity);
  const selectedPoint = useSelector(getSelectedPoint);
  const offersByCity = useSelector(getOffersByCity);
  const nearbyOffers = useSelector(getNearbyOffers);

  const sortedOffersByCity = offersByCity?.map(({ location }) => location);

  const sortedNearbyOffers = nearbyOffers?.map(({ location }) => location);

  const nearbyOffersPoints = !selectedPoint
    ? sortedNearbyOffers
    : [...sortedNearbyOffers, selectedPoint];

  const points = useOffersByCityPoints
    ? sortedOffersByCity
    : nearbyOffersPoints;

  useMap(mapRef, city, points, selectedPoint, isHovered);

  return <div style={{ height: '100%' }} ref={mapRef} />;
}

export default CitiesMap;
