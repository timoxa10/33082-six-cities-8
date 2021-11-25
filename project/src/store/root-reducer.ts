import { combineReducers } from 'redux';
import { appData } from 'store/app-data/app-data';
import { appAuth } from 'store/app-auth/app-auth';
import { appDataStatus } from 'store/app-data-status/app-data-status';

export enum NameSpace {
  Auth = 'AUTH',
  Data = 'DATA',
  Status = 'STATUS',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: appData,
  [NameSpace.Auth]: appAuth,
  [NameSpace.Status]: appDataStatus,
});

export type RootState = ReturnType<typeof rootReducer>;
