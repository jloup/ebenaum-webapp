import * as React from 'react';

import { InputLabelProps, InputLabel } from './input-label'; 

interface InputTextProps extends InputLabelProps {
  onChange(text: string) :void;
  onEnter() :void;
  onFocus() :void;
  value: string;
  isFocus?: boolean
};

interface InputTextState {
  ref: React.RefObject<HTMLInputElement>
};

export class InputText extends React.Component<InputTextProps, InputTextState> {
  constructor(props: InputTextProps) {
    super(props);

    this.state = {
      ref: React.createRef<HTMLInputElement>(),
    };
   
  }

  _handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.props.onEnter();
      e.currentTarget.blur();
    }
  }

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.onChange(e.currentTarget.value);
  }

  componentDidUpdate(prevProps: InputTextProps, prevState: InputTextState) {
    if (!prevProps.isFocus && this.props.isFocus && this.state.ref.current !== null) {
      this.state.ref.current.focus();
    } 
  }
 
  componentDidMount() {
    if (this.props.isFocus && this.state.ref.current !== null) {
      this.state.ref.current.focus();
    } 
  }

  render() {
    return (
      <React.Fragment>
        <InputLabel {...this.props} />
        <input
          id={this.props.name}
          ref={this.state.ref}
          onChange={this.onChange}
          onKeyPress={this._handleKeyPress}
          className='q-response-text'
          type='text'
          placeholder='Taper votre réponse…'
          onFocus={this.props.onFocus}
          value={this.props.value}
        />
      </React.Fragment>
    );
  }
}
