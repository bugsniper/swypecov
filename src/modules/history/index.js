import {compose, lifecycle, withState} from 'recompose';
import {connect} from "react-redux";
import mainCore from "../../core/main";

import HistoryView from './HistoryView';

export default compose(
  connect(
    state => ({
      historyData: mainCore.selectors.historyData(state),
    }),
    dispatch => ({
      setZillowManual: (data, address) => dispatch(mainCore.actions.setZillowManual(data, address)),
      setTotalDate: (data, address) => dispatch(mainCore.actions.setTotalDate(data, address)),
    }),
  ),
  lifecycle({
  }),
)(
  HistoryView,
);
