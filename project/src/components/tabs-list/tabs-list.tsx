/* eslint-disable comma-dangle */
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import classNames from 'classnames';
import { AppRoute } from 'config/AppRoute';
import type { State } from 'types/state';
import type { Actions } from 'types/action';
import type { CityCoordinates } from 'types/city-coordinates';
import type { OffersProps } from 'types/card-props';
import { filterOffersList } from 'utils/utils';
import {
  getCurrentCityAction,
  updateOffersListAction,
  getActiveSortTypeAction,
} from 'store/action';
import { DEFAULT_SORT_TYPE } from 'config/DefaultSortType';

const mapStateToProps = ({ city, offers, locationsList }: State) => ({
  city,
  offers,
  locationsList,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onCitySelected(value: CityCoordinates) {
    dispatch(getCurrentCityAction(value));
  },

  onOffersUpdate(offers: OffersProps, city: string) {
    dispatch(updateOffersListAction(filterOffersList(city, offers)));
    dispatch(getActiveSortTypeAction(DEFAULT_SORT_TYPE));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function TabsList(props: PropsFromRedux): JSX.Element {
  const { city, offers, locationsList, onCitySelected, onOffersUpdate } = props;

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

export { TabsList };
export default connector(TabsList);
