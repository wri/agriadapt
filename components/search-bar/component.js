import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import debounce from 'lodash/debounce';

// components
import SearchInput from 'components/ui/SearchInput';
import Icon from 'components/ui/icon';

class SearchBar extends PureComponent {
  static propTypes = {
    search: PropTypes.shape({
      term: PropTypes.string,
      page: PropTypes.number,
      selected: PropTypes.number,
      list: PropTypes.array,
    }).isRequired,
    header: PropTypes.shape({ searchOpened: PropTypes.bool }).isRequired,
    isHeader: PropTypes.bool,
    selected: PropTypes.object,
    setSearchPage: PropTypes.func.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    fetchSearch: PropTypes.func.isRequired,
    setSearchOpened: PropTypes.func.isRequired,
    setSearchSelected: PropTypes.func.isRequired,
    router: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    isHeader: false,
    selected: null,
  }

  componentDidUpdate() {
    const { header: { searchOpened } } = this.props;
    if (searchOpened) {
      // If we don't wait until animation is over it won't focus
      // If we only animate opcity it won't make the leave animation
      setTimeout(() => {
        this.input.focus();

        // Prevent body scroll
        document.documentElement.classList.add('-no-scroll');
        document.body.classList.add('-no-scroll');
      }, 160);
    }
  }

  onSearch = debounce((term) => {
    const {
      isHeader,
      setSearchPage,
      setSearchTerm,
      fetchSearch,
      router,
      search: {
        page,
      },
    } = this.props;

    if (!isHeader) {
      setSearchPage(1);
      setSearchTerm(term);
      router.replace(
        {
          pathname: 'search',
          query: {
            term,
            page,
          },
        },
        `/search?term=${term}&page=${page}`,
        {
          shallow: true,
        },
      );
    } else {
      setSearchTerm(term);
      fetchSearch();
    }
  }, 500)

  onKeyDown(e) {
    const { key } = e;
    const {
      search,
      selected,
      setSearchSelected,
    } = this.props;

    const keyTargets = /Arrow(Up|Down)|Enter/.test(key);

    if (keyTargets) {
      e.preventDefault();
    }

    if (key === 'ArrowDown') {
      if (search.list.length !== search.selected) {
        setSearchSelected(search.selected + 1);
      } else {
        setSearchSelected(1);
      }
    } else if (key === 'ArrowUp') {
      if (search.selected !== 1) {
        setSearchSelected(search.selected - 1);
      } else {
        setSearchSelected(search.list.length);
      }
    } else if (key === 'Enter' && selected) {
      window.location = selected.url;
    }

    if (!keyTargets && search.selected) {
      setSearchSelected(null);
    }
  }

  setSearchOpened(opened) {
    const {
      setSearchTerm,
      fetchSearch,
      setSearchOpened,
    } = this.props;

    if (!opened) {
      document.documentElement.classList.remove('-no-scroll');
      document.body.classList.remove('-no-scroll');
      setSearchTerm('');
      fetchSearch();
    }
    setSearchOpened(opened);
  }

  render() {
    const {
      search: { term },
      isHeader,
    } = this.props;

    return (
      <div className="c-search--term">
        <SearchInput
          isHeader={isHeader}
          getRef={(c) => { this.input = c; }}
          onKeyDown={(e) => this.onKeyDown(e)}
          input={{
            placeholder: 'Search term',
            value: term,
          }}
          onSearch={this.onSearch}
        />

        {isHeader
          && (
          <button
            className="z-10 flex items-center justify-center bg-white rounded-full search-close"
            type="button"
            onClick={() => this.setSearchOpened(false)}
          >
            <Icon
              name="icon-cross"
              className="-smaller"
            />
          </button>
          )}
      </div>
    );
  }
}

export default withRouter(SearchBar);
