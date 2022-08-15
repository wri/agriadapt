import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';

// components
import Tether from 'react-tether';
import Icon from 'components/ui/icon';
import RadioGroup from 'components/form/RadioGroup';
import Checkbox from 'components/form/Checkbox';

// constants
import { BASEMAPS, LABELS } from 'components/map/constants';

// utils
import { logEvent } from 'utils/analytics';
import { useTranslation } from 'next-i18next';

export default function BasemapControls({
  basemap,
  labels,
  boundaries,
  disabledControls,
  onChangeBasemap,
  onChangeLabels,
  onChangeBoundaries,
}) {
  const [active, setActive] = useState(false);
  let basemapSelectorRef = useRef(null);

  const onScreenClick = useCallback(
    (evt) => {
      const el = basemapSelectorRef.current;
      const clickOutside = el && el.contains && !el.contains(evt.target);

      if (clickOutside && active) {
        setActive(false);
      }
    },
    [active]
  );

  const toggleDropdown = useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      setActive(!active);
    },
    [active]
  );

  const onBasemapChange = useCallback(
    (nextBasemap) => {
      logEvent('Explore Map', 'change basemap', nextBasemap);
      onChangeBasemap(BASEMAPS[nextBasemap]);
    },
    [onChangeBasemap]
  );

  const onLabelsChange = useCallback(
    (nextLabels) => {
      onChangeLabels(LABELS[nextLabels]);
    },
    [onChangeLabels]
  );

  const onBoundariesChange = useCallback(
    (nextBoundaries) => {
      onChangeBoundaries(nextBoundaries.checked);
    },
    [onChangeBoundaries]
  );

  useEffect(() => {
    if (active) {
      window.addEventListener('click', onScreenClick);
    } else {
      window.removeEventListener('click', onScreenClick);
    }

    return () => {
      window.removeEventListener('click', onScreenClick);
    };
  }, [active, onScreenClick]);

  const { t } = useTranslation(['explore', 'common']);

  const basemapOptions = Object.values(BASEMAPS).map(
    ({ label, value }) => ({
      label,
      value,
    }),
    []
  );

  const labelsOptions = Object.values(LABELS).map(
    ({ label, value }) => ({
      label,
      value,
    }),
    []
  );

  const disableBoundariesControls = useMemo(
    () => disabledControls.includes('boundaries'),
    [disabledControls]
  );

  return (
    <div className="c-basemap-control">
      <Tether
        attachment="top right"
        constraints={[{ to: 'window' }]}
        targetOffset="8px 100%"
        classes={{ element: 'c-tooltip -arrow-right' }}
        renderTarget={(ref) => (
          <button
            ref={ref}
            type="button"
            className="basemap-control--btn"
            onClick={toggleDropdown}
          >
            <Icon name="icon-layers" className="-small" />
          </button>
        )}
        renderElement={(ref) => {
          basemapSelectorRef = ref;

          if (!active) return null;

          return (
            <div ref={ref}>
              <RadioGroup
                name="basemap"
                options={basemapOptions.map((o) => (
                  {...o, label: t(o.label)}
                  ))}
                  properties={{ default: basemap.id }}
                  onChange={onBasemapChange}
                  />

              <div className="divisor" />

              <RadioGroup
                name="labels"
                options={labelsOptions.map((o) => (
                  {...o, label: t(o.label)}
                ))}
                properties={{
                  default: labels.id,
                  value: labels.id,
                }}
                onChange={onLabelsChange}
              />

              {!disableBoundariesControls && (
                <>
                  <div className="divisor" />
                  <Checkbox
                    properties={{
                      name: 'boundaries',
                      title: t('explore:map.Boundaries'),
                      value: 'boundaries',
                      checked: boundaries,
                    }}
                    onChange={onBoundariesChange}
                  />
                </>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}

BasemapControls.defaultProps = {
  basemap: {},
  labels: {},
  boundaries: false,
  disabledControls: [],
  onChangeBasemap: () => {},
  onChangeLabels: () => {},
  onChangeBoundaries: () => {},
};

BasemapControls.propTypes = {
  basemap: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  labels: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  boundaries: PropTypes.bool,
  disabledControls: PropTypes.arrayOf(PropTypes.string),
  onChangeBasemap: PropTypes.func,
  onChangeLabels: PropTypes.func,
  onChangeBoundaries: PropTypes.func,
};
