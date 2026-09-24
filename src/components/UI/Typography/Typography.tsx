import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Typography.module.scss';

type TypographyAs =
  | 'p'
  | 'span'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

type TypographyProps = {
  variant?: 'regular' | 'medium' | 'bold';
  size?: 'small' | 'medium' | 'large' | 'body';
  uppercase?: boolean;
  children?: ReactNode;
  html?: string;
  className?: string;
  as?: TypographyAs;
};

export const Typography: FC<TypographyProps> = ({
  variant = 'regular',
  size = 'medium',
  uppercase = false,
  children,
  html,
  className,
  as: Component = 'p',
}) => {
  const typographyClass = clsx(
    styles.typography,
    styles[variant],
    styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`],
    uppercase && styles.uppercase,
    html && styles.htmlContent,
    className
  );

  if (html) {
    return (
      <div
        className={typographyClass}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return <Component className={typographyClass}>{children}</Component>;
};
