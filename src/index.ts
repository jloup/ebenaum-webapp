import * as React from 'react';

import * as App from './app';
import { Home } from './home';

import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/night.css';
import './css/style.css';

App.route('/', (context: any) => {
  App.mount(
    React.createElement(Home, { }, [])
  );
});

App.start();
