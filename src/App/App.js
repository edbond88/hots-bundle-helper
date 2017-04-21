import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import heroesList from './../data/heroesList.json';

import SelectList from './../SelectList/SelectList';
import BundleFilter from './../BundleFilter/BundleFilter';


const setLocalStorageData = (data) => {
  localStorage.setItem('localState', JSON.stringify(data));
};

class App extends Component {
  constructor(props) {
    super(props);

    this.heroClick = this.heroClick.bind(this);
    this.filterClick = this.filterClick.bind(this);

    if (!localStorage.getItem('localState')) {
      this.state = {
        heroes: heroesList.map((hero, idx) => {
          hero.isChecked = false;
          return hero;
        }),
        bundles: [
          { id: 1, name: 'Assasin', cost: 0},
          { id: 2, name: 'Flex', cost: 0},
          { id: 3, name: 'Support', cost: 0},
          { id: 4, name: 'Tank', cost: 0},
        ]
      };
    } else {
      this.state = JSON.parse(localStorage.getItem('localState'));
    }
  }

  componentWillMount() {
    this.calculateBundleCost();
    setLocalStorageData(this.state);
  }

  calculateBundleCost() {
    const { bundles, heroes } = this.state;

    this.setState({
      bundles: bundles.map((bundle, idx) => {
        bundle.cost = 0;
        heroes.forEach(hero => {
          if (hero.bundleId.indexOf(bundle.id) !== -1 && !hero.isChecked) {
            bundle.cost += hero.cost;
          }
        });
        return bundle;
      })
    });
  }

  heroClick(id) {
    this.setState({
      heroes: this.state.heroes.map((hero, idx) => {
        if (hero.id === id) {
          hero.isChecked = !hero.isChecked;
        }
        return hero;
      })
    });
    this.calculateBundleCost();

    setLocalStorageData(this.state);
  }

  filterClick(id) {
    this.setState({
      currentBundle: id
    });
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
        </div>
        <div className="l-in">
          <p>
            This is a helper for chosing <a href="http://us.battle.net/heroes/en/heroes20/megabundles/" target="_blank">bundle</a>
          </p>
          <h2 className="h2">
            Select the heroes that you already have
          </h2>

          <SelectList heroes={this.state.heroes} heroClick={this.heroClick} />

          {this.state.bundles.map((bundle, idx) => {
            return (
              <div key={idx}>
                <h3 className="h3">{bundle.name}: <span className="bundleCost">{bundle.cost} coins</span></h3>
                <BundleFilter heroes={this.state.heroes} bundleId={bundle.id} />
              </div>
              );
          })}
        </div>
        <div className="app-footer">
          <div className="l-in">
            created by <a href="http://edbond.name/" target="_blank">edbond.name</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
