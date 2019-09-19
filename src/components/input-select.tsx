import classnames from 'classnames';
import * as React from 'react';

import { InputLabelProps, InputLabel } from './input-label'; 

class Checkmark extends React.Component<any, any> {
  render() {
    return (
      <svg className='checkmark' width="16" height="13" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="nonzero" d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"></path>
      </svg>
    );
  }
}

export interface Choice {
  value: string;
  description?: string;
};

interface InputSelectProps extends InputLabelProps {
  choices: Choice[];
  multi?: boolean;
  selected: number[];
  onChoice(selected: number[]) :void;
};

interface InputSelectState {
};

export class InputSelect extends React.Component<InputSelectProps, InputSelectState> {
  constructor(props: InputSelectProps) {
    super(props);
  }

  onClick = (index: number) :void => {
    let selected = this.props.selected;
    const multi  =  this.props.multi || false;
    const indexOf = selected.indexOf(index);

    if (indexOf !== -1) {
      selected.splice(indexOf, 1);
    } else {
      selected.push(index);
    }

    if (!multi && selected.length > 1) {
      selected = [selected[1]];
    }

    this.props.onChoice(selected);
  }

  render() {
    const choices = this.props.choices.map((choice, index) => {
      const checkmark = this.props.selected.indexOf(index) !== -1 ? <Checkmark/> : null ;
      return (
        <li 
          key={index}
          className={classnames('input-select-choice', { selected: this.props.selected.indexOf(index) !== -1, active: true })}
          onClick={this.onClick.bind(this, index)}
        >
          <div>{index + 1}. {choice.value} {checkmark}</div>
          <p className={classnames('description', { hidden: choice.description === undefined } )}>{choice.description}</p>
      </li>
      );
    });

    return (
      <React.Fragment>
        <InputLabel {...this.props} />
        <div className='q-select'>
          <ul className='q-response-select'>
            {choices}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
