import classnames from 'classnames';
import * as React from 'react';

class Checkmark extends React.Component<any, any> {
  render() {
    return (
      <svg className='checkmark' width="16" height="13" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="nonzero" d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"></path>
      </svg>
    );
  }
}

export interface Level {
  name: string;
  description?: string
};

interface AbilitySelectProps {
  levels: Level[];
  selected: number;
  onChoice(selected: number) :void;
  points: number;
  bonus?: number;
};

interface AbilitySelectState {
};

function abilityLevel(index: number) :string {
  switch(index) {
    case 0:
      return '-2';
    case 1:
      return '-1';
    case 2:
      return '00';
    case 3:
      return '+1';
    case 4:
      return '+2';
    case 5:
      return '+3';
    case 6:
      return '+4';
    default:
      return '+0';
  }
}

export class AbilitySelect extends React.Component<AbilitySelectProps, AbilitySelectState> {
  constructor(props: AbilitySelectProps) {
    super(props);
  }

  maxLevel = () :number => {
    let modifier = 0
    if (this.props.selected !== -1) {
      modifier = this.props.selected - 2;
    }

    if (this.props.bonus) {
      modifier += this.props.bonus;
    }

    return this.props.points + modifier;
  }

  minLevel = () :number => {
    if (!this.props.bonus) {
      return -2;
    }
    return this.props.bonus - 2;
  }

  onClick = (index: number) :void => {
    if ((index - 2) > this.maxLevel() || (index - 2) < this.minLevel()) {
      return;
    }
    this.props.onChoice(index - (this.props.bonus || 0));
  }

  render() {
    const selected = this.props.selected + (this.props.bonus || 0);
    const levels = this.props.levels.map((ability, index) => {
      const level = index - 2;
      const checkmark = selected === index ? <Checkmark/> : null ;
      const isActive = (level >= this.minLevel()) && (level <= this.maxLevel());
      return (
        <li 
          key={index}
        >
          <div className='level'>{abilityLevel(index)}</div>
          <div
            className={classnames('input-select-choice', { selected: selected === index, active: isActive, disabled: !isActive })}
            onClick={this.onClick.bind(this, index)}
          >
            <div>{ability.name} {checkmark}</div>
            <p className={classnames('description', { hidden: ability.description === undefined } )}>
              {ability.description}
            </p>
          </div>
        </li>
      );
    });

    return (
      <React.Fragment>
        <div className='q-select'>
          <ul className='q-response-select'>
            {levels}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
