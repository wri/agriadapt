import classNames from 'classnames';
import RadioGroup from 'components/form/RadioGroup';
import Select from 'react-select';
import SearchInput from 'components/ui/SearchInput';
import { EXPLORE_FILTERS } from '../constants';
import Field from 'components/form/Field';

const ExploreDatasetsSearch = ({
  search,
  value_chains: selectedChains,
  advanced,
  setFiltersAdvancedOpen,
  setFiltersValueChains,
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
    setFiltersAdvancedOpen(!advOpen);
  };

  return (
    <>
      {/* TODO: Translate */}
      <h4>Start Exploring</h4>
      <Field
        id="search"
        properties={{
          label: 'Search Layers',
          default: '',
        }}
        onSearch={() => {}}
        input={{
          value: search,
          placeholder: 'Search Layers', // TODO: Translate
        }}
      >
        {SearchInput}
      </Field>
      {/* TODO: Translate */}
      <Field
        id="VALUE_CHAINS"
        properties={{
          label: 'Filter Layers by Value Chain',
          default: '',
        }}
        options={VALUE_CHAINS.options}
        className={'Select--large'}
        placeholder={'Value Chain'} // TODO: Translate
        value={selectedChains}
        onChange={setFiltersValueChains}
        // isSearchable={false}
        // isClearable={false}
      >
        {Select}
      </Field>
      {/* TODO: Translate */}
      <div>
        <a className="advanced-link" onClick={handleClickAdvanced}>
          {'Advanced Search'}
        </a>
      </div>
      {advOpen && (
        <>
          {Object.entries(EXPLORE_FILTERS.ADVANCED).map(([k, v]) => (
            <Field
              id={k}
              properties={{
                // TODO: Translate
                label: `Filter Layers by ${v.placeholder}`,
                default: '',
              }}
              {...(v.type === 'select' && {
                placeholder: v.placeholder, // TODO: Translate
                options: [],
              })}
              value={''}
              {...(v.type === 'radio' && {
                options: v.options,
              })}
              className={v.type === 'select' ? 'Select--large' : ''}
            >
              {v.type === 'select'
                ? Select
                : v.type === 'radio'
                ? RadioGroup
                : null}
            </Field>
          ))}
          <div className="c-explore-search-actions">
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
