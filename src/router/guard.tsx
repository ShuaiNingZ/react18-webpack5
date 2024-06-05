import type { RouterType } from '@/router';
import type { RouteType, RouterOptions } from '@/router/types.ts';
import React, {
    PropsWithChildren,
    useEffect,
    useState,
    useCallback
} from 'react';
import { RouterProvider } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { routes } from '@/router/routes/routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { useRoute, useRouter } from '@/router/hooks.ts';
import { RouterLoading } from '@/router/loading.tsx';
import { formatRoutes } from '@/router/helper.ts';
import { isString } from '@/utils/isType.ts';

NProgress.configure({ showSpinner: false });

type RouterGuardNext = (
    options?: (RouterOptions & { replace?: boolean }) | string
) => void;

let isNProgress = true;

export async function routerBeforeEach(
    route: RouteType,
    next: RouterGuardNext
) {
    if (isNProgress) {
        NProgress.start();
        isNProgress = false;
    }
    if (route.match) {
        const children = route.match.children || [];
        if (!children.length) {
            NProgress.done();
            isNProgress = true;
        }
    }
    next();
}

/**
 * 路由守卫组件
 */
export function RouterGuard({
    children,
    render
}: PropsWithChildren<{
    render?: React.ReactNode;
}>) {
    const permission = formatRoutes(routes);
    const route = useRoute(permission);
    const router = useRouter();
    // console.log(route, router);
    // const { t } = useTranslation();
    const [auth, setAuth] = useState(false);

    const next: RouterGuardNext = useCallback((options) => {
        if (options) {
            const _replace = !!(!isString(options) && options.replace);
            if (_replace) {
                router.replace(options);
            } else {
                router.push(options);
            }
        }
        setAuth(true);
    }, []);

    useEffect(() => {
        routerBeforeEach(route, next);
    }, []);

    return <>{auth ? children || render || RouterLoading : RouterLoading}</>;
}
