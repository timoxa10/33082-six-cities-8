import camelСaseKeys from 'camelcase-keys';
import type { CardsProps } from 'types/card-props';
import { ThunkActionResult } from 'types/action';
import { getListOfOffersAction, updateOffersListAction } from 'store/action';
import { filterOffersList } from 'utils/utils';
import { INITIAL_CITY } from 'config/constants';

function fetchOffersList(): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    const { data } = await api.get<CardsProps>('/hotels');
    const offers = camelСaseKeys(data, {
      deep: true,
    });

    dispatch(getListOfOffersAction(offers));
    dispatch(
      updateOffersListAction(filterOffersList(INITIAL_CITY.name, offers)),
    );
  };
}

export { fetchOffersList };
