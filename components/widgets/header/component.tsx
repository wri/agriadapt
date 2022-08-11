import classnames from 'classnames';
import { replace } from 'layer-manager';
// import { Tooltip } from "vizzuality-components";

// components
// import LoginRequired from 'components/ui/login-required';
import Icon from 'components/ui/icon';
import Title from 'components/ui/Title';
// import CollectionsPanel from "components/collections-panel";

interface WidgetHeaderProps {
  widget: {
    id: string;
    name: string;
    widgetConfig?: {
      type?: string;
    };
  };
  // isInACollection: boolean,
  isInfoVisible?: boolean;
  isEnlarged?: boolean;
  onToggleInfo: () => void;
  onToggleShare: () => void;
  onToggleEnlarge?: () => void;
  download?: boolean;
  country?: {
    label: string;
    value: string;
  };
}

export default function WidgetHeader({
  widget,
  // isInACollection,
  onToggleInfo,
  onToggleShare,
  onToggleEnlarge,
  isInfoVisible = false,
  isEnlarged = false,
  download = false,
  country = null,
}: WidgetHeaderProps) {
  // const starIconName = classnames({
  //   "icon-star-full": isInACollection,
  //   "icon-star-empty": !isInACollection,
  // });
  const modalIcon = classnames({
    'icon-cross': isInfoVisible,
    'icon-info': !isInfoVisible,
  });

  const enlargeIcon = classnames({
    'icon-cross': isEnlarged,
    'icon-enlarge': !isEnlarged,
  });

  const replacement = {
    country_name: country?.label || 'the world',
  };

  const name = widget?.name?.includes('{{country_name}}')
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
            {!isEnlarged && (
              <li>
                <button
                  type="button"
                  className="c-btn -tertiary -clean"
                  onClick={onToggleShare}
                >
                  <Icon name="icon-share" className="-small" />
                </button>
              </li>
            )}
            {/* TODO: Implement download report */}
            {/* {download && (
              <li>
                <button type="button" className="c-btn -clean">
                  <Icon name="download-2" className="-small" />
                </button>
              </li>
            )} */}
            {!isEnlarged && (
              <li>
                <button
                  type="button"
                  className="c-btn -clean"
                  onClick={onToggleInfo}
                >
                  <Icon name={modalIcon} className="-small" />
                </button>
              </li>
            )}
            {widget.widgetConfig?.type === 'map' && !!onToggleEnlarge && (
              <li>
                <button
                  type="button"
                  className="c-btn -clean"
                  onClick={onToggleEnlarge}
                >
                  <Icon name={enlargeIcon} className="-small" />
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
