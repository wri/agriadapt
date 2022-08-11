// import { RootState } from "lib/store";
import { connect } from 'react-redux';

// actions
import { toggleModal, setModalOptions } from 'redactions/modal';
import { toggleTooltip } from 'redactions/tooltip';

// component
import WidgetCard from './component';

export default connect(() => ({ user: null }), {
  toggleModal,
  setModalOptions,
  toggleTooltip,
})(WidgetCard);
