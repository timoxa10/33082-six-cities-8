import { NameSpace } from 'store/root-reducer';
import { State } from 'types/state';
import { UserStatus } from 'config/user-status';

export const getAuthorizationStatus = (state: State): UserStatus =>
  state[NameSpace.auth].authorizationStatus;

export const getLogin = (state: State): string => state[NameSpace.auth].login;

export const getAvatarUrl = (state: State): string =>
  state[NameSpace.auth].avatarUrl;
