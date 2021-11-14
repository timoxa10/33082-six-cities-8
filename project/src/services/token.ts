const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
const LOGIN_NAME = 'login-name';
const AVATAR_URL = 'avatar-url';

export type Token = string;
export type LoginName = string;
export type AvatarUrl = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export const getLoginName = (): LoginName => {
  const loginName = localStorage.getItem(LOGIN_NAME);
  return loginName ?? '';
};

export const saveLoginName = (loginName: LoginName): void => {
  localStorage.setItem(LOGIN_NAME, loginName);
};

export const dropLoginName = (): void => {
  localStorage.removeItem(LOGIN_NAME);
};

export const getAvatarUrl = (): AvatarUrl => {
  const avatarUrl = localStorage.getItem(AVATAR_URL);
  return avatarUrl ?? '';
};

export const saveAvatarUrl = (avatarUrl: AvatarUrl): void => {
  localStorage.setItem(AVATAR_URL, avatarUrl);
};

export const dropAvatarUrl = (): void => {
  localStorage.removeItem(AVATAR_URL);
};
