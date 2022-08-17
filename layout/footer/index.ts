import { RootState } from 'lib/store';
import { connect } from 'react-redux';
import Footer from './component';
import { actions } from './reducers';

export default connect(
  (state: RootState) => ({
    showTermsModal: state.footer.showTermsModal,
    showPrivacyModal: state.footer.showPrivacyModal,
  }),
  actions
)(Footer);