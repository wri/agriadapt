import {
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

// actions
import {
  setFilters, setPaginationPage, setOrderDirection, getDatasetsByTab,
} from 'redactions/admin/datasets';

// components
import MyRWDatasetsMy from './my-rw-datasets-component';

const MyRWDatasetsMyContainer = (props) => {
  const {
    setPaginationPage: setPaginationPageAction,
    setFilters: setFiltersAction,
  } = props;
  const {
    query: {
      params,
    },
  } = useRouter();

  const tab = params?.[0] || null;
  const subtab = params?.[1] || null;

  useEffect(() => {
    setPaginationPageAction(1);
    setFiltersAction([]);
  }, [setPaginationPageAction, setFiltersAction]);

  return (
    <MyRWDatasetsMy
      {...props}
      tab={tab}
      subtab={subtab}
      routes={{
        index: '/myrw',
        detail: '/myrw-detail',
      }}
    />
  );
};

MyRWDatasetsMyContainer.propTypes = {
  setFilters: PropTypes.func.isRequired,
  setPaginationPage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  orderDirection: state.datasets.datasets.orderDirection,
  filters: state.datasets.datasets.filters,
  pagination: state.datasets.datasets.pagination,
});

const mapDispatchToProps = {
  setFilters,
  setPaginationPage,
  setOrderDirection,
  getDatasetsByTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyRWDatasetsMyContainer);
