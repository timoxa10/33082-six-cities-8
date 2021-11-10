import { combineReducers } from 'redux';
import { appData } from 'store/app-data/app-data';
import { appAuth } from 'store/app-auth/app-auth';

export enum NameSpace {
  auth = 'AUTH',
  data = 'DATA',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: appData,
  [NameSpace.auth]: appAuth,
});

export type RootState = ReturnType<typeof rootReducer>;
