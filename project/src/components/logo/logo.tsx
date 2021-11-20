import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from 'config/app-route';
import { getCity } from 'store/app-data/selectors';
import { fetchOffersList } from 'store/api-actions';

function Logo(): JSX.Element {
  const city = useSelector(getCity);

  const dispatch = useDispatch();

  const onUpdateOffers = (value: string) => {
    dispatch(fetchOffersList(value));
  };

  return (
    <Link
      className="header__logo-link"
      to={AppRoute.Root}
      onClick={() => onUpdateOffers(city.name)}
    >
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={81}
        height={41}
      />
    </Link>
  );
}

export default Logo;
