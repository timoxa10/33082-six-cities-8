/* eslint-disable comma-dangle */
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { getCity, getOffers, getLocationsList } from 'store/app-data/selectors';
import { AppRoute } from 'config/AppRoute';
import type { CityCoordinates } from 'types/city-coordinates';
import type { OffersProps } from 'types/card-props';
import { filterOffersList } from 'utils/utils';
import {
  getCurrentCityAction,
  updateOffersListAction,
  getActiveSortTypeAction,
} from 'store/action';
import { DEFAULT_SORT_TYPE } from 'config/DefaultSortType';

function TabsList(): JSX.Element {
  const city = useSelector(getCity);
  const offers = useSelector(getOffers);
  const locationsList = useSelector(getLocationsList);

  const dispatch = useDispatch();

  const onCitySelected = (value: CityCoordinates) => {
    dispatch(getCurrentCityAction(value));
  };

  const onOffersUpdate = (array: OffersProps, value: string) => {
    dispatch(updateOffersListAction(filterOffersList(value, array)));
    dispatch(getActiveSortTypeAction(DEFAULT_SORT_TYPE));
  };

  const onLocationOnClick = (selectedCity: CityCoordinates) => {
    onCitySelected(selectedCity);
    onOffersUpdate(offers, selectedCity.name);
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locationsList.map((item) => (
            <li
              className="locations__item"
              key={item.name}
              onClick={() => onLocationOnClick(item)}
            >
              <Link
                className={classNames('locations__item-link tabs__item', {
                  'tabs__item--active': city.name === item.name,
                })}
                to={AppRoute.Root}
              >
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default TabsList;
