import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import type { ThunkAppDispatch } from 'types/action';
import type { State } from 'types/state';
import { fetchOfferData } from 'store/api-actions';
import Layout from 'components/layout/layout';
import CardOffer from 'elements/card-offer/card-offer';

const mapStateToProps = ({
  currentOfferId,
  reviewsList,
  offerByIdData,
  nearbyOffers,
  authorizationStatus,
  isLoading,
}: State) => ({
  currentOfferId,
  reviewsList,
  offerByIdData,
  nearbyOffers,
  authorizationStatus,
  isLoading,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchData(id: number) {
    dispatch(fetchOfferData(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function CardOfferContainer(props: PropsFromRedux): JSX.Element {
  const {
    currentOfferId,
    reviewsList,
    offerByIdData,
    nearbyOffers,
    fetchData,
    authorizationStatus,
  } = props;

  useEffect(() => {
    fetchData(currentOfferId);
  }, [currentOfferId]);

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

export { CardOfferContainer };
export default connector(CardOfferContainer);
