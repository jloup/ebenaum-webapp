import * as React from 'react';

import * as App from './app';

export class Home extends React.Component<any, any> {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className='spacer'></div>
        <div className='container'>
          <Manifest />
        </div>
        <div className='spacer'></div>
        <ErenthyrmHeading />
        <div id='history'>
          <div className='spacer'></div>
          <div className='container heading'>
            <div className='row text-center'>
              <div className='offset-md-4 col-md-4'><h2>Historique</h2></div>
            </div>
          </div>
          <div className='spacer-s'></div>
          <History />
          <History />
        </div>
      </React.Fragment>
    );
  }
}

export class Header extends React.Component<any, any> {
  render() {
    return (
      <header>
        <div className='container'>
          <nav className='navbar navbar-light navbar-expand-md'>
            <div className='navbar-brand logo'>Ebenaum</div> 
            <div className='navbar-collapse'>
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'><a className='nav-link text-center'>GN 2020</a></li>
              </ul>
            </div> 
          </nav>
        </div>
      </header>
    );
  }
}

export class Manifest extends React.Component<any, any> {
  render() {
    return (
      <React.Fragment>
        <div className='row justify-content-center text-center manifest'>
          <div className='col-8'>
            <div className='title'>Manifeste</div>
            <p>
              {App.c('manifeste')}
            </p> 
          </div>
        </div> 
      </React.Fragment>
    );
  }
}

export class ErenthyrmHeading extends React.Component<any, any> {
  render() {
    return (
      <React.Fragment>
      <div className='block'>
        <article id='next-gn'>
          <Stars n={40} />
          <div className='container'>
            <div className='spacer'></div>
            <div className='row justify-content-center text-center gn'>
              <div className='col-9'>
                <h2 className='title'>GN 2020 - Erenthyrm</h2>
                <div className='spacer-s'></div>
                <p>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p> 
                <div className='spacer-s'></div>
                <a className='button-link text-center'>Découvrir Erenthyrm</a>
              </div>
            </div>            
            <div className='spacer'></div>
          </div>
        </article>
      </div>
      </React.Fragment>
    );
  }
}

export class History extends React.Component<any, any> {
  render() {
    return (
      <React.Fragment>
      <div className='block history'>
        <article>
          <div className='container'>
            <div className='row'>
              <div className='col-md-5'>
                <h2>Ebenaum I</h2>
                <p>Juin 2007</p>
                <p>Château du Magnet</p>
              </div>
              <div className='offset-md-1 col-md-6'><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p></div>
            </div>            
          </div>
        </article>
      </div>
      </React.Fragment>
    );
  }
}

interface StarsProps {
  n: number;
};

export class Stars extends React.Component<StarsProps, any> {
  constructor(props: StarsProps) {
    super(props);
  }

  render() {
    const stars = [];

    for (let i = 0; i < this.props.n; i++) {
      stars.push(<div key={"star-" + i} className="container"><div className="star"></div></div>);
    }
    return (
      <React.Fragment>
        <div className="stars">
          {stars}
        </div>
      </React.Fragment>
    );
  }
}
