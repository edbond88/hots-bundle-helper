import React, { Component } from 'react';
import classNames from 'classnames';

import './Hero.css';

class Hero extends Component {
  constructor(props) {
    super(props);

    this.onHeroClick = this.onHeroClick.bind(this);
  }

  onHeroClick() {
    const { heroClick } = this.props;
    const { id } = this.props.hero;

    if (heroClick) {
      heroClick(id);
    }
  }

  render() {
    const { name, cost, isChecked } = this.props.hero;

    const heroClasses = classNames('hero', {
      _checked: isChecked,
    });

    return (
      <div onClick={this.onHeroClick} className={heroClasses}>
        <span className="heroName">{name}</span>
        <span className="heroCost">{cost}</span>
      </div>
    );
  }
}

export default Hero;
