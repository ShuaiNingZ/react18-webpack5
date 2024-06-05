import { createBrowserRouter } from 'react-router-dom';

import { RoutesRender } from '@/router/routes/index.tsx';
import { routes } from '@/router/routes/routes.ts';
import { formatRoutes } from '@/router/helper.ts';

const Router = createBrowserRouter(RoutesRender(formatRoutes(routes)));

export type RouterType = typeof Router;

export default Router;
