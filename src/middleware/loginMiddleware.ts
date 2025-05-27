// Actions
import { loginSuccess, loginFailure } from '../actions/login/loginActions';

// Types
import { Dispatch } from 'redux';
import { LoginActionsEnum } from '../actions/actionsIndex';
import { LoginAction } from '../actions/login/loginActionTypes';
import { AppStore } from '../store';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


const loginMiddleware =
  (store: AppStore) =>
    (next: Dispatch<LoginAction>) =>
      async (action: LoginAction) => {
        switch (action.type) {
          case LoginActionsEnum.POST_LOGIN_FORM: {
            try {
              const email = store.getState().login.usernameInput;
              const password = store.getState().login.passwordInput;
              const userCredential = await signInWithEmailAndPassword(auth, email, password);
              const user = userCredential.user;
              const token = await user.getIdToken();
              store.dispatch(loginSuccess(1, token));
            } catch (error: any) {
              const errorMessage = error.message ? [error.message] : ['Login failed.'];
              store.dispatch(loginFailure(errorMessage));
            }
            break;
          }
          default:
        }
        return next(action);
      };

export default loginMiddleware;
