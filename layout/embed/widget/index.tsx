import React, { useEffect } from 'react';

const LayoutEmbedWidgetContainer = (props) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  return <div>LayoutEmbedWidgetContainer</div>;
};

export default LayoutEmbedWidgetContainer;
