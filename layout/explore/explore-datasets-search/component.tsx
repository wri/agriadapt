import classNames from 'classnames';
import SearchInput from 'components/ui/SearchInput';
import SearchSelect from 'components/ui/SearchSelect';
import { EXPLORE_FILTERS } from '../constants';

const ExploreDatasetsSearch = ({
  search,
  value_chains,
  advanced,
  setSearchAdvancedOpen,
}): JSX.Element => {
  const { VALUE_CHAINS } = EXPLORE_FILTERS;
  const { open: advOpen } = advanced;

  const handleCancel = () => {
    setSearchAdvancedOpen(false);
  };

  const handleSearch = () => {
    setSearchAdvancedOpen(false);
  };

  const handleClickAdvanced = () => {
    setSearchAdvancedOpen(true);
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
          {' '}
          {Object.entries(EXPLORE_FILTERS).map(([k, v]) => (
            <div id={k}>
              {/* TODO: Translate */}
              <div>Filter Layers by {v['placeholder']}</div>
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
      {/* <>Filter Layers by Timescale</>
        <SearchSelect
          options={[]}
          placeholder={'Timescale'} // TODO: Translate
        /> */}
    </>
  );
};

export default ExploreDatasetsSearch;
