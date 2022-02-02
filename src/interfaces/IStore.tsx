import { ISongState } from './ISongState';

export interface IStore {
  ui: { isLoading: boolean };
  songDetails: ISongState;
}
