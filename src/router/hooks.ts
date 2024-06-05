import {
    RouteLocation,
    RouteMatched,
    RouteRecord,
    RouteType,
    RouterOptions
} from '@/router/types';
import { useMemo, useCallback } from 'react';
import {
    useLocation,
    useParams,
    matchRoutes,
    useNavigate
} from 'react-router-dom';
import qs from 'qs';

import { isString, isUrl } from '@/utils/isType.ts';

export function useRouteLocation<
    Q extends IAnyObject = IAnyObject,
    P extends IAnyObject = IAnyObject
>(): RouteLocation<Q, P> {
    const location = useLocation();
    const param = useParams();

    const search = useMemo(
        () => decodeURIComponent(location.search),
        [location.search]
    );

    const query = useMemo(() => {
        const routeQuery = search ? { ...qs.parse(search.substring(1)) } : {};
        return routeQuery as Q;
    }, [search]);

    const params = useMemo(() => {
        const state = location.state as IAnyObject;
        const routeState = state ? { ...state } : {};
        const routeParam = param ? { ...param } : {};
        return { ...routeState, ...routeParam } as P;
    }, [location.state, param]);

    return {
        fullPath: location.pathname + search,
        hash: location.hash,
        path: location.pathname,
        query,
        params
    };
}

export function useRouteMatched(routes: RouteRecord[]): RouteMatched {
    const location = useLocation();

    const matched = useMemo(() => {
        const _routes = matchRoutes(routes, location) || [];
        const matchPaths = _routes.map((item) => item.pathname);
        const _matched = matchPaths.reduce((matchedRoutes, matchPath) => {
            if (matchedRoutes.length) {
                const children =
                    matchedRoutes[matchedRoutes.length - 1].children;
                if (children) {
                    const matchedRoutesChildren = children.filter(
                        (route) => route.fullPath === matchPath
                    )[0];
                    matchedRoutesChildren &&
                        matchedRoutes.push(matchedRoutesChildren);
                }
            } else {
                matchedRoutes = routes.filter((v) => v.fullPath === matchPath);
            }
            return matchedRoutes;
        }, [] as RouteRecord[]);
        return _matched;
    }, [routes, location]);

    const match = useMemo(() => {
        return matched[matched.length - 1] || {};
    }, [matched]);

    return {
        matched,
        match,
        meta: match.meta || {}
    };
}

/**
 * 路由对象
 */
export function useRoute(routes: RouteRecord[]): RouteType {
    const locationInfo = useRouteLocation();
    const matchedRoutes = useRouteMatched(routes);

    return {
        ...locationInfo,
        ...matchedRoutes
    };
}

function filterQuery(query: IAnyObject | undefined) {
    if (query) {
        const navigateArr = Object.entries(query).filter(
            ([, val]) => !!(val || val === '')
        );
        return navigateArr.length ? Object.fromEntries(navigateArr) : null;
    } else {
        return null;
    }
}

/**
 * 路由器对象
 */
export function useRouter<
    Q extends IAnyObject = IAnyObject,
    P extends IAnyObject = IAnyObject
>() {
    const navigate = useNavigate();

    const customNavigate = useCallback(
        (options: RouterOptions | string, replace = false) => {
            if (isString(options)) {
                isUrl(options)
                    ? window.open(options)
                    : navigate(options, { replace });
            } else {
                const navigateQuery = filterQuery(options.query);
                const navigateParams = filterQuery(options.params);
                const navigatePath = `${options.path}${navigateQuery ? `?${qs.stringify(navigateQuery)}` : ''}`;
                isUrl(navigatePath)
                    ? window.open(navigatePath, '_blank')
                    : navigate(navigatePath, {
                          replace: replace,
                          state: navigateParams
                      });
            }
        },
        []
    );

    const push = useCallback(
        <Qt extends Q = Q, Pt extends P = P>(
            options: RouterOptions<Qt, Pt> | string
        ) => {
            customNavigate(options, false);
        },
        []
    );

    const replace = useCallback(
        <Qt extends Q = Q, Pt extends P = P>(
            options: RouterOptions<Qt, Pt> | string
        ) => {
            customNavigate(options, true);
        },
        []
    );

    const go = useCallback((delta: number) => {
        navigate(delta);
    }, []);

    const back = useCallback(() => {
        go(-1);
    }, []);

    return {
        push,
        replace,
        go,
        back
    };
}
