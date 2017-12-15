import _ from 'lodash';
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';

class ListWeather extends Component{
    renderWeather(cityData){
        // @Todo : have to make average temprature
        // let percentageTemprature = temprature.map( temprature => _.ceil(temprature));
        // console.log('percentageTemprature', percentageTemprature);
        let tempratureCollection = cityData.list.map(value => value.main.temp ),
            humidityCollection = cityData.list.map(value => value.main.humidity ),
            pressureCollection = cityData.list.map(value => value.main.pressure ),
            currentWeatherCollection = cityData.list[0].main;
            const {temp, humidity, pressure} = currentWeatherCollection;
        return(
            <tr key={cityData.city.id}>
                <td>{cityData.city.name}</td>
                <td>
                    <Chart data={tempratureCollection} color="#1c8cdc" />
                    <div className="text-left">{Math.ceil(temp - 273.15)} (°C)</div>
                </td>
                <td>
                    <Chart data={humidityCollection} color="#1c8cdc" />
                    <div className="text-left">{humidity} (%rh)</div>
                </td>
                <td>
                    <Chart data={pressureCollection} color="#1c8cdc" />
                    <div className="text-left">{pressure} (P)</div>
                </td>
            </tr>
        )
    }
    render(){
        return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temprature</th>
                        <th>Humidity</th>
                        <th>Pressure</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {weather: state.weather}
}

export default connect(mapStateToProps)(ListWeather);
