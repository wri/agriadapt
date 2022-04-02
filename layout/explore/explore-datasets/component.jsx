import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
// import Link from "next/link";
import classnames from 'classnames';

// utils
// import { logEvent } from "utils/analytics";

// components
import Paginator from "components/ui/Paginator";
// import Icon from "components/ui/icon";
// import { TOPICS } from 'layout/explore/explore-topics/constants';
import DatasetList from "./list";
import ExploreDatasetsActions from "./explore-datasets-actions";
import ExploreSearch from '../explore-datasets-search';

export default function ExploreDatasets(props) {
  const {
    datasets: { selected, list, total, limit, page, loading },
    setDatasetsPage,
    fetchDatasets,
    advOpen,
  } = props;

  const fetchDatasetsPerPage = useCallback(
    (_page) => {
      setDatasetsPage(_page);
      fetchDatasets();
    },
    [setDatasetsPage, fetchDatasets]
  );

  useEffect(() => {
    fetchDatasetsPerPage(1);
  }, [fetchDatasetsPerPage]);

  const classValue = classnames({
    "c-explore-datasets": true,
    "-hidden": selected,
  });

  return (
    <div className={classValue}>
      <div className="explore-datasets-search">
        <ExploreSearch />
      </div>

      {!list.length && !loading && (
        <div className="request-data-container">
          <div className="request-data-text">
            Oops! We couldn&#39;t find data for your search...
          </div>
          <a
            className="c-button -primary"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfXsPGQxM6p8KloU920t5Tfhx9FYFOq8-Rjml07UDH9EvsI1w/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            Request data
          </a>
        </div>
      )}

      {!advOpen && (
        <>
          <DatasetList
            loading={loading}
            numberOfPlaceholders={20}
            list={list}
            actions={<ExploreDatasetsActions />}
          />
          {!!list.length && total > limit && (
            <Paginator
              options={{
                page,
                limit,
                size: total,
              }}
              onChange={(p) => {
                // ------- Scroll to the top of the list -------------------
                const sidebarContent =
                  document.querySelector('.sidebar-content');
                if (window.scrollTo) {
                  window.scrollTo(0, 0);
                }
                if (sidebarContent && sidebarContent.scrollTo) {
                  sidebarContent.scrollTo(0, 0);
                }
                // ------------------------------------------------

                fetchDatasetsPerPage(p);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

ExploreDatasets.propTypes = {
  datasets: PropTypes.shape({
    selected: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  search: PropTypes.string.isRequired,
  fetchDatasets: PropTypes.func.isRequired,
  setDatasetsPage: PropTypes.func.isRequired,
  toggleFiltersSelected: PropTypes.func.isRequired,
  resetFiltersSort: PropTypes.func.isRequired,
  setFiltersSearch: PropTypes.func.isRequired,
};
