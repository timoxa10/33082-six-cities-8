import { createReducer } from '@reduxjs/toolkit';
import { requireAuthorizationAction, requireLogoutAction } from 'store/action';
import { setLoginAction, setAvatarUrlAction } from 'store/action';
import { initialStateAppAuth } from 'store/app-auth/initial-state';
import { UserStatus } from 'config/user-status';

const appAuth = createReducer(initialStateAppAuth, (builder) => {
  builder
    .addCase(requireAuthorizationAction, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogoutAction, (state) => {
      state.authorizationStatus = UserStatus.NoAuth;
    })
    .addCase(setLoginAction, (state, action) => {
      state.login = action.payload;
    })
    .addCase(setAvatarUrlAction, (state, action) => {
      state.avatarUrl = action.payload;
    });
});

export { appAuth };
