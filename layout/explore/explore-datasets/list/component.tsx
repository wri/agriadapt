import React, { useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// Components
import Spinner from 'components/ui/Spinner';
import DatasetListItem from './list-item';

interface DatasetListProps {
  list: [];
  actions: any;
  tags?: any;
  expandedChart?: boolean;
  loading?: boolean;
  numberOfPlaceholders?: number;
  hasMoreDatasets: boolean;
  fetchDatasets: () => void;
  page: number;
  setDatasetsPage: (page: number) => void;
}

const DatasetList = ({
  list,
  actions,
  tags = [],
  expandedChart = false,
  numberOfPlaceholders = 4,
  hasMoreDatasets,
  loading = false,
  fetchDatasets,
  page,
  setDatasetsPage,
}: DatasetListProps) => {
  const placeholders = [];

  for (let i = 0; i < numberOfPlaceholders; i++) {
    placeholders.push(i);
  }

  const fetchNextDatasets = useCallback(() => {
    setDatasetsPage(page + 1);
    fetchDatasets();
  }, [fetchDatasets, page, setDatasetsPage]);

  useEffect(() => {
    setDatasetsPage(1);
    fetchDatasets();
  }, [fetchDatasets, setDatasetsPage]);

  return (
    <div className="c-explore-dataset-list">
      <Spinner isLoading={loading} className="-light" />
      <div className="l-row row">
        <InfiniteScroll
          dataLength={list.length}
          next={fetchNextDatasets}
          hasMore={hasMoreDatasets}
          loader={<Spinner isLoading={loading} className="-light" />}
          scrollableTarget="explore-sidebar"
        >
          {/* {!loading && */}
          {list.map((dataset: any) => (
            <div className="column small-12" key={dataset.id}>
              <DatasetListItem
                dataset={dataset}
                widget={
                  dataset.widget ? dataset.widget.find((w) => w.default) : null
                }
                layer={
                  dataset.layer ? dataset.layer.find((l) => l.default) : null
                }
                metadata={
                  dataset.metadata && Array.isArray(dataset.metadata)
                    ? dataset.metadata[0]
                    : dataset.metadata
                }
                actions={actions}
                tags={tags}
                expandedChart={expandedChart}
              />
            </div>
          ))}
        </InfiniteScroll>
        {loading &&
          placeholders.map((e) => (
            <div className="column small-12" key={`dataset-placeholder-${e}`}>
              <div className="dataset-placeholder" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DatasetList;
