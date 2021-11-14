import { combineReducers } from 'redux';
import { appData } from 'store/app-data/app-data';
import { appAuth } from 'store/app-auth/app-auth';
import { appDataStatus } from 'store/app-data-status/app-data-status';

export enum NameSpace {
  auth = 'AUTH',
  data = 'DATA',
  status = 'STATUS',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: appData,
  [NameSpace.auth]: appAuth,
  [NameSpace.status]: appDataStatus,
});

export type RootState = ReturnType<typeof rootReducer>;
