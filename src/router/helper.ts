import loadable from '@loadable/component';
import { RouteRecord, RouteRecordCase } from '@/router/types.ts';

const { NODE_ENV } = process.env;

const layoutContext = require.context('@/layout', true, /index\.tsx$/);
let layoutModules: IAnyObject | null = null;

export function asyncImportLayout() {
    let asyncLayout = null;
    if (NODE_ENV === 'development') {
        asyncLayout = () => import('../layout/index.tsx');
    } else {
        layoutModules = layoutModules || layoutContext('./index.tsx');
        asyncLayout = layoutModules!['../layout/index.tsx'];
    }
    return loadable(asyncLayout);
}

const pagesContext = require.context('@/pages', true, /index\.tsx$/);
let pagesModules: IAnyObject | null = null;

export function asyncImportPage(element: string) {
    let asyncPage = null;
    if (NODE_ENV === 'development') {
        asyncPage = () => import('../pages/' + element + '/index.tsx');
    } else {
        if (!pagesModules) {
            pagesModules = {};
            pagesContext.keys().forEach((key: string) => {
                pagesModules![key.replace(/(\.\/|index\.tsx$)/g, '')] =
                    pagesContext(key).default;
            });
        }
        asyncPage = pagesModules[`../pages/${element}/index.tsx`];
    }
    return loadable(asyncPage);
}

/**
 * 格式化 路由
 */
export function formatRoutes(
    routes: RouteRecordCase[],
    parentFullPath: string = ''
): RouteRecord[] {
    return routes.map((route) => {
        const fullPath = parentFullPath
            ? `${parentFullPath === '/' ? '' : parentFullPath}/${route.path}`
            : route.path;
        return {
            ...route,
            fullPath,
            children: route.children
                ? formatRoutes(route.children, fullPath)
                : []
        };
    });
}
