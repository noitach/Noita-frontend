import { NewsActionsEnum } from '../actionsIndex';
import {
  FetchNewsList,
  News,
  StoreNewsList,
  DisplayRemoveBox,
  HideRemoveBox,
  ChangeNewsInput,
  PostAddNewsForm,
  PostEditNewsForm,
  NewsFailure,
  FetchNewsDetails,
  StoreNewsDetails,
  DeleteNews,
} from './newsActionTypes';
import { NavigateFunction } from 'react-router';

export const fetchNewsList = (): FetchNewsList => {
  return {
    type: NewsActionsEnum.FETCH_NEWS_LIST,
  };
};

export const storeNewsList = (newsList: News[]): StoreNewsList => {
  return {
    type: NewsActionsEnum.STORE_NEWS_LIST,
    newsList,
  };
};

export const displayRemoveBox = (newsId: number): DisplayRemoveBox => {
  return {
    type: NewsActionsEnum.DISPLAY_REMOVE_BOX,
    newsId,
  };
};

export const hideRemoveBox = (): HideRemoveBox => {
  return {
    type: NewsActionsEnum.HIDE_REMOVE_BOX,
  };
};

export const changeNewsInput = (
  value: string,
  identifier:
    | 'titleFr'
    | 'titleDe'
    | 'contentFr'
    | 'contentDe'
    | 'displayedDate'
    | 'img64',
): ChangeNewsInput => {
  return {
    type: NewsActionsEnum.CHANGE_NEWS_INPUT,
    value,
    identifier,
  };
};

export const postAddNewsForm = (
  navigate: NavigateFunction,
): PostAddNewsForm => {
  return {
    type: NewsActionsEnum.POST_ADD_NEWS_FORM,
    navigate,
  };
};

export const postEditNewsForm = (
  navigate: NavigateFunction,
): PostEditNewsForm => {
  return {
    type: NewsActionsEnum.POST_EDIT_NEWS_FORM,
    navigate,
  };
};

export const newsFailure = (failureMessages: string[]): NewsFailure => {
  return {
    type: NewsActionsEnum.NEWS_FAILURE,
    failureMessages,
  };
};

export const fetchNewsDetails = (newsId: number): FetchNewsDetails => {
  return {
    type: NewsActionsEnum.FETCH_NEWS_DETAILS,
    newsId,
  };
};

export const storeNewsDetails = (newsDetails: News): StoreNewsDetails => {
  return {
    type: NewsActionsEnum.STORE_NEWS_DETAILS,
    newsDetails,
  };
};

export const deleteNews = (newsId: number): DeleteNews => {
  return {
    type: NewsActionsEnum.DELETE_NEWS,
    newsId,
  };
};
