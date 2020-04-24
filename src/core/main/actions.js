import {
  createTypes,
  createAction,
  transformNetworkError,
  createSetTypes
} from '../../utils/actions';

import {AxioRequestService} from "../../utils/axioRequest";
import {post} from "../../utils/request";
import {commafy, notEmpty} from "../../utils/helper";

const ZILLOW = createTypes('BOOM_ZILLOW');
const ZILLOW_MANUAL = createSetTypes('BOOM_ZILLOW_MANUAL');
const TOTAL_DATA = createSetTypes('BOOM_TOTAL_DATA');
const NEMPTUNE = createTypes('BOOM_NEMPTUNE');
const PLYMOUTH_HOME = createTypes('BOOM_PLYMOUTH_HOME');
const UNIVERSAL_HOME = createTypes('BOOM_UNIVERSAL_HOME');
const STILLWATER_HOME = createTypes('BOOM_STILLWATER_HOME');
const PLYMOUTH_CONDO = createTypes('BOOM_PLYMOUTH_CONDO');
const UNIVERSAL_CONDO = createTypes('BOOM_UNIVERSAL_CONDO');
const STILLWATER_CONDO = createTypes('BOOM_STILLWATER_CONDO');

const setZillowManual = (data, address) => async dispatch => {
  const action = {
    set: (data) => createAction(ZILLOW_MANUAL.SET, {data, address}),
    clear: () => createAction(ZILLOW.CLEAR, {}),
  };
  try {
    dispatch(action.set(data));
  } catch (e) {
    dispatch(action.clear());
  }
};

const setTotalDate = (data, address) => async dispatch => {
  const action = {
    set: (data) => createAction(TOTAL_DATA.SET, {data, address}),
    clear: () => createAction(TOTAL_DATA.CLEAR, {}),
  };
  try {
    dispatch(action.set(data));
  } catch (e) {
    dispatch(action.clear());
  }
};

const getNeptuneData = (data, address) => async dispatch => {
  const action = {
    do: () => createAction(NEMPTUNE.DO, {}),
    success: response => createAction(NEMPTUNE.SUCCESS, {data: response, address}),
    failed: () => createAction(NEMPTUNE.FAILED, {}),
  };
  try {
    dispatch(action.do());
    const response = await post('api/get_neptuneflood', data);
    if (response.result === 'success') dispatch(action.success(response.data));
    else dispatch(action.failed());
  } catch (e) {
    dispatch(action.failed());
  }
};

const getPlymouthDataHome = (data, address) => async dispatch => {
  const action = {
    do: () => createAction(PLYMOUTH_HOME.DO, {}),
    success: response => createAction(PLYMOUTH_HOME.SUCCESS, {data: response, address}),
    failed: () => createAction(PLYMOUTH_HOME.FAILED, {}),
  };
  try {
    dispatch(action.do());
    data.mode = 0;
    const response = await post('api/get_plymouth_pricing', data);
    if (response.result === 'success') dispatch(action.success(response.data));
    else dispatch(action.failed());
  } catch (e) {
    dispatch(action.failed());
  }
};
const getPlymouthDataCondo = (data, address) => async dispatch => {
  const action = {
    do: () => createAction(PLYMOUTH_CONDO.DO, {}),
    success: response => createAction(PLYMOUTH_CONDO.SUCCESS, {data: response, address}),
    failed: () => createAction(PLYMOUTH_CONDO.FAILED, {}),
  };
  try {
    dispatch(action.do());
    data.mode = 1;
    const response = await post('api/get_plymouth_pricing', data);
    if (response.result === 'success') dispatch(action.success(response.data));
    else dispatch(action.failed());
  } catch (e) {
    dispatch(action.failed());
  }
};
const getUniversalDataHome = (data, address) => async dispatch => {
  const action = {
    do: () => createAction(UNIVERSAL_HOME.DO, {}),
    success: response => createAction(UNIVERSAL_HOME.SUCCESS, {data: response, address}),
    failed: () => createAction(UNIVERSAL_HOME.FAILED, {}),
  };
  try {
    dispatch(action.do());
    data.mode = 0;
    const response = await post('api/get_universal_pricing', data);
    if (response.result === 'success') dispatch(action.success(response.data));
    else dispatch(action.failed());
  } catch (e) {
    dispatch(action.failed());
  }
};
const getUniversalDataCondo = (data, address) => async dispatch => {
  const action = {
    do: () => createAction(UNIVERSAL_CONDO.DO, {}),
    success: response => createAction(UNIVERSAL_CONDO.SUCCESS, {data: response, address}),
    failed: () => createAction(UNIVERSAL_CONDO.FAILED, {}),
  };
  try {
    dispatch(action.do());
    data.mode = 1;
    const response = await post('api/get_universal_pricing', data);
    if (response.result === 'success') dispatch(action.success(response.data));
    else dispatch(action.failed());
  } catch (e) {
    dispatch(action.failed());
  }
};
const getStillwaterDataHome = (data, address) => async dispatch => {
  const action = {
    do: () => createAction(STILLWATER_HOME.DO, {}),
    success: response => createAction(STILLWATER_HOME.SUCCESS, {data: response, address}),
    failed: () => createAction(STILLWATER_HOME.FAILED, {}),
  };
  try {
    dispatch(action.do());
    data.mode = 0;
    const response = await post('api/get_stillwater_pricing', data);
    if (response.result === 'success') dispatch(action.success(response.data));
    else dispatch(action.failed());
  } catch (e) {
    dispatch(action.failed());
  }
};
const getStillwaterDataCondo = (data, address) => async dispatch => {
  const action = {
    do: () => createAction(STILLWATER_CONDO.DO, {}),
    success: response => createAction(STILLWATER_CONDO.SUCCESS, {data: response, address}),
    failed: () => createAction(STILLWATER_CONDO.FAILED, {}),
  };
  try {
    dispatch(action.do());
    data.mode = 1;
    const response = await post('api/get_stillwater_pricing', data);
    if (response.result === 'success') dispatch(action.success(response.data));
    else dispatch(action.failed());
  } catch (e) {
    dispatch(action.failed());
  }
};

const getZillow = (data, address) => async dispatch => {
  const action = {
    do: () => createAction(ZILLOW.DO, {}),
    success: response => createAction(ZILLOW.SUCCESS, {data: response, address}),
    failed: () => createAction(ZILLOW.FAILED, {}),
  };
  try {
    dispatch(action.do());
    const response = await post('api/get_zillow', data);
    if (response["message"]["code"] == 508) {
      const error = {
        result: "error",
        code: 508,
        message: "Exact address not found, please enter manually."
      };
      dispatch(action.failed(transformNetworkError(error)));
      return error;
    } else if (response["result"] === "error") {
      const error = {
        result: "error",
        code: 400,
        message: "An error occurred. Please try again later."
      };
      dispatch(action.failed(transformNetworkError(error)));
      return error;
    }
    if (response["message"]["code"] != 0) {
      return ({
        result: "error",
        code: 400,
        message: "An error occurred. Please try again later."
      });
    } else {
      let zillowData = {square: 0, built_year: 0, estimate: 0};
      const val = response.response.results.result[0];
      const estimate = val['zestimate'][0].amount[0]._ * 1;
      zillowData["square"] = commafy(val['finishedSqFt'][0] * 1);
      zillowData["built_year"] = val['yearBuilt'][0];
      zillowData["estimate"] = notEmpty(estimate) ? commafy(estimate) : 0;

      dispatch(action.success(zillowData));
      return ({
        result: "success",
        code: 200,
        message: "Successfully completed.",
        data: zillowData
      });
    }

  } catch (e) {
    console.log(e);
    dispatch(action.failed(transformNetworkError(e)));
    return ({
      result: "error",
      message: "Something went wrong. Please enter manually."
    });
  }
};


export {
  ZILLOW,
  ZILLOW_MANUAL,
  TOTAL_DATA,
  NEMPTUNE,
  PLYMOUTH_HOME,
  UNIVERSAL_HOME,
  STILLWATER_HOME,
  PLYMOUTH_CONDO,
  UNIVERSAL_CONDO,
  STILLWATER_CONDO,
  getZillow,
  setZillowManual,
  getNeptuneData,
  getPlymouthDataHome,
  getPlymouthDataCondo,
  getUniversalDataHome,
  getUniversalDataCondo,
  getStillwaterDataHome,
  getStillwaterDataCondo,
  setTotalDate
};
