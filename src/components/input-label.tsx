import * as React from 'react';

class QuestionArrow extends React.Component<any, any> {
  render() {
    return (
     <svg width="11" height="10" xmlns="http://www.w3.org/2000/svg">
      <g fillRule="nonzero">
        <path d="M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z"></path>
        <path d="M8 4v2H0V4z"></path>
      </g>
    </svg>
    );
  }
}

export interface InputLabelProps {
  name: string
  text: string
  required?: boolean
};

export class InputLabel extends React.Component<InputLabelProps, any> {
  constructor(props: InputLabelProps) {
    super(props);
  }

  render() {
    const mandatoryText = this.props.required ? " *" : null;
    return (
      <React.Fragment>
        <div className='q-text'>
          <QuestionArrow/> <label htmlFor={this.props.name}>{this.props.text}{mandatoryText}</label><br/>
        </div>
      </React.Fragment>
    );
  }
}
