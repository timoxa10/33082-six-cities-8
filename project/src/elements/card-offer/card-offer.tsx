import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import type { OfferProps, OffersProps } from 'types/card-props';
import type { ReviewsProps } from 'types/review-props';
import type { LocationInfo } from 'types/location-info';
import type { State } from 'types/state';
import Header from 'components/header/header';
import MetaDataComponent from 'components/meta-data-component/meta-data-component';
import HiddenBookmarkContent from 'components/hidden-bookmark-content/hidden-bookmark-content';
import ReviewPageForm from 'components/offer-page-form/offer-page-form';
import Card from 'elements/card/card';
import ReviewsList from 'components/reviews-list/reviews-list';
import CitiesMap from 'components/cities-map/cities-map';

const connector = connect(
  ({ city }: State) => ({
    city,
  }),
  {},
);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFromRedux & CardOfferProps;

type CardOfferProps = {
  card: OfferProps;
  cardList: OffersProps;
  currentOffer: number;
};

function CardOffer(props: ConnectedComponentProps): JSX.Element {
  const { city, card, cardList, currentOffer } = props;

  const {
    isPremium,
    title,
    price,
    goods,
    rating,
    type,
    bedrooms,
    maxAdults,
    description,
    images,
  } = card;

  const filteredItems = cardList
    .filter((item) => item.id !== currentOffer)
    .slice(0, 3);

  const [selectedPoint, setSelectedPoint] = useState<LocationInfo>();

  const onListItemHover = (location: LocationInfo) => {
    const currentCard = cardList?.find((point) => point.location === location);
    if (currentCard) {
      setSelectedPoint(currentCard.location);
    }
  };

  const [reviewData, setReviewData] = useState<ReviewsProps>([]);

  const fetchCardReview = useCallback(async () => {
    try {
      const url = `https://8.react.pages.academy/six-cities/comments/${card.id}`;
      const response = await axios.get(url);
      if (response.data) {
        setReviewData(response.data);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Ошибка выполнения fetchCardReview', err);
    }
  }, [card.id]);

  useEffect(() => {
    fetchCardReview();
  }, [card.id, fetchCardReview]);

  return (
    <>
      <MetaDataComponent title="6 cities: property" />
      <link rel="stylesheet" href="../project/public/css/main.css" />
      <HiddenBookmarkContent />
      <div className="page">
        <Header />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.map((image) => (
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
                {isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">{title}</h1>
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
                    {rating}
                  </span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {`${bedrooms} Bedrooms`}
                  </li>
                  <li className="property__feature property__feature--adults">
                    {`Max ${maxAdults} adults`}
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">{`€${price}`}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods &&
                      goods.map((item) => (
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
                        src={card.host.avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">
                      {card.host.name}
                    </span>
                    {card.host.isPro && (
                      <span className="property__user-status"> Pro </span>
                    )}
                  </div>
                  <div className="property__description">
                    <p className="property__text">{description}</p>
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
                points={filteredItems.map(({ location }) => location)}
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
                {filteredItems.map((item) => (
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
