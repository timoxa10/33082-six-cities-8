/* eslint-disable comma-dangle */
import camelСaseKeys from 'camelcase-keys';
import { ThunkActionResult } from 'types/action';
import type { OfferProps, OffersProps } from 'types/card-props';
import type { ReviewsProps } from 'types/review-props';
import {
  getListOfOffersAction,
  updateOffersListAction,
  setIsLoadingAction,
  getListOfCitiesAction,
  getListOfReviewsAction,
  getCurrentOfferByIdDataAction,
  getNearbyOffersAction,
} from 'store/action';
import { filterOffersList } from 'utils/utils';
import { INITIAL_CITY } from 'config/initial-city';
import { LOCATIONS_LIST } from 'config/locations-list';

function fetchOffersList(): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    const { data } = await api.get<OffersProps>('/hotels');
    const offers = camelСaseKeys(data, {
      deep: true,
    });

    dispatch(getListOfOffersAction(offers));
    dispatch(
      updateOffersListAction(filterOffersList(INITIAL_CITY.name, offers)),
    );
    dispatch(getListOfCitiesAction(LOCATIONS_LIST));
    dispatch(setIsLoadingAction(false));
  };
}

function fetchOfferData(id: number): ThunkActionResult {
  return async (dispatch, _, api): Promise<void> => {
    await api.get<ReviewsProps>(`/comments/${id}`).then(({ data }) => {
      dispatch(
        getListOfReviewsAction(
          camelСaseKeys(data, {
            deep: true,
          }),
        ),
      );
    });

    await api.get<OfferProps>(`/hotels/${id}`).then(({ data }) => {
      dispatch(
        getCurrentOfferByIdDataAction(
          camelСaseKeys(data, {
            deep: true,
          }),
        ),
      );
    });

    await api.get<OffersProps>(`/hotels/${id}/nearby`).then(({ data }) => {
      dispatch(
        getNearbyOffersAction(
          camelСaseKeys(data, {
            deep: true,
          }),
        ),
      );
    });
  };
}

export { fetchOffersList, fetchOfferData };
