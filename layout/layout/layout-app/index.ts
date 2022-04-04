import { connect } from 'react-redux';

// actions
import { toggleModal, setModalOptions } from 'redactions/modal';
import { toggleTooltip } from 'redactions/tooltip';
import { updateIsLoading } from 'redactions/page';

// component
import LayoutApp from './component';
import { RootState } from 'lib/store';

export default connect(
  (state: RootState) => ({
    modal: state.modal,
  }),
  {
    toggleModal,
    setModalOptions,
    toggleTooltip,
    updateIsLoading,
  },
)(LayoutApp);
