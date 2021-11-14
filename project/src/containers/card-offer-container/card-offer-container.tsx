import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { getCurrentOfferId, getReviewsList } from 'store/app-data/selectors';
import { getOfferByIdData } from 'store/app-data/selectors';
import { getNearbyOffers } from 'store/app-data/selectors';
import { getOfferPageStatus } from 'store/app-data-status/selectors';
import { getAuthorizationStatus } from 'store/app-auth/selectors';
import { fetchOfferData } from 'store/api-actions';
import Layout from 'components/layout/layout';
import CardOffer from 'components/card-offer/card-offer';

function CardOfferContainer(): JSX.Element {
  const currentOfferId = useSelector(getCurrentOfferId);
  const reviewsList = useSelector(getReviewsList);
  const offerByIdData = useSelector(getOfferByIdData);
  const nearbyOffers = useSelector(getNearbyOffers);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const offerPageStatus = useSelector(getOfferPageStatus);

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
    <Layout>
      <CardOffer
        reviewsList={reviewsList}
        offerByIdData={offerByIdData}
        nearbyOffers={nearbyOffers}
        authorizationStatus={authorizationStatus}
        loadingStatus={offerPageStatus}
      />
    </Layout>
  );
}

export default CardOfferContainer;
