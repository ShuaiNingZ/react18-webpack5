import type { TFunction, Namespace } from 'i18next';

export type RouteMetaTitle = Parameters<TFunction<Namespace, undefined>>[0];

// 路由元信息类型
export interface RouteMeta {
    // 名称
    title?: RouteMetaTitle;
    // 图标
    icon?: string;
    // 层级
    permsLevel?: number;
    // 是否不缓存
    keepAlive?: boolean;
    // 是否隐藏
    hidden?: boolean;
}

// 路由类型
export interface RouteRecord {
    path: string;
    fullPath: string;
    meta: RouteMeta;
    redirect?: string;
    element?: string;
    children?: RouteRecord[];
    index?: boolean | any;
}

// 路由类型
export type RouteRecordCase = Omit<RouteRecord, 'fullPath' | 'index'> & {
    children?: RouteRecordCase[];
};

export interface RouteLocation<
    Q extends IAnyObject = IAnyObject,
    P extends IAnyObject = IAnyObject
> {
    readonly path: string;
    readonly fullPath: string;
    readonly hash: string;
    readonly query: Q;
    readonly params: P;
}

export interface RouteMatched {
    readonly meta: RouteMeta;
    readonly match: RouteRecord;
    readonly matched: RouteRecord[];
}

export type RouteType = RouteLocation & RouteMatched;

export interface RouterOptions<
    Q extends IAnyObject = IAnyObject,
    P extends IAnyObject = IAnyObject
> {
    path: string;
    query?: Q;
    params?: P;
}
