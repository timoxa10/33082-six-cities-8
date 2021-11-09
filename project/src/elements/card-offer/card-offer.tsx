import type { OfferProps, OffersProps } from 'types/card-props';
import type { ReviewsProps } from 'types/review-props';
import { UserStatus } from 'config/UserStatus';
import ReviewPageForm from 'components/offer-page-form/offer-page-form';
import Card from 'elements/card/card';
import ReviewsList from 'components/reviews-list/reviews-list';
import CitiesMap from 'components/cities-map/cities-map';

interface CardOfferProps {
  reviewsList: ReviewsProps;
  offerByIdData: Partial<OfferProps>;
  nearbyOffers: OffersProps;
  authorizationStatus: UserStatus;
}

function CardOffer({
  reviewsList,
  offerByIdData,
  nearbyOffers,
  authorizationStatus,
}: CardOfferProps): JSX.Element {
  const isAuth = authorizationStatus === UserStatus.Auth;

  if (Object.keys(offerByIdData).length > 0) {
    return (
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offerByIdData?.images?.map((image) => (
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
                  {offerByIdData?.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offerByIdData?.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">{`€${offerByIdData?.price}`}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                {offerByIdData?.goods && (
                  <ul className="property__inside-list">
                    {offerByIdData?.goods?.map((item) => (
                      <li className="property__inside-item" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={offerByIdData?.host?.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {offerByIdData?.host?.name}
                  </span>
                  {offerByIdData?.host?.isPro && (
                    <span className="property__user-status"> Pro </span>
                  )}
                </div>
                <div className="property__description">
                  <p className="property__text">{offerByIdData?.description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList reviews={reviewsList} />
                {isAuth && <ReviewPageForm />}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <CitiesMap isHovered />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nearbyOffers?.map((item) => (
                <Card card={item} key={item.id} className="near-places__card" />
              ))}
            </div>
          </section>
        </div>
      </main>
    );
  }

  return <div></div>;
}

export default CardOffer;
