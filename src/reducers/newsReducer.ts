import { NewsActionsEnum } from '../actions/actionsIndex';
import { News, NewsAction } from '../actions/news/newsActionTypes';

// TODO à déplacer ?
export interface NewsForm {
  titleFr: string;
  titleDe: string;
  contentFr: string;
  contentDe: string;
  displayedDate: string;
  img64: string;
}

export interface NewsState {
  newsList: News[];
  newsDetails: News | null;
  removeBoxId: number | null;
  isRemoveBoxDisplayed: boolean;
  form: NewsForm;
  failureMessages: string[];
}

export const initialState: NewsState = {
  newsList: [],
  newsDetails: null,
  removeBoxId: null,
  isRemoveBoxDisplayed: false,
  form: {
    titleFr: '',
    titleDe: '',
    contentFr: '',
    contentDe: '',
    displayedDate: '',
    img64: '',
  },
  failureMessages: [],
};

const newsReducer = (
  state: NewsState = initialState,
  action: NewsAction,
): NewsState => {
  switch (action.type) {
    case NewsActionsEnum.STORE_NEWS_LIST:
      return {
        ...state,
        newsList: action.newsList,
      };

    case NewsActionsEnum.DISPLAY_REMOVE_BOX:
      return {
        ...state,
        removeBoxId: action.newsId,
        isRemoveBoxDisplayed: true,
      };

    case NewsActionsEnum.HIDE_REMOVE_BOX:
      return {
        ...state,
        removeBoxId: null,
        isRemoveBoxDisplayed: false,
      };

    case NewsActionsEnum.CHANGE_NEWS_INPUT:
      return {
        ...state,
        form: {
          ...state.form,
          [action.identifier]: action.value,
        },
      };

    case NewsActionsEnum.NEWS_FAILURE:
      return {
        ...state,
        failureMessages: action.failureMessages,
      };

    case NewsActionsEnum.STORE_NEWS_DETAILS:
      return {
        ...state,
        newsDetails: action.newsDetails,
      };

    default:
      return state;
  }
};

export default newsReducer;
