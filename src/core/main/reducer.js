import {
  ZILLOW,
  ZILLOW_MANUAL,
  TOTAL_DATA,
  NEMPTUNE,
  PLYMOUTH_HOME,
  PLYMOUTH_CONDO,
  UNIVERSAL_HOME,
  STILLWATER_HOME,
  UNIVERSAL_CONDO,
  STILLWATER_CONDO
} from './actions';
import {notEmpty} from "../../utils/helper";

const InitialState = {
  isLoading: false,
  status: null,
  zillowData: {
    square: 0,
    estimate: null,
    built_year: null
  },
  total_data: {
    flood: null,
    demo_homeowner_data: {
      plymouth: null,
      universal: null,
      stillwater: null,
    },
    demo_condo_data: {
      plymouth: null,
      universal: null,
      stillwater: null,
    }
  },
  histories: {},
  historyStatus: null
};
const historyTempData = {
  zillowData: null,
  total_data: null
};
const totalTempData = {
  flood: null,
  demo_homeowner_data: {
    plymouth: null,
    universal: null,
    stillwater: null,
  },
  demo_condo_data: {
    plymouth: null,
    universal: null,
    stillwater: null,
  }
};
export default (state = InitialState, action) => {
  let total_data = state.total_data || {};
  let histories = state.histories || {};
  let newState = state;
  switch (action.type) {
    case ZILLOW.DO:
      newState = Object.assign({}, newState, {
        status: ZILLOW.DO,
        zillowData: InitialState.zillowData
      });
      break;

    case ZILLOW.SUCCESS:
      newState = Object.assign({}, newState, {status: ZILLOW.SUCCESS});
      if (!notEmpty(histories[action.address])) histories[action.address] = historyTempData;
      histories[action.address]['zillowData'] = action.data;
      newState = Object.assign({}, newState, {
        zillowData: action.data,
        histories,
        historyStatus: ZILLOW.SUCCESS
      });
      break;

    case ZILLOW.FAILED:
      newState = Object.assign({}, newState, {status: ZILLOW.FAILED});
      break;

    case NEMPTUNE.DO:
      newState = Object.assign({}, newState, {
        status: NEMPTUNE.DO,
        total_data: totalTempData
      });
      break;

    case NEMPTUNE.SUCCESS:
      total_data['flood'] = action.data;
      newState = Object.assign({}, newState, {status: NEMPTUNE.SUCCESS});
      newState = Object.assign({}, newState, {total_data});
      if (!notEmpty(histories[action.address])) histories[action.address] = historyTempData;
      histories[action.address]['total_data'] = total_data;
      newState = Object.assign({}, newState, {total_data, histories, historyStatus: NEMPTUNE.SUCCESS});
      break;

    case NEMPTUNE.FAILED:
      newState = Object.assign({}, newState, {status: NEMPTUNE.FAILED});
      break;

    case PLYMOUTH_HOME.DO:
      newState = Object.assign({}, newState, {status: PLYMOUTH_HOME.DO});
      break;

    case PLYMOUTH_HOME.SUCCESS:
      total_data['demo_homeowner_data']['plymouth'] = action.data;
      newState = Object.assign({}, newState, {status: PLYMOUTH_HOME.SUCCESS});
      if (!notEmpty(histories[action.address])) histories[action.address] = historyTempData;
      histories[action.address]['total_data'] = total_data;
      newState = Object.assign({}, newState, {total_data, histories, historyStatus: PLYMOUTH_HOME.SUCCESS});
      break;

    case PLYMOUTH_HOME.FAILED:
      newState = Object.assign({}, newState, {status: PLYMOUTH_HOME.FAILED});
      break;

    case PLYMOUTH_CONDO.DO:
      newState = Object.assign({}, newState, {status: PLYMOUTH_CONDO.DO});
      break;

    case PLYMOUTH_CONDO.SUCCESS:
      total_data['demo_condo_data']['plymouth'] = action.data;
      newState = Object.assign({}, newState, {status: PLYMOUTH_CONDO.SUCCESS});
      if (!notEmpty(histories[action.address])) histories[action.address] = historyTempData;
      histories[action.address]['total_data'] = total_data;
      newState = Object.assign({}, newState, {total_data, histories, historyStatus: PLYMOUTH_CONDO.SUCCESS});
      break;

    case PLYMOUTH_CONDO.FAILED:
      newState = Object.assign({}, newState, {status: PLYMOUTH_CONDO.FAILED});
      break;

    case UNIVERSAL_HOME.DO:
      newState = Object.assign({}, newState, {status: UNIVERSAL_HOME.DO});
      break;

    case UNIVERSAL_HOME.SUCCESS:
      total_data['demo_homeowner_data']['universal'] = action.data;
      newState = Object.assign({}, newState, {status: UNIVERSAL_HOME.SUCCESS});
      if (!notEmpty(histories[action.address])) histories[action.address] = historyTempData;
      histories[action.address]['total_data'] = total_data;
      newState = Object.assign({}, newState, {total_data, histories, historyStatus: UNIVERSAL_HOME.SUCCESS});
      break;

    case UNIVERSAL_HOME.FAILED:
      newState = Object.assign({}, newState, {status: UNIVERSAL_HOME.FAILED});
      break;

    case UNIVERSAL_CONDO.DO:
      newState = Object.assign({}, newState, {status: UNIVERSAL_CONDO.DO});
      break;

    case UNIVERSAL_CONDO.SUCCESS:
      total_data['demo_condo_data']['universal'] = action.data;
      newState = Object.assign({}, newState, {status: UNIVERSAL_CONDO.SUCCESS});
      if (!notEmpty(histories[action.address])) histories[action.address] = historyTempData;
      histories[action.address]['total_data'] = total_data;
      newState = Object.assign({}, newState, {total_data, histories, historyStatus: UNIVERSAL_CONDO.SUCCESS});
      break;

    case UNIVERSAL_CONDO.FAILED:
      newState = Object.assign({}, newState, {status: UNIVERSAL_CONDO.FAILED});
      break;

    case STILLWATER_HOME.DO:
      newState = Object.assign({}, newState, {status: UNIVERSAL_HOME.DO});
      break;

    case STILLWATER_HOME.SUCCESS:
      total_data['demo_homeowner_data']['stillwater'] = action.data;
      newState = Object.assign({}, newState, {status: UNIVERSAL_HOME.SUCCESS});
      if (!notEmpty(histories[action.address])) histories[action.address] = historyTempData;
      histories[action.address]['total_data'] = total_data;
      newState = Object.assign({}, newState, {total_data, histories, historyStatus: STILLWATER_HOME.SUCCESS});
      break;

    case STILLWATER_HOME.FAILED:
      newState = Object.assign({}, newState, {status: UNIVERSAL_HOME.FAILED});
      break;

    case STILLWATER_CONDO.DO:
      newState = Object.assign({}, newState, {status: UNIVERSAL_CONDO.DO});
      break;

    case STILLWATER_CONDO.SUCCESS:
      total_data['demo_condo_data']['stillwater'] = action.data;
      newState = Object.assign({}, newState, {status: UNIVERSAL_CONDO.SUCCESS});
      if (!notEmpty(histories[action.address])) histories[action.address] = historyTempData;
      histories[action.address]['total_data'] = total_data;
      newState = Object.assign({}, newState, {total_data, histories, historyStatus: STILLWATER_CONDO.SUCCESS});
      break;

    case STILLWATER_CONDO.FAILED:
      newState = Object.assign({}, newState, {status: UNIVERSAL_CONDO.FAILED});
      break;

    case ZILLOW_MANUAL.CLEAR:
      newState = Object.assign({}, newState, {zillowData: null});
      break;

    case ZILLOW_MANUAL.SET:
      if (!notEmpty(histories[action.address])) histories[action.address] = historyTempData;
      histories[action.address]['zillowData'] = action.data;
      newState = Object.assign({}, newState, {zillowData: action.data, histories, historyStatus: ZILLOW_MANUAL.SUCCESS});
      break;

    case TOTAL_DATA.CLEAR:
      newState = Object.assign({}, newState, {total_data: InitialState.total_data});
      break;

    case TOTAL_DATA.SET:
      total_data = action.data;
      newState = Object.assign({}, newState, {total_data});
      break;
  }
  return newState;
};
