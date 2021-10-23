import { MouseEvent } from 'react';
import type { CardListProps } from 'types/card-list-props';
import type { LocationInfo } from 'types/location-info';
import { Link } from 'react-router-dom';

type CardNearbyProps = {
  card: CardListProps;
  onListItemHover: (location: LocationInfo) => void;
};

function CardNearby({ card, onListItemHover }: CardNearbyProps): JSX.Element {
  const [mainImage] = card.images;

  const listItemHoverHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    onListItemHover(card.location);
  };

  return (
    <article
      className="near-places__card place-card"
      onMouseEnter={listItemHoverHandler}
    >
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${card.id}/`}>
          <img
            className="place-card__image"
            src={mainImage}
            width={260}
            height={200}
            alt="Place interior"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{card.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className="
      place-card__bookmark-button
      place-card__bookmark-button--active
      button
    "
            type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '80%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${card.id}/`}>{card.title}</Link>
        </h2>
        <p className="place-card__type">{card.type}</p>
      </div>
    </article>
  );
}

export default CardNearby;
