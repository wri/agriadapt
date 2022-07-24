import RadioGroup from 'components/form/RadioGroup';
import Select from 'react-select';
import SearchInput from 'components/ui/SearchInput';
import { EXPLORE_FILTERS } from '../constants';
import Field from 'components/form/Field';
import { useCallback } from 'react';
import debounce from 'lodash/debounce';
import useSelect from 'hooks/form/useSelect';
import { logEvent } from 'utils/analytics';

const ExploreDatasetsSearch = ({
  search,
  value_chains,
  emission_scenario,
  timescale,
  advanced: { open: advOpen },
  setFiltersValueChains,
  setFiltersTimescale,
  setFiltersEmissionScenario,
  setFiltersAdvancedOpen,
  setFiltersSearch,
  setDatasetsPage,
  fetchDatasets,
}): JSX.Element => {
  const { VALUE_CHAINS, EMISSION_SCENARIO, TIMESCALE } = EXPLORE_FILTERS;

  const selectedChain = useSelect(value_chains);
  const selectedScenario = useSelect(emission_scenario);
  const selectedTimescale = useSelect(timescale);

  const handleSelectValueChain = (chains) => {
    selectedChain.onChange(chains);
    setFiltersValueChains(chains);
  };

  const handleSelectEmissionScenario = (scenario) => {
    selectedScenario.onChange(scenario);
    setFiltersEmissionScenario(scenario);
    logEvent({
      action: 'filter',
      params: { emission_scenario: scenario.value}
    })
  };

  const handleSelectTimescale = (timescale) => {
    selectedTimescale.onChange(timescale);
    setFiltersTimescale(timescale);
  };

  const handleCancel = () => {
    setFiltersAdvancedOpen(false);
  };

  const handleSubmit = () => {
    setFiltersAdvancedOpen(false);
    logEvent({
      action: 'filter',
      params: {
        value_chain: [...selectedChain.value].map(({value}) => value).sort().join(','),
        timescale: selectedTimescale.value,
      },
    });
    loadDatasets();
  };

  const handleClickAdvanced = () => {
    setFiltersAdvancedOpen(!advOpen);
  };

  const debouncedSetFiltersSearch = debounce((value: string) => {
    setFiltersSearch(value);
    if (!advOpen) { 
      loadDatasets();
      value.trim().length &&
        logEvent({
          action: 'dataset_search',
          params: {
            search_term: value,
          },
        });
    };
  }, 500);

  const handleSearch = (value: string) => {
    debouncedSetFiltersSearch(value);
  };

  const loadDatasets = useCallback(() => {
    setDatasetsPage(1);
    fetchDatasets();
  }, [setDatasetsPage, fetchDatasets]);

  return (
    <>
      {/* TODO: Translate */}
      <h4>Start Exploring</h4>
      <Field
        id="search"
        properties={{
          label: 'Search Layers',
          default: search,
        }}
        onSearch={handleSearch}
        input={{
          value: search,
          placeholder: 'Search Layers', // TODO: Translate
        }}
      >
        {SearchInput}
      </Field>
      <Field
        id={'EMISSION_SCENARIO'}
        properties={{
          // TODO: Translate
          label: `Filter Layers by ${EMISSION_SCENARIO.placeholder}`,
          default: emission_scenario,
        }}
        value={selectedScenario.value}
        onChange={handleSelectEmissionScenario}
        placeholder={EMISSION_SCENARIO.placeholder} // TODO: Translate
        options={EMISSION_SCENARIO.options}
        hint={VALUE_CHAINS.hint}
        className="Select--large"
      >
        {Select}
      </Field>
      {/* TODO: Translate */}
      <div className="advanced-link">
        <a onClick={handleClickAdvanced}>{'Advanced Search'}</a>
      </div>
      {advOpen && (
        <>
          <Field
            // TODO: Translate
            id={'VALUE_CHAINS'}
            properties={{
              // TODO: Translate
              label: `Filter Layers by ${VALUE_CHAINS.placeholder}`,
              default: value_chains,
              tooltip: VALUE_CHAINS.tooltip,
            }}
            value={selectedChain.value}
            onChange={handleSelectValueChain}
            options={VALUE_CHAINS.options}
            placeholder={VALUE_CHAINS.placeholder}
            className={'Select--large'}
            isMulti={VALUE_CHAINS.multi}
            // isSearchable={false}
            // isClearable={false}
          >
            {Select}
          </Field>
          <Field
            id={'TIMESCALE'}
            properties={{
              // TODO: Translate
              label: `Filter Layers by ${TIMESCALE.placeholder}`,
              default: timescale,
            }}
            value={selectedTimescale.value}
            onChange={handleSelectTimescale}
            options={TIMESCALE.options}
          >
            {RadioGroup}
          </Field>
          <div className="c-explore-search-actions">
            <button className="c-button -secondary" onClick={handleCancel}>
              {/* TODO: Translate */}
              {'Cancel'}
            </button>
            <button className="c-button -primary" onClick={handleSubmit}>
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
