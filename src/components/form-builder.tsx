import * as React from 'react';

import { FormElement } from './form-element';
import { Head } from './head';
import { InputSelect, Choice } from './input-select';
import { Abilities, Traits } from './abilities';
import { InputText } from './input-text';
import { InputTextArea } from './input-textarea';

class FormElementConfig {
  name: string;
  text: string;

  constructor(name: string, text: string) {
    this.name = name;
    this.text = text;
  }
}

export class TextConfig extends FormElementConfig {
  value: string;

  constructor(name: string, text: string, value: string) {
    super(name, text);
    this.value = value;
  }
}

export class TextareaConfig extends TextConfig {}

export class AbilityConfig extends FormElementConfig {
  points: number;
  bonusTraits: Traits;
  traits: Traits;

  constructor(name: string, text: string, points: number, traits: Traits, bonus: Traits) {
    super(name, text);
    this.points = points;
    this.bonusTraits = bonus;
    this.traits = traits;
  }
}

export class SelectConfig extends FormElementConfig {
  selected: number[];
  choices: Choice[];

  constructor(name: string, text: string, selected: number[], choices: Choice[]) {
    super(name, text);
    this.selected = selected;
    this.choices = choices;
  }
}

export type InputConfig = TextConfig|TextareaConfig|AbilityConfig|SelectConfig;

export interface TextState {
  value: string;
}

export interface AbilityState {
  points: number;
  traits: Traits;
}

export interface SelectState {
  selected: number[];
}

export type InputState = TextState|AbilityState|SelectState;

interface FormBuilderProps {
  formElements: InputConfig[];

  onInputSelect(index: number) :void;
  onChange(ref: string, value: InputState) :void;


  index: number;
  isStarted: boolean;
  onDone() :void;
}

interface FormBuilderState {}

export class FormBuilder extends React.Component<FormBuilderProps, FormBuilderState> {
  constructor(props: FormBuilderProps) {
    super(props);
  }

  focusInput = (index: number) => {
    if (index !== this.props.index) {
      this.props.onInputSelect(index);
    }
  }
 
  onTextInput = (index: number, value: string) => {
    this.props.onChange(this.props.formElements[index].name, { value: value });
  }

  onChoice = (index: number, selected: number[]) => {
    if (selected.length > 0) {
      this.props.onChange(this.props.formElements[index].name, { selected: selected });
      this.onOk();
    }
  }

  onAbilityChoice = (index: number, config: AbilityConfig, branch: string, level: number) => {
    let points = config.points;
    const traits = config.traits;
    const current = traits[branch];
    const bonus = config.bonusTraits[branch];

    traits[branch] = level

    points = points + current + bonus - bonus - level;
    
    this.props.onChange(this.props.formElements[index].name, { traits: traits, points: points });
  }

  mustShowButton = (index: number) :boolean => {
    if (index !== this.props.index) {
      return false;
    }

    const formElement = this.props.formElements[index];

    if (formElement instanceof AbilityConfig) {
      return formElement.points === 0;
    }

    if (formElement instanceof TextConfig) {
      return formElement.value !== '';
    }
  
    if (formElement instanceof SelectConfig) {
      return formElement.selected.length > 0;
    }

    return true;
  }

  onOk = () => {
    const index = this.props.index + 1;
    this.props.onInputSelect(index);

    if (index === this.props.formElements.length) {
      this.props.onDone();
    }
  }

  buildInput = (config: InputConfig, index: number) :JSX.Element => {
    if (config instanceof TextConfig) {
      return <InputText
        name={config.name}
        text={config.text}
        value={config.value}
        onEnter={this.onOk}
        onChange={this.onTextInput.bind(this, index)}
        isFocus={index === this.props.index}
        onFocus={this.focusInput.bind(this, index)}
      />;
    }
    
    if (config instanceof TextareaConfig) {
      return <InputTextArea
        name={config.name}
        text={config.text}
        value={config.value}
        onEnter={this.onOk}
        onChange={this.onTextInput.bind(this, index)}
        isFocus={index === this.props.index}
        onFocus={this.focusInput.bind(this, index)}
      />;
    }
    
    if (config instanceof SelectConfig) {
      return <InputSelect
        name={config.name}
        text={config.text}
        multi={false}
        onChoice={this.onChoice.bind(this, index)}
        choices={config.choices}
        selected={config.selected}
      />;
    }
    
    if (config instanceof AbilityConfig) {
      return <Abilities
        name='abilities'
        text={'Choix des caractéristiques (' + config.points + ' points restant)'}
        onAbilityChoice={this.onAbilityChoice.bind(this, index, config)}
        traits={config.traits}
        traitsBonus={config.bonusTraits}
        points={config.points}
      />;
    }

    return <React.Fragment></React.Fragment>;
  }

  onStart = () => {
  }

  render() {
    return (
      <React.Fragment>
      <Head showButton={!this.props.isStarted} onClick={this.onStart}/>
      <div className='test'>
        {
          this.props.formElements.map((formElement, index) => {
            return (
              <FormElement
                key={index}
                onOk={this.onOk}
                onFocus={this.focusInput.bind(this, index)}
                isFocus={index === this.props.index}
                element={this.buildInput(formElement, index)}
                showButton={this.mustShowButton(index)}
              />
            );
          })
        }
      </div>
      </React.Fragment>
    );
  }
}
