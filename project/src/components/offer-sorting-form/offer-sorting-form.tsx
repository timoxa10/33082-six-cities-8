import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { SortTypes } from 'config/SortTypes';
import type { OffersProps } from 'types/card-props';
import { getActiveSortTypeAction, updateOffersListAction } from 'store/action';
import { getActiveSortType, getOffersByCity } from 'store/app-data/selectors';
import { sortOffersByType } from 'utils/sorting-utils';

function OfferSortingForm(): JSX.Element {
  const activeSortType = useSelector(getActiveSortType);
  const offersByCity = useSelector(getOffersByCity);

  const dispatch = useDispatch();

  const onSortTypeSelected = (value: string) => {
    dispatch(getActiveSortTypeAction(value));
  };

  const onUpdateOfferByType = (offers: OffersProps, type: string) => {
    dispatch(updateOffersListAction(sortOffersByType(type, offers)));
  };

  const sortTypesList = Object.values(SortTypes);

  const [isOpened, setIsOpened] = useState(false);

  const onSortTypeOnClick = (offers: OffersProps, type: string) => {
    onSortTypeSelected(type);
    onUpdateOfferByType(offers, type);
    setIsOpened(!isOpened);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened(!isOpened)}
      >
        {activeSortType}
        <svg
          width={7}
          height={4}
          className={classNames('places__sorting-arrow', {
            'sorting-arrow-default': !isOpened,
            'sorting-arrow-active': isOpened,
          })}
        >
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={classNames('places__options places__options--custom', {
          'places__options--opened': isOpened,
        })}
      >
        {sortTypesList.map((type) => (
          <li
            className={classNames('places__option', {
              'places__option--active': type === activeSortType,
            })}
            tabIndex={0}
            key={type}
            onClick={() => onSortTypeOnClick(offersByCity, type)}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default OfferSortingForm;
