import Image from "next/image";
import classnames from "classnames";
import Field from "components/form/Field";
import Select from 'react-select';

const ContentHeader = ({ id = 'LANDING', countries = null, image, blob, title = '', subtitle = '', description = [''] }) => {
  return (
    <div className="c-header">
      {/* the image stuff...  */}
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
          <Image src={image} alt="image" />
        </div>
        <div className="blob-container">
          <Image src={blob} alt="image" />
        </div>
      </div>
      {/* The info stuff... */}
      <div
        className={classnames({
          'info-container': true,
          '-right': id === 'LANDING',
          '-landing': id === 'LANDING',
          '-about': id === 'ABOUT',
        })}
      >
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        {description.map((d, i) => (
          <p key={`desc-${i}`} className="description">
            {d}
          </p>
        ))}
        {id === 'LANDING' && (
          <button
            className={classnames({
              'c-button': true,
              '-primary': true,
            })}
          >
            {/* TODO: Translate */}
            {'Explore the Latest Data'}
          </button>
        )}
        {countries && (
          <div className="country-selector">
            <Field
              id="VALUE_CHAINS"
              properties={{
                label: 'Select Country',
                default: '',
              }}
              options={countries}
              className={'Select--large'}
              placeholder={'Select Country'} // TODO: Translate
              // isSearchable={false}
              // isClearable={false}
            >
              {Select}
            </Field>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentHeader;
