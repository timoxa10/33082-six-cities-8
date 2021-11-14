import { throttle } from 'throttle-debounce';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthorizationStatus } from 'store/app-auth/selectors';
import { addToFavorites, fetchFavoriteList } from 'store/api-actions';
import { MouseEvent, useState } from 'react';
import { UserStatus } from 'config/UserStatus';
import { AppRoute } from 'config/AppRoute';
import { redirectToRouteAction } from 'store/action';

interface BookmarkProps {
  width: number;
  height: number;
  isFavorite: boolean;
  id: number;
  shouldCallListUpdate?: boolean;
  isPlaceCardBookmark?: boolean;
}

function Bookmark({
  width,
  height,
  isFavorite,
  id,
  shouldCallListUpdate = false,
  isPlaceCardBookmark = true,
}: BookmarkProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const isAuth = authorizationStatus === UserStatus.Auth;

  const [isActive, setIsActive] = useState(isFavorite);

  const addToFavoriteHandler = throttle(500, (event: MouseEvent) => {
    event.preventDefault();

    if (!isAuth) {
      setIsActive(false);
      onNoAuthRedirect();
    } else {
      setIsActive(!isActive);
      onFavoriteAction(Number(id));
    }
  });

  const dispatch = useDispatch();

  const onFavoriteAction = (currentId: number | string) => {
    dispatch(addToFavorites(Number(currentId), isActive));

    if (shouldCallListUpdate) {
      dispatch(fetchFavoriteList());
    }
  };

  const onNoAuthRedirect = () => {
    dispatch(redirectToRouteAction(AppRoute.Login));
  };

  return (
    <button
      className={classNames('button', {
        'place-card__bookmark-button': isPlaceCardBookmark,
        'place-card__bookmark-button--active': isPlaceCardBookmark && isActive,
        'property__bookmark-button': !isPlaceCardBookmark,
        'property__bookmark-button--active': !isPlaceCardBookmark && isActive,
      })}
      type="button"
      onClick={addToFavoriteHandler}
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
