import { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from 'hooks/useMap';
import type { State } from 'types/state';
import { connect, ConnectedProps } from 'react-redux';

interface CitiesMapProps {
  isHovered: boolean;
  useOffersByCityPoints?: boolean;
}

const mapStateToProps = ({
  city,
  selectedPoint,
  offersByCity,
  nearbyOffers,
}: State) => ({
  city,
  selectedPoint,
  offersByCity,
  nearbyOffers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & CitiesMapProps;

function CitiesMap({
  city,
  selectedPoint,
  isHovered,
  offersByCity,
  nearbyOffers,
  useOffersByCityPoints = false,
}: ConnectedComponentProps): JSX.Element {
  const mapRef = useRef(null);

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

export { CitiesMap };
export default connector(CitiesMap);
