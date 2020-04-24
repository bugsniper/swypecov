import { compose, lifecycle } from 'recompose';
import {connect} from 'react-redux';
import mainCore from "../../core/main";

import HomeScreen from './HomeView';

export default compose(
  connect(
    state => ({
      isLoading: mainCore.selectors._loading(state),
      zillowData: mainCore.selectors.zillowData(state),
    }),
    dispatch => ({
      getZillow: async (data, address) => dispatch(mainCore.actions.getZillow(data, address)),
      setZillowManual: (data, address) => dispatch(mainCore.actions.setZillowManual(data, address)),
      getNeptuneData: (data, address) => dispatch(mainCore.actions.getNeptuneData(data, address)),
      getPlymouthDataHome: (data, address) => dispatch(mainCore.actions.getPlymouthDataHome(data, address)),
      getPlymouthDataCondo: (data, address) => dispatch(mainCore.actions.getPlymouthDataCondo(data, address)),
      getUniversalDataHome: (data, address) => dispatch(mainCore.actions.getUniversalDataHome(data, address)),
      getUniversalDataCondo: (data, address) => dispatch(mainCore.actions.getUniversalDataCondo(data, address)),
      getStillwaterDataHome: (data, address) => dispatch(mainCore.actions.getStillwaterDataHome(data, address)),
      getStillwaterDataCondo: (data, address) => dispatch(mainCore.actions.getStillwaterDataCondo(data, address)),
    }),
  ),
  lifecycle({
  }),
)(
  HomeScreen,
);

