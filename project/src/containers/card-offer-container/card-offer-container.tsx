/* eslint-disable comma-dangle */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import {
  getCurrentOfferId,
  getReviewsList,
  getOfferByIdData,
  getNearbyOffers,
} from 'store/app-data/selectors';
import { getAuthorizationStatus } from 'store/app-auth/selectors';
import { fetchOfferData } from 'store/api-actions';
import Layout from 'components/layout/layout';
import CardOffer from 'elements/card-offer/card-offer';

function CardOfferContainer(): JSX.Element {
  const currentOfferId = useSelector(getCurrentOfferId);
  const reviewsList = useSelector(getReviewsList);
  const offerByIdData = useSelector(getOfferByIdData);
  const nearbyOffers = useSelector(getNearbyOffers);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();

  const fetchData = useCallback(
    (id: number) => {
      dispatch(fetchOfferData(id));
    },
    [dispatch],
  );

  useEffect(() => {
    fetchData(currentOfferId);
  }, [currentOfferId, fetchData]);

  return (
    <Layout className="page">
      <CardOffer
        reviewsList={reviewsList}
        offerByIdData={offerByIdData}
        nearbyOffers={nearbyOffers}
        authorizationStatus={authorizationStatus}
      />
    </Layout>
  );
}

export default CardOfferContainer;
