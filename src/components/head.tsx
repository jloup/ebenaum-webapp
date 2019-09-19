import * as React from 'react';

interface HeadProps {
  showButton: boolean;
  onClick() :void;
};

export class Head extends React.Component<HeadProps, any> {
  constructor(props: HeadProps) {
    super(props);
  }

  render() {
    let button = null;

    if (this.props.showButton) {
      button = <button type='button' className='form-button' onClick={this.props.onClick}>Commencer</button>;
    }

    return (
      <React.Fragment>
        <div id='head'>
          <h1>Inscription Erenthyrm I</h1>
          {button}    
        </div>
      </React.Fragment>
    );
  }
}
