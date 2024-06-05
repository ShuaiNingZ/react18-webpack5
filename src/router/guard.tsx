import React from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

type RouterGuardNext = (
    options?: (RouterOptions & { replace?: boolean }) | string
) => void;

export function RouterGuard({}) {
    return <></>;
}
