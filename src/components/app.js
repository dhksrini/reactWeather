import React, { Component } from 'react';
import SearchInput from '../containers/SearchInput';
import ListWeather from '../containers/ListWeather';
export default class App extends Component {
  render() {
    return (
      <div className="wraper-container">
        <div className="attached-BG"></div>
        <div className="container"><h1 className="app-logo">react-Weather</h1></div>
        <div className="container wrapperZindex">
          <div>
            <SearchInput />
          </div>
          <ListWeather /> 
        </div>
      </div>
    );
  }
}
