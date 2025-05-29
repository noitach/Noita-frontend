// Actions
import {
  storeConcertList,
  concertFailure,
  storeConcertDetails,
  fetchConcertList,
} from '../actions/concert/concertsActions';
import { logout, loginFailure } from '../actions/login/loginActions';

// Types
import { Dispatch } from 'redux';
import { AppStore } from '../store';
import { ConcertActionsEnum } from '../actions/actionsIndex';
import { ConcertAction, Concert } from '../actions/concert/concertsActionTypes';
import { ErrorResponse } from './middlewareTypes';
import { ConcertForm } from '../reducers/concertsReducer';

const concertsMiddleware =
  (store: AppStore) =>
  (next: Dispatch<ConcertAction>) =>
  async (action: ConcertAction) => {
    switch (action.type) {
      case ConcertActionsEnum.FETCH_CONCERT_LIST: {
        try {
          const response: Response = await fetch(`/api/concerts`);

          if (!response.ok) {
            const error: ErrorResponse = await response.json();
            throw new Error(error.errors.join(', '));
          }
          const data: Concert[] = await response.json();
          store.dispatch(storeConcertList(data));
        } catch (error: unknown) {
          console.error(error);
        }
        break;
      }

      case ConcertActionsEnum.FETCH_CONCERT_DETAILS: {
        try {
          const user_id: number | null = store.getState().login.loggedId;
          const token: string = store.getState().login.token;
          const concert_id: number = action.concertId;

          const response: Response = await fetch(
            `/api/concerts/${concert_id}?user_id=${user_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (!response.ok) {
            const error: ErrorResponse = await response.json();
            if (error.status === 401) {
              store.dispatch(logout());
              store.dispatch(
                loginFailure(['The session has expired, please log in again.']),
              );
            }
            throw new Error(error.errors.join(', '));
          }
          const data: Concert = await response.json();
          store.dispatch(storeConcertDetails(data));
        } catch (error: unknown) {
          console.error(error);
        }
        break;
      }

      case ConcertActionsEnum.POST_ADD_CONCERT_FORM: {
        try {
          const user_id: number | null = store.getState().login.loggedId;
          const token: string = store.getState().login.token;
          const form: ConcertForm = store.getState().concerts.form;

          const response: Response = await fetch(
            `/api/concerts?user_id=${user_id}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(form),
            },
          );
          if (!response.ok) {
            const error: ErrorResponse = await response.json();
            if (error.status === 401) {
              store.dispatch(logout());
              store.dispatch(
                loginFailure(['The session has expired, please log in again.']),
              );
              throw new Error(error.errors.join(', '));
            }
            store.dispatch(concertFailure(error.errors));
            throw new Error(error.errors.join(', '));
          }
          action.navigate('/admin/concerts');
        } catch (error: unknown) {
          console.error(error);
        }
        break;
      }

      case ConcertActionsEnum.POST_EDIT_CONCERT_FORM: {
        try {
          const user_id: number | null = store.getState().login.loggedId;
          const token: string = store.getState().login.token;
          const form: ConcertForm = store.getState().concerts.form;
          const concert_id: number | undefined =
            store.getState().concerts.concertDetails?.id;

          const response: Response = await fetch(
            `/api/concerts/${concert_id}?user_id=${user_id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(form),
            },
          );
          if (!response.ok) {
            const error: ErrorResponse = await response.json();
            if (error.status === 401) {
              store.dispatch(logout());
              store.dispatch(
                loginFailure(['The session has expired, please log in again.']),
              );
              throw new Error(error.errors.join(', '));
            }
            store.dispatch(concertFailure(error.errors));
            throw new Error(error.errors.join(', '));
          }
          action.navigate('/admin/concerts');
        } catch (error: unknown) {
          console.error(error);
        }
        break;
      }

      case ConcertActionsEnum.DELETE_CONCERT: {
        try {
          const user_id: number | null = store.getState().login.loggedId;
          const token: string = store.getState().login.token;
          const concert_id: number = action.concertId;

          const response: Response = await fetch(
            `/api/concerts/${concert_id}?user_id=${user_id}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          if (!response.ok) {
            const error: ErrorResponse = await response.json();
            if (error.status === 401) {
              store.dispatch(logout());
              store.dispatch(
                loginFailure(['The session has expired, please log in again.']),
              );
              throw new Error(error.errors.join(', '));
            }
            store.dispatch(concertFailure(error.errors));
            throw new Error(error.errors.join(', '));
          }
          store.dispatch(fetchConcertList());
        } catch (error: unknown) {
          console.error(error);
        }
        break;
      }

      default:
    }
    return next(action);
  };

export default concertsMiddleware;
