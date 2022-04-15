import PropTypes from 'prop-types';

// components
import Icon from 'components/ui/icon';

export default function ExploreDetailHeader({
  // dataset,
  setSelectedDataset,
  // userIsLoggedIn,
  isSidebarOpen,
}) {

  return (
    <div
      className="c-explore-detail-header"
      style={{
        ...(!isSidebarOpen && { position: 'absolute' }),
      }}
    >
      <button
        className="c-btn -secondary -compressed all-datasets-button"
        onClick={() => setSelectedDataset(null)}
      >
        <Icon className="-small" name="icon-arrow-left-2" />
        <span>All Datasets</span>
      </button>
    </div>
  );
}

ExploreDetailHeader.propTypes = {
  dataset: PropTypes.shape({
    metadata: PropTypes.arrayOf(
      PropTypes.shape({
        info: PropTypes.shape({
          name: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
  userIsLoggedIn: PropTypes.bool.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  setSelectedDataset: PropTypes.func.isRequired,
};
