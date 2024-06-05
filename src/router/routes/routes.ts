import type { RouteRecord, RouteRecordCase } from '@/router/types';

export const BasicLayout = 'BasicLayout';

export const menuRoutes = [] as RouteRecordCase[];

export const routes = [
    {
        path: '/login',
        element: 'Login',
        meta: {}
    },
    {
        path: '/',
        element: 'Home',
        children: menuRoutes,
        meta: {
            title: ''
        }
    },
    {
        path: '/404',
        element: 'error/404',
        meta: {}
    },
    {
        path: '/401',
        element: 'error/401',
        meta: {}
    }
] as RouteRecordCase[];

export const ErrorRoute: RouteRecord = {
    path: '*',
    redirect: '/404',
    fullPath: '',
    meta: {}
};
