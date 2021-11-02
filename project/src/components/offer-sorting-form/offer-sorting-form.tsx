/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import { useState } from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { SortTypes } from 'config/SortTypes';
import type { State } from 'types/state';
import type { Actions } from 'types/action';
import type { OffersProps } from 'types/card-props';
import { getActiveSortTypeAction, updateOffersListAction } from 'store/action';
import { sortOffersByType } from 'utils/utils';

const mapStateToProps = ({ activeSortType, offersByCity }: State) => ({
  activeSortType,
  offersByCity,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onSortTypeSelected(value: string) {
    dispatch(getActiveSortTypeAction(value));
  },

  onUpdateOfferByType(offers: OffersProps, type: string) {
    dispatch(updateOffersListAction(sortOffersByType(type, offers)));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function OfferSortingForm(props: PropsFromRedux): JSX.Element {
  const {
    activeSortType,
    offersByCity,
    onSortTypeSelected,
    onUpdateOfferByType,
  } = props;

  const sortTypesList = Object.values(SortTypes);

  const [isOpened, setIsOpened] = useState(false);

  const onSortTypeOnClick = (type: string, offers: OffersProps) => {
    onSortTypeSelected(type);
    onUpdateOfferByType(offers, type);
    setIsOpened((prevState) => !prevState);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened((prevState) => !prevState)}
      >
        {activeSortType}
        <svg
          className="places__sorting-arrow"
          width={7}
          height={4}
          style={{
            transform: isOpened
              ? 'rotate(180deg) translateY(3px)'
              : 'rotate(0deg) translateY(-50%)',
          }}
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
            onClick={() => onSortTypeOnClick(type, offersByCity)}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

export { OfferSortingForm };
export default connector(OfferSortingForm);
