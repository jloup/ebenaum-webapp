import * as React from 'react';

import { InputLabelProps, InputLabel } from './input-label'; 

interface InputTextAreaProps extends InputLabelProps {
  onChange(text: string) :void;
  onEnter() :void;
  onFocus() :void;
  value: string;
  isFocus?: boolean
};

interface InputTextAreaState {
  ref: React.RefObject<HTMLTextAreaElement>;
  rows: number;
  scrollHeight: number;
};

export class InputTextArea extends React.Component<InputTextAreaProps, InputTextAreaState> {
  constructor(props: InputTextAreaProps) {
    super(props);

    this.state = {
      ref: React.createRef<HTMLTextAreaElement>(),
      rows: 1,
      scrollHeight: 0,
    };
   
  }

  _handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.props.onEnter();
      e.currentTarget.blur();
      e.preventDefault()
    }
  }

  _handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
    }
  }

  onChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    this.props.onChange(e.currentTarget.value);
  }

  componentDidUpdate(prevProps: InputTextAreaProps, prevState: InputTextAreaState) {
    if (!prevProps.isFocus && this.props.isFocus && this.state.ref.current !== null) {
      this.state.ref.current.focus();
    }

    if (this.state.ref.current !== null &&
      (this.state.ref.current.scrollHeight - this.state.scrollHeight) > 10 &&
      this.state.rows === prevState.rows) {

      this.setState({ rows: this.state.rows + 1, scrollHeight: this.state.ref.current.scrollHeight });
      return;
    }

    if (this.state.ref.current !== null && this.state.ref.current.scrollHeight !== this.state.scrollHeight) {
      this.setState({ scrollHeight: this.state.ref.current.scrollHeight });    
    }
  }
 
  componentDidMount() {
    if (this.props.isFocus && this.state.ref.current !== null) {
      this.state.ref.current.focus();
    } 

    if (this.state.ref.current !== null) {
      this.setState({ scrollHeight: this.state.ref.current.scrollHeight});
    }
  }

  render() {
    return (
      <React.Fragment>
        <InputLabel {...this.props} />
        <textarea
          id={this.props.name}
          ref={this.state.ref}
          onChange={this.onChange}
          rows={this.state.rows}
          onKeyUp={this._handleKeyUp}
          onKeyDown={this._handleKeyDown}
          className='q-response-text'
          placeholder='Taper votre réponse…'
          onFocus={this.props.onFocus}
          value={this.props.value}
        />
      </React.Fragment>
    );
  }
}
