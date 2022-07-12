import { useFetchWidget } from "hooks/widget";

import WidgetBlock from "./component";

// import type { WYSIWYGItem } from "types/wysiwyg";
import { connect } from "react-redux";
import { RootState } from "lib/store";

export interface WidgetBlockContainerProps {
  // item: WYSIWYGItem;
  widgetId: string;
  country: {
    label: string;
    value: string;
  }
}

const WidgetBlockContainer = ({ widgetId, country }: WidgetBlockContainerProps): JSX.Element => {
  const { data: widget } = useFetchWidget(
    widgetId,
    { includes: 'metadata' },
    {
      enabled: true,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <WidgetBlock
      {...(country && { areaOfInterest: country.value })}
      widget={widget}
    />
  );
};

export default connect((state: RootState) => ({
  country: state.value_chains.country,
}))(WidgetBlockContainer);