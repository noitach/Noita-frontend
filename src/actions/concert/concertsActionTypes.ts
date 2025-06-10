import { ConcertActionsEnum } from '../actionsIndex';

export interface FetchConcertList {
  type: typeof ConcertActionsEnum.FETCH_CONCERT_LIST;
}

// TODO: penser à déplacer ce type dans un fichier dédié
export interface Concert {
  id: number;
  city: string;
  event_date: string;
  venue: string;
  event_name: string;
  event_url: string;
  created_at: string;
  updated_at: string;
}

export interface StoreConcertList {
  type: typeof ConcertActionsEnum.STORE_CONCERT_LIST;
  concertList: Concert[];
}

export interface DisplayRemoveBox {
  type: typeof ConcertActionsEnum.DISPLAY_REMOVE_BOX;
  concertId: number;
}

export interface HideRemoveBox {
  type: typeof ConcertActionsEnum.HIDE_REMOVE_BOX;
}

export interface ChangeConcertInput {
  type: typeof ConcertActionsEnum.CHANGE_CONCERT_INPUT;
  value: string;
  identifier: 'city' | 'eventDate' | 'venue' | 'eventName' | 'link';
}

export interface PostAddConcertForm {
  type: typeof ConcertActionsEnum.POST_ADD_CONCERT_FORM;
  navigate: (path: '/admin/concerts') => void;
}

export interface PostEditConcertForm {
  type: typeof ConcertActionsEnum.POST_EDIT_CONCERT_FORM;
  navigate: (path: '/admin/concerts') => void;
}

export interface ConcertFailure {
  type: typeof ConcertActionsEnum.CONCERT_FAILURE;
  failureMessages: string[];
}

export interface FetchConcertDetails {
  type: typeof ConcertActionsEnum.FETCH_CONCERT_DETAILS;
  concertId: number;
}

export interface StoreConcertDetails {
  type: typeof ConcertActionsEnum.STORE_CONCERT_DETAILS;
  concertDetails: Concert;
}

export interface DeleteConcert {
  type: typeof ConcertActionsEnum.DELETE_CONCERT;
  concertId: number;
}

export type ConcertAction =
  | FetchConcertList
  | StoreConcertList
  | DisplayRemoveBox
  | HideRemoveBox
  | ChangeConcertInput
  | PostAddConcertForm
  | PostEditConcertForm
  | ConcertFailure
  | FetchConcertDetails
  | StoreConcertDetails
  | DeleteConcert;
