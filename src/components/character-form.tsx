import * as React from 'react';

import { Traits } from './input-traits';
import { Camps, Occupations, Races } from './asset';
import { FormBuilder } from './form-builder';
import { InputTextConfig, InputTextValue } from './input-text';
import { InputTraitsConfig, InputTraitsValue } from './input-traits';
import { BuildInputSelectValue, InputSelectValue, InputSelectConfig } from './input-select';
import { InputTextAreaConfig } from './input-textarea';
import { FormBuilderElement } from './form-builder-base-config'; 

interface CharacterFormProps {
  traitsPoints: number;
};

interface CharacterFormState {
  index: number;
  traits: InputTraitsValue;
  name: string;
  occupation: number;
  race: number;
  camp: InputSelectValue;
  email: string;

  comment: string;
};

function emptyTraits() :Traits {
  return {
    gear: 0,
    dexterity: 0,
    endurance: 0,
    force: 0,
    discipline: 0,
    knowledge: 0,
    charisma: 0,
    will: 0,
  }
}

function addTraits(t1: Traits, t2: Traits) :Traits {
  return {
    gear: t1.gear + t2.gear,
    dexterity: t1.dexterity + t2.dexterity,
    endurance: t1.endurance + t2.endurance,
    force: t1.force + t2.force,
    discipline: t1.discipline + t2.discipline,
    knowledge: t1.knowledge + t2.knowledge,
    charisma: t1.charisma + t2.charisma,
    will: t1.will + t2.will,
  }
}

export class CharacterForm extends React.Component<CharacterFormProps, CharacterFormState> {
  constructor(props: CharacterFormProps) {
    super(props);

    this.state = {
      index: 0,
      traits: new InputTraitsValue(emptyTraits(), this.props.traitsPoints),
      name: '',
      email: '',
      occupation: -1,
      race: -1,
      camp: BuildInputSelectValue([], Camps),
      comment: '',
    };
  }

  onDone = () => {
    console.log(this.form());
  }


  onChange = (ref: string, value: any) :void => {
    const nextState = this.state;

    nextState[ref] = value;
    console.log(ref, value);

    this.setState(nextState);
  }

  computeTraitsBonus = () :Traits => {
    const traits = emptyTraits();

    if (this.state.race === 0) {
      traits.endurance += 1;
    }

    return traits;
  }

  onFormSelect = (index: number)  :void => {
    this.setState({ index: index });
  }

  form = () :any => {
    return {
      name: this.state.name,
      email: this.state.email,
      race: this.state.race !== -1 ? Races[this.state.race].ref : 'none',
      camp: this.state.camp.getValue(),
      occupation: this.state.occupation !== -1 ? Occupations[this.state.occupation].ref : 'none',
      abilities: addTraits(this.state.traits.traits, this.computeTraitsBonus()),
    };
  }

  buildForm = () :FormBuilderElement[] => {
    return [
      new InputTextConfig('name', 'Quel est votre nom/prénom ?', new InputTextValue(this.state.name)),
      new InputTextConfig('email', 'Quel est votre email ?', new InputTextValue(this.state.email)),
      new InputSelectConfig('camp', 'Quel camp souhaitez-vous rejoindre ? ?', this.state.camp, Camps, true),
      new InputTraitsConfig('traits', 'Yo ??', this.state.traits.points, this.state.traits.traits, this.computeTraitsBonus()),
    ]; 
  }

  render() {
    return (
      <React.Fragment>
        <FormBuilder
          index={this.state.index}
          onDone={this.onDone}
          onFormSelect={this.onFormSelect}
          formElements={this.buildForm()}
          isStarted={false}
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }
}
