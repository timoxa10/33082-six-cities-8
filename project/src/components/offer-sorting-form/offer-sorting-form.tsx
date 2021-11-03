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

export { OfferSortingForm };
export default connector(OfferSortingForm);
