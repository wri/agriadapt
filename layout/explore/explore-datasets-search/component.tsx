import classNames from 'classnames';
import SearchInput from 'components/ui/SearchInput';
import SearchSelect from 'components/ui/SearchSelect';
import { EXPLORE_FILTERS } from '../constants';

const ExploreDatasetsSearch = ({
  search,
  advanced,
  setFiltersAdvancedOpen,
}): JSX.Element => {
  const { VALUE_CHAINS } = EXPLORE_FILTERS;
  const { open: advOpen } = advanced;

  const handleCancel = () => {
    setFiltersAdvancedOpen(false);
  };

  const handleSearch = () => {
    setFiltersAdvancedOpen(false);
  };

  const handleClickAdvanced = () => {
    setFiltersAdvancedOpen(true);
  };

  return (
    <>
      {/* TODO: Translate */}
      <>Search Layers</>
      <SearchInput
        input={{
          value: search,
          placeholder: 'Search Layers', // TODO: Translate
        }}
      />
      {/* TODO: Translate */}
      <>Filter Layers by Value Chain</>
      <SearchSelect
        options={VALUE_CHAINS.options}
        placeholder={'Value Chain'} // TODO: Translate
      />
      {/* TODO: Translate */}
      {!advOpen && (
        <div>
          <a onClick={handleClickAdvanced}>{'Advanced Search'}</a>
        </div>
      )}
      {advOpen && (
        <>
          {Object.entries(EXPLORE_FILTERS.ADVANCED).map(([k, v]) => (
            <div id={k}>
              {/* TODO: Translate */}
              <div>Filter Layers by {v['placeholder']}</div>
              <SearchSelect
                options={[]}
                placeholder={v.placeholder} // TODO: Translate
              />
            </div>
          ))}
          <div>
            <button
              className={classNames({
                'c-button': true,
                '-secondary': true,
              })}
              onClick={handleCancel}
            >
              {/* TODO: Translate */}
              {'Cancel'}
            </button>
            <button
              className={classNames({
                'c-button': true,
                '-primary': true,
              })}
              onClick={handleSearch}
            >
              {/* TODO: Translate */}
              {'Search'}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ExploreDatasetsSearch;
