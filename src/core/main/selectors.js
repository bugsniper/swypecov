import type ReduxStore from "../";
import * as constants from './constants';
import {notEmpty} from "../../utils/helper";

export const zillowData = (state: ReduxStore): Object => {
  return (notEmpty(state[constants.NAME].zillowData)) ? state[constants.NAME].zillowData : null;
};

export const totalData = (state: ReduxStore): Object => {
  return (notEmpty(state[constants.NAME].total_data)) ? state[constants.NAME].total_data : null;
};
export const historyData = (state: ReduxStore): Object => {
  return (notEmpty(state[constants.NAME].histories)) ? state[constants.NAME].histories : null;
};

export const _status = (state: ReduxStore): Object => {
  return state[constants.NAME].status;
};

export const historyStatus = (state: ReduxStore): Object => {
  return state[constants.NAME].historyStatus;
};

export const _loading = (state: ReduxStore): Object => {
  return state[constants.NAME].isLoading;
};
