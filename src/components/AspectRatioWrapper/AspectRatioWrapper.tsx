import React, { FC } from 'react';
import classNames from 'classnames';

import css from './AspectRatioWrapper.module.css';

interface IProps {
  className?: string;
  rootClassName?: string;
  width: number;
  height: number;
}

const AspectRatioWrapper: FC<IProps> = props => {
  const { children, className, rootClassName, width, height, ...rest } = props;
  const classes = classNames(rootClassName || css.root, className);

  const aspectRatio = (height / width) * 100;
  const paddingBottom = `${aspectRatio}%`;

  return (
    <div className={classes} {...rest}>
      <div className={css.aspectPadding} style={{ paddingBottom }}>
        <div className={css.aspectBox}>{children}</div>
      </div>
    </div>
  );
};

export default AspectRatioWrapper;
