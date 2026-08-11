import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

export interface LocationState {
  pathname: string;
  search: string;
  hash: string;
}

export interface RouterContextType {
  location: LocationState;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export function BrowserRouter({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<LocationState>(() => ({
    pathname: window.location.pathname || '/',
    search: window.location.search || '',
    hash: window.location.hash || '',
  }));

  useEffect(() => {
    const handlePopState = () => {
      setLocation({
        pathname: window.location.pathname || '/',
        search: window.location.search || '',
        hash: window.location.hash || '',
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    // Handle external or hash-only links
    if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('tel:') || to.startsWith('mailto:')) {
      window.location.href = to;
      return;
    }

    let nextPath = to;
    let nextHash = '';
    let nextSearch = '';

    // Split hash
    const hashIndex = nextPath.indexOf('#');
    if (hashIndex !== -1) {
      nextHash = nextPath.substring(hashIndex);
      nextPath = nextPath.substring(0, hashIndex);
    }

    // Split search
    const searchIndex = nextPath.indexOf('?');
    if (searchIndex !== -1) {
      nextSearch = nextPath.substring(searchIndex);
      nextPath = nextPath.substring(0, searchIndex);
    }

    if (!nextPath) {
      nextPath = window.location.pathname || '/';
    }

    const fullUrl = `${nextPath}${nextSearch}${nextHash}`;

    if (options?.replace) {
      window.history.replaceState(null, '', fullUrl);
    } else {
      window.history.pushState(null, '', fullUrl);
    }

    setLocation({
      pathname: nextPath,
      search: nextSearch,
      hash: nextHash,
    });

    // If there's an anchor hash, smooth scroll to it
    if (nextHash) {
      const elementId = nextHash.replace('#', '');
      const targetElement = document.getElementById(elementId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const value = useMemo(() => ({ location, navigate }), [location, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useLocation(): LocationState {
  const context = useContext(RouterContext);
  if (!context) {
    return {
      pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
      search: typeof window !== 'undefined' ? window.location.search : '',
      hash: typeof window !== 'undefined' ? window.location.hash : '',
    };
  }
  return context.location;
}

export function useNavigate() {
  const context = useContext(RouterContext);
  if (!context) {
    return (to: string) => {
      window.location.href = to;
    };
  }
  return context.navigate;
}

export interface RouteProps {
  path: string;
  element: React.ReactNode;
}

export function Route(_props: RouteProps): React.ReactElement | null {
  return null;
}

export function Routes({ children }: { children: React.ReactNode }): React.ReactElement | null {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase().replace(/\/$/, '') || '/';

  let matchElement: React.ReactNode = null;
  let fallbackElement: React.ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement<RouteProps>(child)) return;

    const { path, element } = child.props;
    const cleanPath = (path || '').toLowerCase().replace(/\/$/, '') || '/';

    if (cleanPath === '*' || path === '*') {
      fallbackElement = element;
    } else if (cleanPath === currentPath) {
      matchElement = element;
    }
  });

  return (matchElement || fallbackElement || null) as React.ReactElement | null;
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Link({ to, replace, className, children, onClick, ...rest }: LinkProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.altKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      navigate(to, { replace });
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}

export interface NavLinkProps extends Omit<LinkProps, 'className'> {
  className?: string | ((props: { isActive: boolean }) => string);
}

export function NavLink({ to, className, children, ...rest }: NavLinkProps) {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const cleanTo = (to.split('#')[0] || '').toLowerCase().replace(/\/$/, '') || '/';
  const isActive = currentPath === cleanTo;

  const computedClassName = typeof className === 'function' ? className({ isActive }) : `${className || ''} ${isActive ? 'active' : ''}`.trim();

  return (
    <Link to={to} className={computedClassName} {...rest}>
      {children}
    </Link>
  );
}
