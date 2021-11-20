import { UserStatus } from 'config/user-status';
import { INITIAL_LOGIN } from 'config/initial-login';
import { INITIAL_AVATAR_URL } from 'config/initial-avatar-url';
import { AppAuth } from 'types/state';

export const initialStateAppAuth: AppAuth = {
  authorizationStatus: UserStatus.Unknown,
  login: INITIAL_LOGIN,
  avatarUrl: INITIAL_AVATAR_URL,
};
