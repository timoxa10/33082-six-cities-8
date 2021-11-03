/* eslint-disable no-console */
import camelСaseKeys from 'camelcase-keys';
import { useState, useEffect, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import type { OfferProps, OffersProps } from 'types/card-props';
import type { ReviewsProps } from 'types/review-props';
import type { LocationInfo } from 'types/location-info';
import type { State } from 'types/state';
import { createAPI } from 'services/api';
import Header from 'components/header/header';
import MetaDataComponent from 'components/meta-data-component/meta-data-component';
import SvgSpriteIcons from 'components/svg-sprite-icons/svg-sprite-icons';
import ReviewPageForm from 'components/offer-page-form/offer-page-form';
import Card from 'elements/card/card';
import ReviewsList from 'components/reviews-list/reviews-list';
import CitiesMap from 'components/cities-map/cities-map';

const api = createAPI();

const connector = connect(({ city, currentOfferId }: State) => ({
  city,
  currentOfferId,
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

function CardOffer(props: PropsFromRedux): JSX.Element {
  const { city, currentOfferId } = props;

  const [selectedPoint, setSelectedPoint] = useState<LocationInfo>();

  const onListItemHover = (location: LocationInfo) => {
    const currentCard = nearbyCards?.find(
      (point) => point.location === location,
    );
    if (currentCard) {
      setSelectedPoint(currentCard.location);
    }
  };

  const [cardData, setCardData] = useState<OfferProps>();
  const [reviewData, setReviewData] = useState<ReviewsProps>([]);
  const [nearbyCards, setNearbyCards] = useState<OffersProps>([]);

  const fetchCardReview = useCallback(async () => {
    try {
      const { data } = await api.get<ReviewsProps>(
        `/comments/${currentOfferId}`,
      );
      if (data) {
        setReviewData(data);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Ошибка выполнения fetchCardReview', err);
    }
  }, [currentOfferId]);

  const fetchCardData = useCallback(async () => {
    try {
      const { data } = await api.get<OfferProps>(`/hotels/${currentOfferId}`);
      if (data) {
        setCardData(
          camelСaseKeys(data, {
            deep: true,
          }),
        );
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Ошибка выполнения fetchCardData', err);
    }
  }, [currentOfferId]);

  const fetchNearbyCards = useCallback(async () => {
    try {
      const { data } = await api.get<OffersProps>(
        `/hotels/${currentOfferId}/nearby`,
      );
      if (data) {
        setNearbyCards(
          camelСaseKeys(data, {
            deep: true,
          }),
        );
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Ошибка выполнения fetchNearbyCards', err);
    }
  }, [currentOfferId]);

  useEffect(() => {
    fetchCardReview();
    fetchCardData();
    fetchNearbyCards();
  }, [currentOfferId, fetchCardData, fetchCardReview, fetchNearbyCards]);

  return (
    <>
      <MetaDataComponent title="6 cities: property" />
      <link rel="stylesheet" href="../project/public/css/main.css" />
      <SvgSpriteIcons />
      <div className="page">
        <Header />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {cardData?.images.map((image) => (
                  <div className="property__image-wrapper" key={image}>
                    <img
                      className="property__image"
                      src={image}
                      alt="Place studio"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {cardData?.isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">{cardData?.title}</h1>
                  <button
                    className="property__bookmark-button button"
                    type="button"
                  >
                    <svg
                      className="property__bookmark-icon"
                      width={31}
                      height={33}
                    >
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{ width: '80%' }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">
                    {cardData?.rating}
                  </span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {cardData?.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {`${cardData?.bedrooms} Bedrooms`}
                  </li>
                  <li className="property__feature property__feature--adults">
                    {`Max ${cardData?.maxAdults} adults`}
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">{`€${cardData?.price}`}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {cardData?.goods?.map((item) => (
                      <li className="property__inside-item" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div
                      className="
      property__avatar-wrapper property__avatar-wrapper--pro
      user__avatar-wrapper
    "
                    >
                      <img
                        className="property__avatar user__avatar"
                        src={cardData?.host.avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">
                      {cardData?.host.name}
                    </span>
                    {cardData?.host.isPro && (
                      <span className="property__user-status"> Pro </span>
                    )}
                  </div>
                  <div className="property__description">
                    <p className="property__text">{cardData?.description}</p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <ReviewsList reviews={reviewData} />
                  <ReviewPageForm />
                </section>
              </div>
            </div>
            <section className="property__map map">
              <CitiesMap
                city={city}
                points={nearbyCards?.map(({ location }) => location)}
                selectedPoint={selectedPoint}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                {nearbyCards?.map((item) => (
                  <Card
                    card={item}
                    key={item.id}
                    onListItemHover={onListItemHover}
                    className="near-places__card"
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
export { CardOffer };
export default connector(CardOffer);
