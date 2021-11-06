import { useState } from 'react';
import type { OfferProps, OffersProps } from 'types/card-props';
import type { ReviewsProps } from 'types/review-props';
import type { LocationInfo } from 'types/location-info';
import type { CityCoordinates } from 'types/city-coordinates';
import Header from 'components/header/header';
import ReviewPageForm from 'components/offer-page-form/offer-page-form';
import Card from 'elements/card/card';
import ReviewsList from 'components/reviews-list/reviews-list';
import CitiesMap from 'components/cities-map/cities-map';
import Spinner from 'elements/spinner/spinner';

interface CardOfferProps {
  city: CityCoordinates;
  reviewsList: ReviewsProps;
  offerByIdData: OfferProps | null;
  nearbyOffers: OffersProps;
}

function CardOffer({
  city,
  reviewsList,
  offerByIdData,
  nearbyOffers,
}: CardOfferProps): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<LocationInfo | null>(null);

  const onListItemHover = (location: LocationInfo) => {
    const currentCard = nearbyOffers?.find(
      (point) => point.location === location,
    );
    if (currentCard) {
      setSelectedPoint(currentCard.location);
    }
  };

  return offerByIdData && Object.keys(offerByIdData)?.length > 0 ? (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offerByIdData?.images.map((image) => (
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
              {offerByIdData?.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">{offerByIdData?.title}</h1>
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
                  {offerByIdData?.rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offerByIdData?.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${offerByIdData?.bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${offerByIdData?.maxAdults} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">{`€${offerByIdData?.price}`}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offerByIdData &&
                    offerByIdData?.goods?.map((item) => (
                      <li className="property__inside-item" key={item}>
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={offerByIdData?.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {offerByIdData?.host.name}
                  </span>
                  {offerByIdData?.host.isPro && (
                    <span className="property__user-status"> Pro </span>
                  )}
                </div>
                <div className="property__description">
                  <p className="property__text">{offerByIdData?.description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList reviews={reviewsList} />
                <ReviewPageForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <CitiesMap
              city={city}
              points={nearbyOffers?.map(({ location }) => location)}
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
              {nearbyOffers?.map((item) => (
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
  ) : (
    <Spinner />
  );
}

export default CardOffer;
