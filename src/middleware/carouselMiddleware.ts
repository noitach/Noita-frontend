// Actions
import {
  storePictureList,
  carouselFailure,
  fetchCarouselPictures,
} from '../actions/carousel/carouselActions';
import { logout, loginFailure } from '../actions/login/loginActions';

// Types
import { Dispatch } from 'redux';
import { AppStore } from '../store';
import { CarouselActionsEnum } from '../actions/actionsIndex';
import {
  CarouselAction,
  Picture,
} from '../actions/carousel/carouselActionTypes';
import { ErrorResponse } from './middlewareTypes';

const carouselMiddleware =
  (store: AppStore) =>
    (next: Dispatch<CarouselAction>) =>
      async (action: CarouselAction) => {
        switch (action.type) {
          case CarouselActionsEnum.FETCH_CAROUSEL_PICTURES: {
            try {
              const response: Response = await fetch(`/api/carousel`);

              if (!response.ok) {
                const error: ErrorResponse = await response.json();
                throw new Error(error.errors.join(', '));
              }
              const responseData = await response.json();
              // Handle both direct array and object with data property
              const data: Picture[] = Array.isArray(responseData) ? responseData : responseData.data || [];
              store.dispatch(storePictureList(data));
            } catch (error: unknown) {
              console.error(error);
            }
            break;
          }

          case CarouselActionsEnum.ADD_PICTURE: {
            try {
              const user_id: number | null = store.getState().login.loggedId;
              const token: string = store.getState().login.token;
              const picture64: string = store.getState().carousel.pictureInput;

              const response: Response = await fetch(
                `/api/carousel?user_id=${user_id}`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    picture64,
                  }),
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
                store.dispatch(carouselFailure(error.errors));
                throw new Error(error.errors.join(', '));
              }
              store.dispatch(fetchCarouselPictures());
            } catch (error: unknown) {
              console.error(error);
            }
            break;
          }

          case CarouselActionsEnum.DELETE_PICTURE: {
            try {
              const user_id: number | null = store.getState().login.loggedId;
              const token: string = store.getState().login.token;
              const picture_id: number = action.pictureId;

              const response: Response = await fetch(
                `/api/carousel/${picture_id}?user_id=${user_id}`,
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
                store.dispatch(carouselFailure(error.errors));
                setTimeout(() => {
                  store.dispatch(carouselFailure([]));
                }, 5000);

                throw new Error(error.errors.join(', '));
              }
              store.dispatch(fetchCarouselPictures());
            } catch (error: unknown) {
              console.error(error);
            }
            break;
          }

          case CarouselActionsEnum.UPDATE_PICTURE: {
            try {
              const user_id: number | null = store.getState().login.loggedId;
              const token: string = store.getState().login.token;
              const picture64: string = store.getState().carousel.pictureInput;
              const pictureId: number = action.pictureId;

              const response: Response = await fetch(
                `/api/carousel/${pictureId}?user_id=${user_id}`,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    picture64,
                  }),
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
                store.dispatch(carouselFailure(error.errors));
                throw new Error(error.errors.join(', '));
              }
              // We refresh the browser page
              window.location.reload();
            } catch (error: unknown) {
              console.error(error);
            }
            break;
          }

          case CarouselActionsEnum.CHANGE_POSITION: {
            try {
              const user_id: number | null = store.getState().login.loggedId;
              const token: string = store.getState().login.token;
              const pictureId: number = action.pictureId;
              const direction: 'left' | 'right' = action.direction;

              const response: Response = await fetch(
                `/api/carousel/position/${pictureId}?user_id=${user_id}`,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    direction,
                  }),
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
                store.dispatch(carouselFailure(error.errors));
                throw new Error(error.errors.join(', '));
              }
              store.dispatch(fetchCarouselPictures());
            } catch (error: unknown) {
              console.error(error);
            }
            break;
          }
          default:
        }
        return next(action);
      };

export default carouselMiddleware;
