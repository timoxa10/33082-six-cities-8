/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import classNames from 'classnames';
import { MouseEvent } from 'react';
import type { OfferProps } from 'types/card-props';
import { Link } from 'react-router-dom';
import type { LocationInfo } from 'types/location-info';
import { capitalizeFirstLetter } from 'utils/utils';

type MainCardProps = {
  card: OfferProps;
  onListItemHover: (location: LocationInfo) => void;
  className: string;
};

function Card({ card, onListItemHover, ...props }: MainCardProps): JSX.Element {
  const { className } = props;

  const [mainImage] = card.images;

  const listItemHoverHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    onListItemHover(card.location);
  };

  return (
    <article
      className={classNames('place-card', className)}
      onMouseEnter={listItemHoverHandler}
    >
      {card.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
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
            <b className="place-card__price-value">{card.price}</b>
            <span className="place-card__price-text">/ night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
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
        <p className="place-card__type">{capitalizeFirstLetter(card.type)}</p>
      </div>
    </article>
  );
}

export default Card;
