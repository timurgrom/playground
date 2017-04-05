import { Router, browserHistory } from 'react-router';

import { Root } from 'components/root/root';
import { Dashboard } from 'components/dashboard/dashboard';

// Reference:
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md
const routes = [
  {
    path: '/',
    component: Root,
    indexRoute: {
      component: Dashboard
    }
  }
];

export const Navigation = () => (
  <Router history={ browserHistory } routes={ routes } />
);
