import React, { useEffect } from 'react';
import { template } from './template';
import Field from 'components/form/Field';
import Select from 'react-select';
import useSelect from 'hooks/form/useSelect';
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss';

const Controls = ({ setConfig, products, indicators, country }) => {
  const product = useSelect(products[0]);
  const indicator = useSelect(indicators[0]);

  const { t } = useTranslation('widgets');

  useEffect(() => {
    const i_sql = indicator.value.value;
    const p_sql = product.value.value;
    const url = `https://api.resourcewatch.org/v1/query/2dcd7aeb-d290-414b-80a2-8d90c44ae02a?sql=SELECT year as x, element as color, value as y FROM com_039_rw0_agricultural_trade_statistics_edit WHERE country IN ('${country}') AND element IN ('Export ${i_sql}', 'Import ${i_sql}') AND item IN ('${p_sql}') ORDER BY year asc`;

    setConfig({
      ...template,
      data: [{ ...template.data[0], url }, ...template.data.slice(1)],
    });
  }, [country, indicator.value.value, product.value.value, setConfig]);

  return (
    <div className={styles.c_controls}>
      <Field
        id={'EXPORT_IMPORT_PRODUCT'}
        properties={{
          label: t('Select Product'),
          default: products[0],
        }}
        value={{ ...product.value.value, label: t(product.value.label) }}
        onChange={product.onChange}
        options={products.map((o) => ({ ...o, label: t(o.label) }))}
        className={'Select--large'}
      >
        {Select}
      </Field>
      <Field
        id={'EXPORT_IMPORT_INDICATOR'}
        properties={{
          label: t('Select Indicator'),
          default: { ...indicators[0], label: t(indicators[0].label) },
        }}
        value={{ ...indicator.value.value, label: t(indicator.value.label) }}
        onChange={indicator.onChange}
        options={indicators.map((o) => ({ ...o, label: t(o.label) }))}
        className={'Select--large'}
      >
        {Select}
      </Field>
    </div>
  );
};

export default Controls;
