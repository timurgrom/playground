import './root.scss';

import React, { PropTypes }  from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import { Drawer, AppBar } from 'material-ui';

import { ENV } from 'constants/env';

@observer
export class Root extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  addActive() {

  }

  render() {
    return (
      <div className="root">
        { ENV.NODE_ENV === 'development' && <DevTools /> }

        <Drawer>
          <AppBar
            showMenuIconButton={ false }
            title={ 'Testing Ground' }
          />
        </Drawer>

        <div className="container">
          <main className="content">
            { this.props.children }
          </main>

        </div>
      </div>
    );
  }
}
