import classnames from 'classnames';
import * as React from 'react';

import { AbilitySelect, Level } from './input-ability';

export interface AbilityBranch {
  title: string;
  key: string;
  levels: Level[];
  selected: number;
  bonus?: number;
}; 

interface AbilitiesBranchProps {
  name: string;
  branches: AbilityBranch[];
  onChoice(key: string, selected: number) :void;
  points: number;
};

export class AbilitiesBranch extends React.Component<AbilitiesBranchProps, any> {
  constructor(props: AbilitiesBranchProps) {
    super(props);
  }

  onChoice = (key: string, index: number) => {
    this.props.onChoice(key, index); 
  }

  render() {
    let width = '100%'
    if (document.documentElement.clientWidth >= 800) {
      width = 100 / this.props.branches.length + '%';
    }

    return (
      <React.Fragment>
      <div className='ability-branches'>
        <div className='title'>{this.props.name}</div>
        {
          this.props.branches.map((branch, index) => {
          return (
              <div
                key={branch.key}
                className={classnames('ability-branch full', { first: index === 0 })}
                style={{width: width}}
              >
                <div className='title'>{branch.title}</div>
                <AbilitySelect
                  levels={branch.levels}
                  selected={branch.selected}
                  bonus={branch.bonus}
                  onChoice={this.onChoice.bind(this, branch.key)}
                  points={this.props.points}
                />
              </div>
            );
          })
        }
      </div>
      </React.Fragment>
    );
  }
}
