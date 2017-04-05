import 'normalize.css/normalize.css';
import 'assets/styles/main.scss';

import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { muiTheme } from 'core/theme';
import { Navigation } from 'components/navigation/navigation';

// Fix tap events on mobile
injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={ muiTheme }>
    <Navigation />
  </MuiThemeProvider>,
  document.querySelector('#root')
);
