import loadable from '@loadable/component';
import { RouteRecord, RouteRecordCase } from '@/router/types.ts';

const { NODE_ENV } = process.env;

// let layoutModules: IAnyObject | null = null;

export function asyncImportLayout() {
    let asyncLayout = null;
    asyncLayout = () => import('../layout/index.tsx');
    /*if (NODE_ENV === 'development') {
        asyncLayout = () => import('../layout/index.tsx');
    } else {
        const layoutContext = require.context('@/layout', true, /index\.tsx$/);
        layoutModules = layoutModules || layoutContext('./index.tsx');
        asyncLayout = layoutModules!['../layout/index.tsx'];
    }*/
    return loadable(asyncLayout);
}

const pagesModules: IAnyObject | null = null;

export function asyncImportPage(element: string) {
    let asyncPage = null;
    asyncPage = () => import('../pages/' + element + '/index.tsx');
    /*if (NODE_ENV === 'development') {
        asyncPage = () => import('../pages/' + element + '/index.tsx');
    } else {
        if (!pagesModules) {
            const pagesContext = require.context(
                '@/pages',
                true,
                /index\.tsx$/
            );
            pagesModules = {};
            pagesContext.keys().forEach((key: string) => {
                const moduleName = key.replace(/(\.\/|\/index\.tsx$)/g, '');
                console.log(
                    key,
                    moduleName,
                    element,
                    pagesContext(key).default
                );
                pagesModules![moduleName] = pagesContext(key).default;
            });
        }
        asyncPage = pagesModules[element];
    }*/
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
