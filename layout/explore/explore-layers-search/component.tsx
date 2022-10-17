import RadioGroup from 'components/form/RadioGroup';
import Select from 'react-select';
import SearchInput from 'components/ui/SearchInput';
import { EXPLORE_FILTERS } from '../constants';
import Field from 'components/form/Field';
import { useCallback } from 'react';
import debounce from 'lodash/debounce';
import useSelect from 'hooks/form/useSelect';
import { logEvent } from 'utils/analytics';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const ExploreLayersSearch = ({
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
  const router = useRouter();

  const { t } = useTranslation(['explore', 'common']);

  const selectedChains = useSelect(
    VALUE_CHAINS.options.filter(({ value }) => value_chains.includes(value))
  );

  const selectedScenario = useSelect(
    EMISSION_SCENARIO.options.find(({ value }) => value === emission_scenario)
  );
  const selectedTimescale = useSelect(timescale);

  const handleSelectValueChains = (chains) => {
    selectedChains.onChange(chains);
    const values = chains.map(({ value }) => value);
    setFiltersValueChains(values);
    router.push(
      {
        query: {
          ...router.query,
          value_chains: values.join(','),
        },
      },
      {},
      { shallow: true }
    );
    logEvent('Explore (Filter)', 'Filter Value Chains', [...values].sort().join(','));
  };

  const handleSelectEmissionScenario = (scenario) => {
    selectedScenario.onChange(scenario);
    setFiltersEmissionScenario(scenario.value);
    router.push(
      { query: { ...router.query, emission_scenario: scenario.value } },
      {},
      { shallow: true }
    );
    logEvent('Explore (Filter)', 'Filter Emission Scenario', scenario.value);
  };

  const handleSelectTimescale = (timescale) => {
    selectedTimescale.onChange(timescale);
    setFiltersTimescale(timescale);
    router.push(
      { query: { ...router.query, timescale } },
      {},
      { shallow: true }
    );
  };

  const handleCancel = () => {
    setFiltersAdvancedOpen(false);
  };

  const handleSubmit = () => {
    setFiltersAdvancedOpen(false);
    logEvent('Explore (Filter)', 'Filter Timescale', selectedTimescale.value);
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
        logEvent('Explore (Filter)', 'Search', value);
    }
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
      <Field
        id="search"
        properties={{
          label: t('layers:Search Layers', { keySeparator: ':' }),
          default: search,
        }}
        onSearch={handleSearch}
        input={{
          value: search,
          placeholder: t('layers:Search Layers', { keySeparator: ':' }),
        }}
      >
        {SearchInput}
      </Field>
      <Field
        id={'VALUE_CHAINS'}
        properties={{
          label: t('layers:Filter Layers by Value Chains', {
            keySeparator: ':',
          }),
          default: VALUE_CHAINS.options.filter(({ value }) =>
            value_chains.includes(value)
          ),
          tooltip: VALUE_CHAINS.tooltip,
        }}
        value={selectedChains.value}
        onChange={handleSelectValueChains}
        options={VALUE_CHAINS.options}
        placeholder={t('common:value_chains.Value Chains')}
        className={'Select--large'}
        isMulti={VALUE_CHAINS.multi}
        hint={t(VALUE_CHAINS.hint)}
        // isSearchable={false}
        // isClearable={false}
      >
        {Select}
      </Field>
      <Field
        id={'EMISSION_SCENARIO'}
        properties={{
          label: t('layers:Filter Layers by Emission Scenario', {
            keySeparator: ':',
          }),
          default: EMISSION_SCENARIO.options.find(
            ({ value }) => value === emission_scenario
          ),
        }}
        value={{...selectedScenario.value, label: t(selectedScenario.value.label)}}
        onChange={handleSelectEmissionScenario}
        placeholder={EMISSION_SCENARIO.placeholder}
        options={EMISSION_SCENARIO.options.map(o => ({ ...o, label: t(o.label)}))}
        className="Select--large"
      >
        {Select}
      </Field>
      <div className="advanced-link">
        <a onClick={handleClickAdvanced}>{t('explore:layers.Advanced Search')}</a>
      </div>
      {advOpen && (
        <>
          <Field
            id={'TIMESCALE'}
            properties={{
              label: t('layers:Filter Layers by Timescale', {
                keySeparator: ':',
              }),
              default: selectedTimescale.value,
            }}
            onChange={handleSelectTimescale}
            options={TIMESCALE.options.map(
              (o) => ({ ...o, label: t(`common:timescales.${o.label}`) }),
              { keySeparator: ':' }
            )}
          >
            {RadioGroup}
          </Field>
          <div className="c-explore-search-actions">
            <button className="c-button -secondary" onClick={handleCancel}>
              {t('common:Cancel')}
            </button>
            <button className="c-button -primary" onClick={handleSubmit}>
              {t('common:Search')}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ExploreLayersSearch;
