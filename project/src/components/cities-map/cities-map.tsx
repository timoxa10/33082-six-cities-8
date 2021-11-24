import { useRef } from 'react';
import { useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css';
import useMap from 'hooks/useMap';
import { getCity, getSelectedPoint } from 'store/app-data/selectors';
import { getOffersByCity, getNearbyOffers } from 'store/app-data/selectors';
import { getPointsForMainPage, getPointsForCardPage } from 'utils/point-utils';

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

  const pagePoints = getPointsForMainPage(offersByCity);

  const cardPoints = getPointsForCardPage(nearbyOffers, selectedPoint);

  const points = useOffersByCityPoints ? pagePoints : cardPoints;

  useMap(mapRef, city, points, selectedPoint, isHovered);

  return (
    <div style={{ height: '100%' }} ref={mapRef} data-testid="cities-map" />
  );
}

export default CitiesMap;
