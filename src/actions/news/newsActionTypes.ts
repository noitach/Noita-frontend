import { NewsActionsEnum } from '../actionsIndex';

export interface FetchNewsList {
  type: typeof NewsActionsEnum.FETCH_NEWS_LIST;
}

export interface News {
  id: number;
  title_fr: string;
  title_de: string;
  content_fr: string;
  content_de: string;
  displayed_date: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface StoreNewsList {
  type: typeof NewsActionsEnum.STORE_NEWS_LIST;
  newsList: News[];
}

export interface DisplayRemoveBox {
  type: typeof NewsActionsEnum.DISPLAY_REMOVE_BOX;
  newsId: number;
}

export interface HideRemoveBox {
  type: typeof NewsActionsEnum.HIDE_REMOVE_BOX;
}

export interface ChangeNewsInput {
  type: typeof NewsActionsEnum.CHANGE_NEWS_INPUT;
  value: string;
  identifier:
    | 'titleFr'
    | 'titleDe'
    | 'contentFr'
    | 'contentDe'
    | 'displayedDate'
    | 'img64';
}

export interface PostAddNewsForm {
  type: typeof NewsActionsEnum.POST_ADD_NEWS_FORM;
  navigate: (path: '/admin/news') => void;
}

export interface PostEditNewsForm {
  type: typeof NewsActionsEnum.POST_EDIT_NEWS_FORM;
  navigate: (path: '/admin/news') => void;
}

export interface NewsFailure {
  type: typeof NewsActionsEnum.NEWS_FAILURE;
  failureMessages: string[];
}

export interface FetchNewsDetails {
  type: typeof NewsActionsEnum.FETCH_NEWS_DETAILS;
  newsId: number;
}

export interface StoreNewsDetails {
  type: typeof NewsActionsEnum.STORE_NEWS_DETAILS;
  newsDetails: News;
}

export interface DeleteNews {
  type: typeof NewsActionsEnum.DELETE_NEWS;
  newsId: number;
}

export type NewsAction =
  | FetchNewsList
  | StoreNewsList
  | DisplayRemoveBox
  | HideRemoveBox
  | ChangeNewsInput
  | PostAddNewsForm
  | PostEditNewsForm
  | NewsFailure
  | FetchNewsDetails
  | StoreNewsDetails
  | DeleteNews;
