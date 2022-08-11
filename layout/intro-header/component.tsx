import Image from 'next/image';
import classnames from 'classnames';
import Field from 'components/form/Field';
import Select from 'react-select';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const IntroHeader = ({
  id = 'LANDING',
  countries = null,
  image,
  blob,
  title = '',
  subtitle = '',
  description = [],
  button = undefined,
  country,
  setCountry,
}) => {
  const router = useRouter();

  const { t } = useTranslation([id.toLowerCase(), 'common, countries']);

  const handleSelectCountry = (c) => {
    setCountry(c);
    router.push(
      {
        query: {
          ...router.query,
          geostore: c.value,
        },
      },
      {},
      { shallow: true }
    );
  };

  return (
    <div className="c-intro-header">
      <div
        className={classnames({
          'visual-container': true,
          '-right': id !== 'LANDING',
        })}
      >
        <div
          className={classnames({
            'image-container': true,
            '-landing': id === 'LANDING',
            '-about': id === 'ABOUT',
            '-rice': id === 'RICE',
            '-coffee': id === 'COFFEE',
            '-cotton': id === 'COTTON',
          })}
        >
          <Image
            className="image"
            loader={({ src }) => src}
            src={image}
            alt={t(title)}
          />
        </div>
        <div className="blob-container">
          <Image loader={({ src }) => src} src={blob} alt="image" />
        </div>
      </div>
      <div className="c-content">
        <div className="l-container">
          <div className="row">
            <div className="column small-12">
              <div
                className={classnames({
                  'info-container': true,
                  '-right': id === 'LANDING',
                  '-landing': id === 'LANDING',
                  '-about': id === 'ABOUT',
                })}
              >
                <h2>{t(title)}</h2>
                <h3>{t(subtitle)}</h3>
                {description.map((d, i) => (
                  <p key={`desc-${i}`} className="description">
                    {t(d)}
                  </p>
                ))}
                {id === 'LANDING' && (
                  <Link href={button.url} passHref>
                    <a
                      className={classnames({
                        'c-button': true,
                        '-primary': true,
                      })}
                    >
                      {t(button.label)}
                    </a>
                  </Link>
                )}
                {countries && (
                  <div className="country-selector">
                    <Field
                      id="VALUE_CHAINS"
                      properties={{
                        label: t('common:Select_Country'),
                        default: {
                          ...country,
                          sql_label: country.sql_label ?? country.label,
                          label: t(`countries:${country.label}`, {
                            keySeparator: ':',
                          }),
                        },
                      }}
                      options={countries.map((c) => ({
                        ...c,
                        sql_label: c.sql_label ?? c.label,
                        label: t(`countries:${c.label}`, { keySeparator: ':' }),
                      }))}
                      className={'Select--large'}
                      onChange={handleSelectCountry}
                      value={{
                        ...country,
                        sql_label: country.sql_label ?? country.label,
                        label: t(`countries:${country.label}`, {
                          keySeparator: ':',
                        }),
                      }}
                      placeholder={t('common:Select_Country')}
                    >
                      {Select}
                    </Field>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroHeader;
