import React, { Component } from 'react';
import './BundleFilter.css';

import Hero from './../Hero/Hero';

class BundleFilter extends Component {
  render() {
    const { heroes, bundleId } = this.props;

    return (
      <div className="bundleFilter">
        {heroes.map((hero, idx) => {
          if (hero.bundleId.indexOf(bundleId) !== -1 && !hero.isChecked) {
            return (
              <Hero
                key={idx}
                hero={hero}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

export default BundleFilter;
