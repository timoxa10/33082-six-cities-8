/* eslint-disable comma-dangle */
/* eslint-disable no-console */
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import type { State } from 'types/state';
import type { Actions } from 'types/action';
import type { CityCoordinates } from 'types/city-coordinates';
import {
  getCurrentCity,
  getListOfOffersAction,
  getCurrentCityCoords,
} from 'store/action';

const mapStateToProps = ({ city }: State) => ({
  city,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onTabsOnClick(value: string, coords: CityCoordinates) {
    dispatch(getCurrentCity(value));
    dispatch(getCurrentCityCoords(coords));
    dispatch(getListOfOffersAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function TabsList(props: PropsFromRedux): JSX.Element {
  const { city, onTabsOnClick } = props;

  const locationsList = [
    {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13,
      },
    },
    {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13,
      },
    },
    {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    {
      name: 'Hamburg',
      location: {
        latitude: 53.550341,
        longitude: 10.000654,
        zoom: 13,
      },
    },
    {
      name: 'Dusseldorf',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 13,
      },
    },
  ];

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locationsList.map((item) => (
            <li
              className="locations__item"
              key={item.name}
              onClick={() => onTabsOnClick(item.name, item)}
            >
              <Link
                className={`locations__item-link tabs__item 
                ${city === item.name && 'tabs__item--active'}`}
                to="/"
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
