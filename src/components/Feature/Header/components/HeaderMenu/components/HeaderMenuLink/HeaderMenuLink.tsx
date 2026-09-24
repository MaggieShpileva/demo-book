import type { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { HeaderMenuResource } from '../../../../types';

type HeaderMenuLinkProps = {
  href: string;
  resource: HeaderMenuResource;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export const HeaderMenuLink: FC<HeaderMenuLinkProps> = ({
  href,
  resource,
  className,
  onClick,
  children,
}) => {
  if (resource === 'external') {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={href} onClick={onClick}>
      {children}
    </Link>
  );
};
