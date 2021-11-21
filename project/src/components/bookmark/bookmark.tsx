import { throttle } from 'throttle-debounce';
import classNames from 'classnames';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthorizationStatus } from 'store/app-auth/selectors';
import { addToFavorites } from 'store/api-actions';
import { UserStatus } from 'config/user-status';
import { AppRoute } from 'config/app-route';
import { redirectToRouteAction } from 'store/action';

interface BookmarkProps {
  width: number;
  height: number;
  isFavorite: boolean;
  id: number;
  isPlaceCardBookmark?: boolean;
}

function Bookmark({
  width,
  height,
  isFavorite,
  id,
  isPlaceCardBookmark = true,
}: BookmarkProps): JSX.Element {
  const [isActive, setIsActive] = useState(isFavorite);

  const authStatus = useSelector(getAuthorizationStatus);

  const isAuth = authStatus === UserStatus.Auth;

  const dispatch = useDispatch();

  const handleFavoriteChange = throttle(500, () => {
    setIsActive((prevStatus) => !prevStatus);

    if (isAuth) {
      dispatch(addToFavorites(Number(id), isActive));
    } else {
      dispatch(redirectToRouteAction(AppRoute.Login));
    }
  });

  return (
    <button
      className={classNames('button', {
        'place-card__bookmark-button': isPlaceCardBookmark,
        'place-card__bookmark-button--active': isPlaceCardBookmark && isActive,
        'property__bookmark-button': !isPlaceCardBookmark,
        'property__bookmark-button--active': !isPlaceCardBookmark && isActive,
      })}
      type="button"
      onClick={handleFavoriteChange}
    >
      <svg
        className={classNames({
          'place-card__bookmark-icon': isPlaceCardBookmark,
          'property__bookmark-icon': !isPlaceCardBookmark,
        })}
        width={width}
        height={height}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default Bookmark;
