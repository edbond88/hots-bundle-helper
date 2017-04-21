import React, { Component } from 'react';
import './SelectList.css';

import Hero from './../Hero/Hero';

class SelectList extends Component {
  render() {
    const { heroes, heroClick } = this.props;
    return (
      <div className="SelectList">
        {heroes.map((hero, idx) => {
          return (
            <Hero
              key={idx}
              hero={hero}
              heroClick={heroClick}
            />
          );
        })}
      </div>
    );
  }
}

export default SelectList;
