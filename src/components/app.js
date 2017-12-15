import React, { Component } from 'react';
import SearchInput from '../containers/SearchInput';
import ListWeather from '../containers/ListWeather';
export default class App extends Component {
  render() {
    return (
      <div>
        <SearchInput /> 
        <ListWeather /> 
      </div>
    );
  }
}
