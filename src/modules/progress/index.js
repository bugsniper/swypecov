import {compose, lifecycle, withState} from 'recompose';
import {connect} from 'react-redux';
import mainCore from "../../core/main";
import ProgressScreen from './ProgressView';

export default compose(
  connect(
    state => ({
      zillowData: mainCore.selectors.zillowData(state),
    }),
    dispatch => ({
    }),
  ),
  lifecycle({
  }),
)(
  ProgressScreen,
);
