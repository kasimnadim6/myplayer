import { ISongState } from './ISongState';

export interface IStore {
  ui: any;
  songDetails: ISongState;
}
