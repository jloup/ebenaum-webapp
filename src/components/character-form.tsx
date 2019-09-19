import * as React from 'react';

import { Traits } from './abilities';
import { Camps, Occupations, Races } from './asset';
import { AbilityConfig, AbilityState, FormBuilder, InputConfig, InputState, SelectConfig, SelectState, TextConfig, TextState } from './form-builder';

interface CharacterFormProps {
  traitsPoints: number;
};

interface CharacterFormState {
  index: number;

  traits: Traits;
  traitsPoints: number;
  name: string;
  occupation: number;
  race: number;
  camp: number;
  email: string;
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
      traits: emptyTraits(),
      traitsPoints: this.props.traitsPoints,
      name: '',
      email: '',
      occupation: -1,
      race: -1,
      camp: -1,
    };
  }

  onDone = () => {
    console.log(this.form());
  }

  onChange = (ref: string, value: InputState) :void => {
    if (ref === 'name') {
      const v = value as TextState;

      this.setState({ name: v.value });
    }

    if (ref === 'email') {
      const v = value as TextState;

      this.setState({ email: v.value });
    }

    if (ref === 'race') {
      const v = value as SelectState;

      this.setState({ race: v.selected.length > 0 ? v.selected[0] : -1 })
    }

    if (ref === 'camp') {
      const v = value as SelectState;

      this.setState({ camp: v.selected.length > 0 ? v.selected[0] : -1 })
    }

    if (ref === 'occupation') {
      const v = value as SelectState;

      this.setState({ occupation: v.selected.length > 0 ? v.selected[0] : -1 })
    }

    if (ref === 'abilities') {
      const v = value as AbilityState;
      
      this.setState({ traitsPoints: v.points, traits: v.traits })
    }
  }

  onInputSelect = (index: number) :void => {
    this.setState({ index: index });
  }

  computeTraitsBonus = () :Traits => {
    const traits = emptyTraits();

    if (this.state.race === 0) {
      traits.endurance += 1;
    }

    return traits
  }

  form = () :any => {
    return {
      name: this.state.name,
      email: this.state.email,
      race: this.state.race !== -1 ? Races[this.state.race].ref : 'none',
      camp: this.state.camp !== -1 ? Camps[this.state.camp].ref : 'none',
      occupation: this.state.occupation !== -1 ? Occupations[this.state.occupation].ref : 'none',
      abilities: addTraits(this.state.traits, this.computeTraitsBonus()),
    };
  }

  buildForm = () :InputConfig[] => {
    return [
      new TextConfig('name', 'Quel est votre nom/prénom ?', this.state.name),
      new TextConfig('email', 'Quel est votre email ?', this.state.email),
      new SelectConfig('camp', 'Quel camp souhaitez-vous rejoindre ? ?', this.state.camp === -1 ? [] : [this.state.camp], Camps),
      new SelectConfig('race', 'Quelle race de personnage voulez-vous jouer ?', this.state.race === -1 ? [] : [this.state.race], Races),
      new SelectConfig('occupation', 'Quelle est l\'occupation de votre personnage ?', this.state.occupation === -1 ? [] : [this.state.occupation], Occupations),
      new AbilityConfig('abilities', '', this.state.traitsPoints, this.state.traits, this.computeTraitsBonus()),
    ]; 
  }

  render() {
    return (
      <React.Fragment>
        <FormBuilder
          onDone={this.onDone}
          formElements={this.buildForm()}
          onChange={this.onChange}
          onInputSelect={this.onInputSelect}
          index={this.state.index}
          isStarted={true}
        />
      </React.Fragment>
    );
  }
}
