import type { RouteRecord } from '@/router/types.ts';
import { RouteObject, Navigate, Outlet } from 'react-router-dom';

import React from 'react';
import { asyncImportLayout, asyncImportPage } from '@/router/helper.ts';
import { RouterGuard } from '@/router/guard.tsx';
import { BasicLayout } from '@/router/routes/routes.ts';

let Layout: React.ComponentType | null = null;

function getLayout() {
    if (!Layout) {
        const LayoutComponent = asyncImportLayout();
        Layout = () => <RouterGuard render={<LayoutComponent />} />;
    }
    return Layout;
}

export function RoutesRender(routes: RouteRecord[]): RouteObject[] {
    return routes.map((route) => {
        const { index, element, redirect } = route;
        let children = route.children || [];
        if (children.length) {
            children = [
                {
                    index: true,
                    redirect: redirect || children[0].fullPath,
                    path: '',
                    fullPath: '',
                    meta: {}
                },
                ...children
            ];
        }
        let ElementComponent: React.ComponentType | null = null;
        if (index && redirect) {
            ElementComponent = () => <Navigate to={redirect} replace />;
        } else if (element) {
            if (element === BasicLayout) {
                ElementComponent = getLayout();
            } else {
                const PageComponent = asyncImportPage(element);
                ElementComponent = () => (
                    <RouterGuard render={<PageComponent />} />
                );
            }
        } else if (redirect) {
            if (children.length) {
                ElementComponent = Outlet;
            } else {
                ElementComponent = () => <Navigate to={redirect} replace />;
            }
        } else {
            ElementComponent = Outlet;
        }
        return {
            path: route.path || undefined,
            index: (route.index || undefined) as any,
            element: ElementComponent ? <ElementComponent /> : undefined,
            children: children.length ? RoutesRender(children) : undefined
        };
    });
}
