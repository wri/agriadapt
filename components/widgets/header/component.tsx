import PropTypes from "prop-types";
import classnames from "classnames";
import { replace } from "layer-manager";
// import { Tooltip } from "vizzuality-components";

// components
// import LoginRequired from 'components/ui/login-required';
import Icon from "components/ui/icon";
import Title from "components/ui/Title";
// import CollectionsPanel from "components/collections-panel";


// WidgetHeader.propTypes = {
//   widget: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     widgetConfig: PropTypes.shape({
//       type: PropTypes.string,
//     }),
//   }).isRequired,
//   // isInACollection: PropTypes.bool.isRequired,
//   isInfoVisible: PropTypes.bool,
//   onToggleInfo: PropTypes.func.isRequired,
//   // onToggleShare: PropTypes.func.isRequired,
// };


interface WidgetHeaderProps {
  widget: {
    id: string;
    name: string,
    widgetConfig?: {
      type?: string;
    };
  }
  // isInACollection: boolean,
  isInfoVisible?: boolean,
  onToggleInfo: () => void,
  onToggleShare: () => void,
  download?: boolean;
  country?: {
    label: string;
    value: string;
  }
}

export default function WidgetHeader({
  widget,
  // isInACollection,
  onToggleInfo,
  onToggleShare,
  isInfoVisible = false,
  download = false,
  country = null,
}: WidgetHeaderProps) {
  // const starIconName = classnames({
  //   "icon-star-full": isInACollection,
  //   "icon-star-empty": !isInACollection,
  // });
  const modalIcon = classnames({
    "icon-cross": isInfoVisible,
    "icon-info": !isInfoVisible,
  });

  const replacement = {
    country_name: country?.label || 'the world',
  }

  const name = widget?.name.includes('{{country_name}}')
    ? replace(widget?.name, replacement)
    : widget.name;

  return (
    <header className="c-widget-header">
      <div className="header-container">
        <div className="title-container">
          <Title className="-default">{name}</Title>
        </div>
        <div className="button-list">
          <ul>
            <li>
              <button
                type="button"
                className="c-btn -tertiary -clean"
                onClick={onToggleShare}
              >
                <Icon name="icon-share" className="-small" />
              </button>
            </li>
            {/* <li>
              <LoginRequired redirect={false}>
              <Tooltip
                overlay={
                  <CollectionsPanel resource={widget} resourceType="widget" />
                }
                overlayClassName="c-rc-tooltip"
                overlayStyle={{ color: "#fff" }}
                placement="bottomLeft"
                trigger="click"
              >
              <button type="button" className="c-btn -clean" tabIndex={-1}>
                <Icon name={starIconName} className="-star -small" />
              </button>
              </Tooltip>
              </LoginRequired>
            </li> */}
            {download && (
              <li>
                <button type="button" className="c-btn -clean">
                  <Icon name="download-2" className="-small" />
                </button>
              </li>
            )}
            <li>
              <button
                type="button"
                className="c-btn -clean"
                onClick={onToggleInfo}
              >
                <Icon name={modalIcon} className="-small" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
