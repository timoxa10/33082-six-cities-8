import { UserStatus } from 'config/UserStatus';
import { INITIAL_LOGIN } from 'config/InitialLogin';
import { INITIAL_AVATAR_URL } from 'config/InitialAvatarUrl';
import { AppAuth } from 'types/state';

export const initialStateAppAuth: AppAuth = {
  authorizationStatus: UserStatus.Unknown,
  login: INITIAL_LOGIN,
  avatarUrl: INITIAL_AVATAR_URL,
};
