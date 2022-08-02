import { useEffect, useMemo } from 'react';
import classnames from 'classnames';

import DatasetList from './list';
import ExploreDatasetsActions from './explore-datasets-actions';
import ExploreSearch from '../explore-datasets-search';

interface ExploreDatasetsProps {
  datasets: {
    selected: string;
    list: Record<string, any>;
    loading: boolean;
  };
  filters: any;
  fetchCountries: () => void;
  advOpen: boolean;
}

export default function ExploreDatasets(props: ExploreDatasetsProps) {
  const {
    datasets: {
      selected,
      list,
      loading,
    },
    filters,
    fetchCountries,
    advOpen,
  } = props;

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const classValue = classnames({
    'c-explore-datasets': true,
    '-hidden': !!selected,
  });

  const relevantList = useMemo(
    () =>
      list.filter(({ layer }) =>
        layer.some(
          ({ applicationConfig: { value_chain, emission_scenario } }) =>
            (!value_chain ||
              !filters.value_chains.length ||
              filters.value_chains.includes(value_chain)) &&
            (!emission_scenario ||
              emission_scenario === filters.emission_scenario)
        )
      ),
    [filters.emission_scenario, filters.value_chains, list]
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