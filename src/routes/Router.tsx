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

const ParamsContext = createContext<Record<string, string>>({});

export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  return (useContext(ParamsContext) || {}) as T;
}

export interface RouteProps {
  path: string;
  element: React.ReactNode;
}

export function Route({ element }: RouteProps): React.ReactElement | null {
  return (element as React.ReactElement) || null;
}

function matchRoutePath(pattern: string, pathname: string): { match: boolean; params: Record<string, string> } {
  const cleanPattern = (pattern || '').toLowerCase().replace(/\/$/, '') || '/';
  const cleanPath = (pathname || '').toLowerCase().replace(/\/$/, '') || '/';

  if (cleanPattern === '*' || pattern === '/*') {
    return { match: true, params: {} };
  }

  const patternParts = cleanPattern.split('/').filter(Boolean);
  const pathParts = cleanPath.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) {
    return { match: false, params: {} };
  }

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      const paramName = patternParts[i].slice(1);
      params[paramName] = pathParts[i];
    } else if (patternParts[i] !== pathParts[i]) {
      return { match: false, params: {} };
    }
  }

  return { match: true, params };
}

export function Routes({ children }: { children: React.ReactNode }): React.ReactElement | null {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase().replace(/\/$/, '') || '/';

  let matchElement: React.ReactNode = null;
  let matchedParams: Record<string, string> = {};
  let fallbackElement: React.ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement<RouteProps>(child)) return;
    if (matchElement) return;

    const { path, element } = child.props;
    if (path === '*' || path === '/*') {
      fallbackElement = element;
      return;
    }

    const { match, params } = matchRoutePath(path || '', currentPath);
    if (match) {
      matchElement = element;
      matchedParams = params;
    }
  });

  const finalElement = matchElement || fallbackElement || null;

  return (
    <ParamsContext.Provider value={matchedParams}>
      {finalElement as React.ReactElement | null}
    </ParamsContext.Provider>
  );
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

  const rawClassName = typeof className === 'function' ? className({ isActive }) : className || '';
  const computedClassName = isActive && !rawClassName.includes('active') 
    ? `${rawClassName} active`.trim() 
    : rawClassName.trim();

  return (
    <Link to={to} className={computedClassName} {...rest}>
      {children}
    </Link>
  );
}
