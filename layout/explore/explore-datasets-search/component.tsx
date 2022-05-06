import classNames from 'classnames';
import RadioGroup from 'components/form/RadioGroup';
import Select from 'react-select';
import SearchInput from 'components/ui/SearchInput';
import { EXPLORE_FILTERS } from '../constants';
import Field from 'components/form/Field';

const ExploreDatasetsSearch = ({
  search,
  advanced,
  setFiltersAdvancedOpen,
}): JSX.Element => {
  const { STANDARD, ADVANCED } = EXPLORE_FILTERS;
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
        onSearch={() => undefined}
        input={{
          value: search,
          placeholder: 'Search Layers', // TODO: Translate
        }}
      >
        {SearchInput}
      </Field>
      {/* TODO: Translate */}
      {Object.entries(STANDARD).map(([k, v]) => (
        <Field
          // TODO: Translate
          key={k}
          id={k}
          properties={{
            // TODO: Translate
            label: `Filter Layers by ${v.placeholder}`,
            default: '',
            tooltip: v.tooltip,
          }}
          options={[]}
          hint={v.hint}
          placeholder={v.placeholder}
          className={'Select--large'}
          // isSearchable={false}
          // isClearable={false}
        >
          {Select}
        </Field>
      ))}
      {/* TODO: Translate */}
      <div className="advanced-link">
        <a onClick={handleClickAdvanced}>{'Advanced Search'}</a>
      </div>
      {advOpen && (
        <>
          {Object.entries(ADVANCED).map(([k, v]) => (
            <Field
              key={k}
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
            <button className="c-button -secondary" onClick={handleCancel}>
              {/* TODO: Translate */}
              {'Cancel'}
            </button>
            <button
              className="c-button -primary"
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
