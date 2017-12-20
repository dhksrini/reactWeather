import _ from 'lodash';
import React, { Component } from 'react';
import { fetchWeather, searchCities, getCities } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SearchInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: '',
            cityCollection: [],
            autoSuggestions: []
        }

        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.bindQuery = this.bindQuery.bind(this);
        // this.throttleSearch = this.throttleSearch.bind(this);
        this.suggestions = [];
        this.suggestionsList = [];
        this.onPressEnter = '';
    }
    componentWillMount(){
        let url = './src/cityList.json'
        this.props.getCities(url).then(() => {
            if(this.props.initCities !== null ) {
                let data = this.props.initCities[0];
                let cityCollection = [];
                let indiaCities = data.map( (value, index) => {
                    if(value.country == 'IN'){
                        cityCollection.push(value.name);
                    }
                });
                this.setState({cityCollection: cityCollection});
            } else{
                this.setState({cityCollection: 'loading...'})
            }
        });
    }
    bindQuery(event){
        let listLi = [],
            inputValue = event.target.value,
            formated;
            if(inputValue.length != 0){
                let captalizeFirstLetter = (val) => {
                    return inputValue[0].toUpperCase() + val.slice(1);
                }
                formated = captalizeFirstLetter(inputValue);
                this.props.fetchCities(formated);
                this.suggestions = _.filter(this.state.cityCollection, _.matches(formated))
                this.suggestionsList = _.map(this.suggestions, (value) => {
                    listLi.push(value);
                    return listLi;
                }); 
                this.onPressEnter = this.suggestions[0];           
                this.setState({
                    autoSuggestions: listLi, 
                    form: formated
                });
            } else if(inputValue.length <= 0){ 
                console.log('clear all');
                formated = ''; 
                listLi = []
                this.setState({
                    autoSuggestions: [],
                    form: formated
                });
            }
    }

    onSearchSubmit(event){
        event.preventDefault();
        if(this.state.form.length >= 2){
            this.props.fetchWeather(this.onPressEnter);
            this.setState({form: '', autoSuggestions: []});
        }
    }
    // when click on auto suggestion list
    // setState 
    onSelectList(event){
        this.props.fetchWeather(event);
        this.setState({autoSuggestions: [], form: ''})
    }
    render(){
        // console.log('search keyword', this.props)
        return (
            <form onSubmit={this.onSearchSubmit} className="searchWeatherForm">
                <div className="stickFormHeader">
                    <div className="input-group">
                        <input 
                            type="text" 
                            value={this.state.form} 
                            className="form-control" 
                            placeholder="Type cities" 
                            onChange={ this.bindQuery }
                        />
                        <span className="input-group-btn">
                            <button 
                                className="btn btn-primary" 
                                type="submit" >Search</button>
                        </span>
                    </div>
                    <div>
                        {
                            this.state.autoSuggestions.length >= 1 ? <ol className="autosuggest">
                            {
                                this.state.autoSuggestions.map((value, index) => {
                                    return <li onClick={ () => this.onSelectList(value) } key={index}>{value}</li> 
                                })
                            }
                            </ol> : null
                        }
                    </div>
                </div>
                {/* <div style={{padding: '10px', textTransform: 'capitalize'}}>
                    <p>{this.state.form.length > 2 ?  <span><strong>Searching: </strong>{this.state.form}</span>  : null}</p>
                </div> */}
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        weather: state.weather,
        searchCities: state.searchCities,
        initCities: state.getCities
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchWeather: bindActionCreators(fetchWeather, dispatch),
        fetchCities: bindActionCreators(searchCities, dispatch),
        getCities: bindActionCreators(getCities, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);




