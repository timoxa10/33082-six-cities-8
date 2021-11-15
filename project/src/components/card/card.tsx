import classNames from 'classnames';
import { throttle } from 'throttle-debounce';
import { MouseEvent } from 'react';
import type { OfferProps } from 'types/card-props';
import { Link } from 'react-router-dom';
import Bookmark from 'components/bookmark/bookmark';
import type { LocationInfo } from 'types/location-info';
import transformRatingToPersent from 'utils/transformRatingToPersent';

type MainCardProps = {
  card: OfferProps;
  onListItemHover?: (location: LocationInfo) => void;
  onListItemLeave?: () => void;
  isFavoriteCard?: boolean;
  isNearbyCard?: boolean;
  isCitiesCard?: boolean;
  width: number;
  height: number;
};

function Card({
  card,
  onListItemHover,
  onListItemLeave,
  isFavoriteCard = false,
  isNearbyCard = false,
  isCitiesCard = false,
  width,
  height,
}: MainCardProps): JSX.Element {
  const [mainImage] = card?.images;

  const listItemHoverHandler = throttle(
    300,
    (event: MouseEvent<HTMLDivElement>) => {
      if (onListItemHover) {
        event.preventDefault();
        onListItemHover(card.location);
      }
    },
  );

  return (
    <article
      className={classNames('place-card', {
        'cities__place-card': isCitiesCard,
        'favorites__card-wrapper': isFavoriteCard,
        'near-places__card': isNearbyCard,
      })}
      onMouseEnter={listItemHoverHandler}
      onMouseLeave={onListItemLeave}
    >
      {card?.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={classNames('place-card__image-wrapper', {
          'cities__image-wrapper': isCitiesCard,
          'favorites__image-wrapper': isFavoriteCard,
        })}
      >
        <Link to={`/offer/${card?.id}/`}>
          <img
            className="place-card__image"
            src={mainImage}
            width={width}
            height={height}
            alt="Place interior"
          />
        </Link>
      </div>
      <div
        className={classNames('place-card__info', {
          'favorites__card-info': isFavoriteCard,
        })}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{card?.price}</b>
            <span className="place-card__price-text">/ night</span>
          </div>

          <Bookmark
            width={18}
            height={19}
            isFavorite={card?.isFavorite}
            id={card.id}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: transformRatingToPersent(card?.rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${card?.id}/`}>{card?.title}</Link>
        </h2>
        <p className="place-card__type">{card?.type}</p>
      </div>
    </article>
  );
}

export default Card;
