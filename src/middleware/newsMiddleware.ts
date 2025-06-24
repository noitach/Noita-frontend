// Actions
import {
  storeNewsList,
  newsFailure,
  storeNewsDetails,
  fetchNewsList,
} from '../actions/news/newsActions';
import { logout, loginFailure } from '../actions/login/loginActions';

// Types
import { Dispatch } from 'redux';
import { AppStore } from '../store';
import { NewsActionsEnum } from '../actions/actionsIndex';
import { NewsAction, News } from '../actions/news/newsActionTypes';
import { ErrorResponse } from './middlewareTypes';
import { NewsForm } from '../reducers/newsReducer';

const newsMiddleware =
  (store: AppStore) =>
  (next: Dispatch<NewsAction>) =>
  async (action: NewsAction) => {
    switch (action.type) {
      case NewsActionsEnum.FETCH_NEWS_LIST: {
        try {
          const response: Response = await fetch(`/api/posts`);

          if (!response.ok) {
            const error: ErrorResponse = await response.json();
            throw new Error(error.errors.join(', '));
          }
          const responseData = await response.json();
          // Handle both direct array and object with data property
          const data: News[] = Array.isArray(responseData)
            ? responseData
            : responseData.data || [];
          store.dispatch(storeNewsList(data));
        } catch (error: unknown) {
          console.error(error);
        }
        break;
      }

      case NewsActionsEnum.FETCH_NEWS_DETAILS: {
        try {
          const user_id: number | null = store.getState().login.loggedId;
          const token: string = store.getState().login.token;
          const news_id: number = action.newsId;

          const response: Response = await fetch(
            `/api/posts/${news_id}?user_id=${user_id}`,
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
          const responseData = await response.json();
          // Handle both direct news object and object with data property
          const data: News = responseData.data
            ? responseData.data
            : responseData;
          store.dispatch(storeNewsDetails(data));
        } catch (error: unknown) {
          console.error(error);
        }
        break;
      }

      case NewsActionsEnum.POST_ADD_NEWS_FORM: {
        try {
          const user_id: number | null = store.getState().login.loggedId;
          const token: string = store.getState().login.token;
          const form: NewsForm = store.getState().news.form;

          const requestBody = {
            title_fr: form.titleFr,
            title_de: form.titleDe,
            content_fr: form.contentFr,
            content_de: form.contentDe,
            img64: form.img64,
          };

          const response: Response = await fetch(
            `/api/posts?user_id=${user_id}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(requestBody),
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
            store.dispatch(newsFailure(error.errors));
            throw new Error(error.errors.join(', '));
          }
          action.navigate('/admin/news');
        } catch (error: unknown) {
          console.error(error);
        }
        break;
      }

      case NewsActionsEnum.POST_EDIT_NEWS_FORM: {
        try {
          const user_id: number | null = store.getState().login.loggedId;
          const token: string = store.getState().login.token;
          const form: NewsForm = store.getState().news.form;
          const news_id: number | undefined =
            store.getState().news.newsDetails?.id;

          // Validate that news_id exists before making the request
          if (!news_id) {
            const errorMessage = 'News ID is missing. Cannot update news.';
            console.error(errorMessage);
            store.dispatch(newsFailure([errorMessage]));
            return next(action);
          }

          const requestBody = {
            title_fr: form.titleFr,
            title_de: form.titleDe,
            content_fr: form.contentFr,
            content_de: form.contentDe,
            img64: form.img64,
          };

          const response: Response = await fetch(
            `/api/posts/${news_id}?user_id=${user_id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(requestBody),
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
            store.dispatch(newsFailure(error.errors));
            throw new Error(error.errors.join(', '));
          }
          action.navigate('/admin/news');
        } catch (error: unknown) {
          console.error(error);
        }
        break;
      }

      case NewsActionsEnum.DELETE_NEWS: {
        try {
          const user_id: number | null = store.getState().login.loggedId;
          const token: string = store.getState().login.token;
          const news_id: number = action.newsId;

          const response: Response = await fetch(
            `/api/posts/${news_id}?user_id=${user_id}`,
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
            store.dispatch(newsFailure(error.errors));
            throw new Error(error.errors.join(', '));
          }
          store.dispatch(fetchNewsList());
        } catch (error: unknown) {
          console.error(error);
        }
        break;
      }

      default:
    }
    return next(action);
  };

export default newsMiddleware;
