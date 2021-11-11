import { debounce } from 'throttle-debounce';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthorizationStatus } from 'store/app-auth/selectors';
import { addToFavourites, fetchFavoriteList } from 'store/api-actions';
import { MouseEvent, useState } from 'react';
import { UserStatus } from 'config/UserStatus';
import { AppRoute } from 'config/AppRoute';
import { redirectToRouteAction } from 'store/action';

interface BookmarkProps {
  className: string;
  width: number;
  height: number;
  isFavorite: boolean;
  id: number;
}

function Bookmark({
  className,
  width,
  height,
  isFavorite,
  id,
}: BookmarkProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isAuth = authorizationStatus === UserStatus.Auth;

  const [isActive, setIsActive] = useState(isFavorite);

  const addToFavoriteHandler = debounce(500, (event: MouseEvent) => {
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

  const onFavoriteAction = (currentId: number) => {
    dispatch(addToFavourites(Number(currentId), isActive));
    dispatch(fetchFavoriteList());
  };

  const onNoAuthRedirect = () => {
    dispatch(redirectToRouteAction(AppRoute.Login));
  };

  return (
    <button
      className={classNames([`${className}__bookmark-button button`], {
        [`${className}__bookmark-button--active`]: isActive,
      })}
      type="button"
      onClick={addToFavoriteHandler}
    >
      <svg
        className={classNames([`${className}__bookmark-icon`])}
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
