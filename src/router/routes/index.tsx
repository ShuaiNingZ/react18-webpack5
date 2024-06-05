import type { RouteRecord, RouteRecordCase } from '@/router/types';

export const BasicLayout = 'BasicLayout';

export const menuRoutes = [
    {
        path: '/systemConfig',
        element: 'LAYOUT',
        meta: {
            title: '系统设置',
            icon: 'systemManagement'
        },
        children: [
            {
                path: 'basicSetting',
                element: 'PARENT_LAYOUT',
                meta: {
                    title: '基础设置',
                    icon: 'jichushezhi'
                },
                children: [
                    {
                        path: 'systemArguments',
                        element: 'SYSTEM_ARGUMENTS',
                        meta: {
                            title: '系统参数'
                        }
                    },
                    {
                        path: 'operationLog',
                        element: 'OPERATION_LOG',
                        meta: {
                            title: '操作日志'
                        }
                    },
                    {
                        path: 'abnormalTask',
                        element: 'PARENT_LAYOUT',
                        meta: {
                            title: '异常任务'
                        },
                        children: [
                            {
                                path: 'clearAbnormalTask',
                                element: 'NETWORK_CONTROL',
                                meta: {
                                    title: '清除异常任务'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                path: 'permissionModule',
                element: 'PARENT_LAYOUT',
                meta: {
                    title: '权限',
                    icon: 'quanxian'
                },
                children: [
                    {
                        path: 'userManage',
                        meta: {
                            title: '用户管理'
                        },
                        children: [
                            {
                                path: 'createUser',
                                element: 'CREATE_USER',
                                meta: {
                                    title: '创建用户'
                                }
                            },
                            {
                                path: 'queryUser',
                                element: 'QUERY_USER',
                                meta: {
                                    title: '查询用户'
                                }
                            }
                        ]
                    },
                    {
                        path: 'roleManage',
                        name: 'roleManage',
                        element: 'PARENT_LAYOUT',
                        meta: {
                            title: '角色管理'
                        },
                        children: [
                            {
                                path: 'createRole',
                                element: 'CREATE_ROLE',
                                meta: {
                                    title: '创建角色'
                                }
                            },
                            {
                                path: 'queryRole',
                                element: 'QUERY_ROLE',
                                meta: {
                                    title: '查询角色'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
] as RouteRecordCase[];

export const routes = [
    {
        path: '/login',
        element: 'login',
        meta: {}
    },
    {
        path: '/',
        element: 'App',
        // children: menuRoutes,
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
