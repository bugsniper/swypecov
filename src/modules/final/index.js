import {compose, lifecycle, withState} from 'recompose';

import {connect} from 'react-redux';
import FinalView from './FinalView';
import mainCore from "../../core/main";

export default compose(
  connect(
    state => ({
      zillowData: mainCore.selectors.zillowData(state),
    }),
    dispatch => ({}),
  ),
  lifecycle({
  }),
)(
  FinalView,
);
