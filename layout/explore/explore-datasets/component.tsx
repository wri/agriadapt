import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
// import Link from "next/link";
import classnames from 'classnames';

// utils
// import { logEvent } from "utils/analytics";

// components
// import Paginator from 'components/ui/Paginator';
// import Icon from "components/ui/icon";
// import { TOPICS } from 'layout/explore/explore-topics/constants';
import DatasetList from './list';
import ExploreDatasetsActions from './explore-datasets-actions';
import ExploreSearch from '../explore-datasets-search';
// import { APILayerSpec } from 'types/layer';

interface ExploreDatasetsProps {
  datasets: {
    selected: any;
    list: any;
    loading: boolean;
  }
  filters: any;
  fetchCountries: () => void;
  advOpen: boolean
}

export default function ExploreDatasets(props: ExploreDatasetsProps) {
  const {
    datasets: {
      selected,
      list,
      // total,
      // limit,
      // page,
      loading,
      // filtered: filteredDatasets,
    },
    filters,
    // setDatasetsPage,
    // fetchDatasets,
    fetchCountries,
    advOpen,
    // setFilteredDatasets,
  } = props;

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const classValue = classnames({
    'c-explore-datasets': true,
    '-hidden': selected,
  });

  const relevantList = useMemo(
    () =>
      list.filter(({ layer }) =>
        layer.some(
          ({ applicationConfig: { emission_scenario } }) =>
            !emission_scenario ||
            emission_scenario === filters.emission_scenario.value
        )
      ),
    [filters.emission_scenario.value, list]
  );

  return (
    <div className={classValue}>
      <div className="explore-datasets-search">
        <ExploreSearch />
      </div>

      {!list.length && !loading && !advOpen && (
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
            numberOfPlaceholders={10}
            list={relevantList}
            actions={<ExploreDatasetsActions />}
          />
        </>
      )}
    </div>
  );
}

ExploreDatasets.propTypes = {
  datasets: PropTypes.shape({
    // selected: PropTypes.string.isRequired,
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
  // selectedTags: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  // search: PropTypes.string.isRequired,
  fetchDatasets: PropTypes.func.isRequired,
  setDatasetsPage: PropTypes.func.isRequired,
  // toggleFiltersSelected: PropTypes.func.isRequired,
  // resetFiltersSort: PropTypes.func.isRequired,
  // setFiltersSearch: PropTypes.func.isRequired,
};
