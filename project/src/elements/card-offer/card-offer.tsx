import { useState } from 'react';
import type { CardListProps } from 'types/card-list-props';
import type { ReviewListProps } from 'types/review-list-props';
import type { LocationInfo } from 'types/location-info';
import Logo from 'elements/logo/logo';
import ReviewPageForm from 'components/offer-page-form/offer-page-form';
import Card from 'elements/card/card';
import ReviewsList from 'components/reviews-list/reviews-list';
import CitiesMap from 'components/cities-map/cities-map';

type CardOfferProps = {
  card: CardListProps;
  cardList: CardListProps[];
  currentOffer: number;
  reviewList: ReviewListProps[];
};

function CardOffer({
  card,
  cardList,
  currentOffer,
  reviewList,
}: CardOfferProps): JSX.Element {
  const { isPremium, title, price, goods, rating, type, bedrooms, maxAdults } =
    card;

  const cardIndex = cardList.findIndex((element) => {
    if (element.id === currentOffer) {
      return true;
    }
    return null;
  });

  const newCardList = [
    ...cardList.slice(0, cardIndex),
    ...cardList.slice(cardIndex + 1),
  ];

  const [selectedPoint, setSelectedPoint] = useState<LocationInfo>();

  const onListItemHover = (location: LocationInfo) => {
    const currentCard = cardList?.find((point) => point.location === location);
    setSelectedPoint(currentCard?.location);
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>6 cities: property</title>
      <link rel="stylesheet" href="../project/public/css/main.css" />
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            />
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" />
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            />
          </symbol>
        </svg>
      </div>
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Logo />
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a
                      className="header__nav-link header__nav-link--profile"
                      href="#"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__user-name user__name">
                        Oliver.conner@gmail.com
                      </span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                <div className="property__image-wrapper">
                  <img
                    className="property__image"
                    src="img/room.jpg"
                    alt="Place studio"
                  />
                </div>
                <div className="property__image-wrapper">
                  <img
                    className="property__image"
                    src="img/apartment-01.jpg"
                    alt="Place studio"
                  />
                </div>
                <div className="property__image-wrapper">
                  <img
                    className="property__image"
                    src="img/apartment-02.jpg"
                    alt="Place studio"
                  />
                </div>
                <div className="property__image-wrapper">
                  <img
                    className="property__image"
                    src="img/apartment-03.jpg"
                    alt="Place studio"
                  />
                </div>
                <div className="property__image-wrapper">
                  <img
                    className="property__image"
                    src="img/studio-01.jpg"
                    alt="Place studio"
                  />
                </div>
                <div className="property__image-wrapper">
                  <img
                    className="property__image"
                    src="img/apartment-01.jpg"
                    alt="Place studio"
                  />
                </div>
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
                      goods.map((item, index) => (
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
                        src="img/avatar-angelina.jpg"
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
                    <p className="property__text">
                      A quiet cozy and picturesque that hides behind a a river
                      by the unique lightness of Amsterdam. The building is
                      green and from 18th century.
                    </p>
                    <p className="property__text">
                      An independent House, strategically located between
                      Rembrand Square and National Opera, but where the bustle
                      of the city comes to rest in this alley flowery and
                      colorful.
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <ReviewsList list={reviewList} />
                  <ReviewPageForm />
                </section>
              </div>
            </div>
            <section className="property__map map">
              <CitiesMap
                city={newCardList.slice(0, 3).map(({ city }) => city)[0]}
                points={newCardList.slice(0, 3).map(({ location }) => location)}
                selectedPoint={selectedPoint!}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                {newCardList
                  ?.slice(0, 3)
                  ?.reverse()
                  ?.map((item) => (
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

export default CardOffer;
