import classnames from 'classnames';
import Icon from 'components/ui/icon';

const DetailItem = ({ label: { icon, label }, info, widget }) => {
  return (
    <>
      <div className="c-detail-item">
        <div className="c-detail-item-info">
          <div
            className={classnames({
              'c-step-icon': true,
              'c-button': true,
            })}
          >
            <Icon
              name={icon}
              className={classnames({
                'c-icon': true,
                '-big': true,
              })}
            />
          </div>
          <div>
            <h3>{label}</h3>
            <p className="description">{info}</p>
          </div>
        </div>
        <div
          className={classnames({
            'c-widget': true,
            '-side': true,
          })}
        ></div>
      </div>
    </>
  );
};

export default DetailItem;