import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'next/router';

// utils
import debounce from 'lodash/debounce';

// components
import Icon from 'components/ui/icon';
import SearchInput from 'components/ui/SearchInput';
import Paginator from 'components/ui/Paginator';
import DatasetsList from './dataset-list';

class MyRWDatasets extends PureComponent {
  handleSearch = debounce((value) => {
    const {
      subtab,
      setFilters,
      getDatasetsByTab,
      setPaginationPage,
    } = this.props;
    if (!value.length) {
      setFilters([]);
    } else {
      setFilters([{ key: 'name', value }]);
    }

    getDatasetsByTab(subtab);
    setPaginationPage(1);
  }, 300)

  handleNewDataset = () => {
    const {
      router,
    } = this.props;

    router.push('/myrw-detail/datasets/new');
  };

  handleOrderChange = () => {
    const { setOrderDirection } = this.props;
    const orderDirection = this.props.orderDirection === 'asc' ? 'desc' : 'asc';

    setOrderDirection(orderDirection);
  }

  handlePageChange = (page) => this.props.setPaginationPage(page);

  render() {
    const {
      orderDirection, pagination, filters,
      tab, subtab,
    } = this.props;
    const { page, total, limit } = pagination;
    const nameSearchValue = (filters.find((filter) => filter.key === 'name') || {}).value || '';

    const iconName = classnames({
      'icon-arrow-up': orderDirection === 'asc',
      'icon-arrow-down': orderDirection !== 'asc',
    });

    return (
      <div className="c-my-rw">
        <SearchInput
          input={{
            placeholder: 'Search dataset',
            value: nameSearchValue,
          }}
          link={{
            label: 'New dataset',
            route: '/myrw-detail/datasets/new',
            // params: { tab: 'datasets', id: 'new' },
          }}
          onSearch={this.handleSearch}
        />
        <div className="row">
          <div className="column small-12">
            <div className="list-actions">
              <div className="buttons-container">
                <button
                  className="last-modified-container"
                  onClick={this.handleOrderChange}
                >
                  <a>Last modified</a>
                  <Icon className="-small" name={iconName} />
                </button>
              </div>
            </div>
            <DatasetsList
              routes={{
                index: '/myrw',
                detail: '/myrw-detail',
              }}
              tab={tab}
              subtab={subtab}
            />
            {!!total && total >= 2 && (
            <Paginator
              options={{
                size: total,
                page,
                limit,
              }}
              onChange={this.handlePageChange}
            />
            )}
          </div>
        </div>
      </div>
    );
  }
}

MyRWDatasets.propTypes = {
  orderDirection: PropTypes.oneOf(['asc', 'desc']).isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  pagination: PropTypes.shape({}).isRequired,
  tab: PropTypes.string.isRequired,
  subtab: PropTypes.string.isRequired,
  setOrderDirection: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  setPaginationPage: PropTypes.func.isRequired,
  getDatasetsByTab: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(MyRWDatasets);
