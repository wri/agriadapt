import React, { ReactNode, useEffect } from 'react';
import classnames from 'classnames';
import { Icons } from 'vizzuality-components';

// components
import HeadApp from 'layout/head/app';
import IconsRW from 'components/icons';

interface LayoutEmbedProps {
  title: string;
  description: string;
  thumbnailUrl?: string;
  className?: string;
  children: ReactNode;
  isWebshot?: boolean;
}

const LayoutEmbed = ({
  title,
  description,
  className = null,
  thumbnailUrl = null,
  children,
  isWebshot = false,
}: LayoutEmbedProps) => {
  useEffect(() => {
    if (!isWebshot) return null;

    // see https://resource-watch.github.io/doc-api/reference.html#webshot
    // it waits until 2 seconds to notify is ready to screenshot
    const timerId = window.setTimeout(() => {
      window['WEBSHOT_READY'] = true;
    }, 2000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [isWebshot]);

  return (
    <div
      className={classnames('l-page', {
        [className]: !!className,
      })}
    >
      <HeadApp
        title={title}
        description={description}
        thumbnail={thumbnailUrl}
      />
      <Icons />
      <IconsRW />
      {children}
    </div>
  );
};

export default LayoutEmbed;
