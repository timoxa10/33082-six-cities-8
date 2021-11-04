import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import type { ThunkAppDispatch } from 'types/action';
import type { State } from 'types/state';
import { fetchOfferData } from 'store/api-actions';
import CardOffer from 'elements/card-offer/card-offer';

const mapStateToProps = ({
  city,
  currentOfferId,
  isLoading,
  reviewsList,
  offerByIdData,
  nearbyOffers,
}: State) => ({
  city,
  currentOfferId,
  isLoading,
  reviewsList,
  offerByIdData,
  nearbyOffers,
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
    city,
    currentOfferId,
    reviewsList,
    offerByIdData,
    nearbyOffers,
    fetchData,
  } = props;

  useEffect(() => {
    fetchData(currentOfferId);
  }, [currentOfferId]);

  return (
    <CardOffer
      city={city}
      reviewsList={reviewsList}
      offerByIdData={offerByIdData}
      nearbyOffers={nearbyOffers}
    />
  );
}

export { CardOfferContainer };
export default connector(CardOfferContainer);
