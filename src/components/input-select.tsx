import classnames from 'classnames';
import * as React from 'react';

import { InputLabelProps, InputLabel } from './input-label'; 
import { FormBuilderBaseConfig, InputConfig, NextConfigCallback } from './form-builder-base-config'; 
import { Checkmark } from './checkmark';

export interface Choice {
  value: string;
  description?: string;
};

export class InputSelectValue {
  indexes: number[];
  values: string[];

  constructor(indexes: number[], values: string[]) {
    this.indexes = indexes;
    this.values = values;
  }

  getValue = () :string => {
    if (this.indexes.length == 0) {
      return 'none';
    } else {
      return this.values[0];
    }
  }
}

export function BuildInputSelectValue(selected: number[], choices: Choice[]) :InputSelectValue {
  return new InputSelectValue(selected,choices.filter((choice, index) => {
    return selected.indexOf(index) !== -1;
  }).map((choice) => {
    return choice.value;
  }));
}

export class InputSelectConfig extends FormBuilderBaseConfig {
  _value: InputSelectValue;
  _choices: Choice[];
  _multi: boolean;

  constructor(name: string, text: string, value: InputSelectValue, choices: Choice[], multi: boolean) {
    super(name, text);
    this._value = value;
    this._choices = choices;
    this._multi = multi;
  }

  onChangeHandler = (onNextConfig: NextConfigCallback): ((change: InputSelectValue) => void) => {
    return (change: InputSelectValue) :void => {
      onNextConfig(new InputSelectConfig(this.name, this.text, change, this._choices, this._multi));
    }
  }

  build = (c: InputConfig) :JSX.Element => {
    return <InputSelect
      choices={this._choices}
      selected={this._value.indexes}
      name={this.name}
      text={this.text}
      multi={this._multi}
      onChoice={this.onChangeHandler(c.onNextConfig)}
    />;
  }

  value = () :InputSelectValue => {
    return this._value;
  }
}

interface InputSelectProps extends InputLabelProps {
  choices: Choice[];
  multi?: boolean;
  selected: number[];
  onChoice(change: InputSelectValue) :void;
};

export class InputSelect extends React.Component<InputSelectProps, any> {
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

    this.props.onChoice(new InputSelectValue(selected, this.props.choices.filter((choice, index) => {
      return selected.indexOf(index) !== -1;
    }).map((choice) => {
      return choice.value;
    })));
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
