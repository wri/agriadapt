import React, { ReactNode } from 'react';
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
}

const LayoutEmbed = ({
  title,
  description,
  className = null,
  thumbnailUrl = null,
  children,
}: LayoutEmbedProps) => (
  <div
    className={classnames('l-page', {
      [className]: !!className,
    })}
  >
    <HeadApp title={title} description={description} thumbnail={thumbnailUrl} />
    <Icons />
    <IconsRW />
    {children}
  </div>
);

export default LayoutEmbed;
