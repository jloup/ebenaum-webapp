import * as React from 'react';

import * as App from './app';
import { CharacterForm } from './forms/character-form';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

App.start().then(() => {
  App.route('/', (context: any) => {
    App.mount(
      React.createElement(CharacterForm, { traitsPoints: 7 }, [])
    );
  });

  App.go(location.pathname);
});

