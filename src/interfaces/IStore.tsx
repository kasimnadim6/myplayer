import { ISongState } from "./ISongState";

export interface IStore {
  ui: { isLoading: boolean; isError: boolean };
  songDetails: ISongState;
}
