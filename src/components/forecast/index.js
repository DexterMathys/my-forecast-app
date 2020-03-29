import React, { Component } from 'react';
import Page from './page';
// Key for Open Weather Map API
import {WEATHER_KEY} from '../../keys';

class Forecast extends Component {

    state = {
        unit: 'imperial',
        currentForecast: null,
        suggestions: [],
        error: null
    };

    /*
     * Function for save an suggestion
     * @param String suggestion
     */
    saveSuggestion = suggestion => {
        let suggestions = this.state.suggestions;
        // if suggestions is empty or suggestion isn't in array
        if (suggestions.length === 0 || suggestions.find(n => n === suggestion) === undefined) {
            // if array length is 5 then delete first element
            if (suggestions.length >= 5) {
                suggestions.shift();
            }
            suggestions.push(suggestion);
            this.setState({suggestions});
        }
    }

    /*
     * Function for delete a suggestion
     * @param String suggestion
     */
    deleteSuggestion = suggestion => {        
        let suggestions = this.state.suggestions;
        const index = suggestions.indexOf(suggestion);
        // if suggestion is in array then delete it
        if (index > -1) {
            suggestions.splice(index, 1);
            this.setState({suggestions});
        }
    }

    /*
     * Function for request to Open Weather Map API and save the forecast of a city name
     * @param String city
     */
    getWeather = async city => {
        // Params URL city name, API key and units (default: Kelvin, imperial: Farenheit, metric: Celsius)
        const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_KEY}&units=${this.state.unit}`;        
        const response = await fetch(API_URL);
        const data = await response.json();

        let currentForecast = null;
        let error = data.message;
        // if 200 OK then save current forecast
        if (data.cod === 200) {
            currentForecast = {
                main: data.weather[0].main,
                description: data.weather[0].description,
                lon: data.coord.lon,
                lat: data.coord.lat,
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                temp_min: data.main.temp_min,
                temp_max: data.main.temp_max,
                wind_speed: data.wind.speed,
                city: data.name,
                country: data.sys.country
            };
            error = null;
        }

        this.setState({
            currentForecast: currentForecast,
            error: error
        });

        return data;
    }

    /*
     * Function for change the unit
     * @param String event
     */
    onHandleChangeUnit = event => {
        // Values (default: Kelvin, imperial: Farenheit, metric: Celsius)
        this.setState({unit: event.target.value});
    }

    render() {
        return (
            <Page
                unit={this.state.unit}
                currentForecast={this.state.currentForecast}
                error={this.state.error}
                suggestions={this.state.suggestions}
                saveSuggestion={this.saveSuggestion}
                deleteSuggestion={this.deleteSuggestion}
                getWeather={this.getWeather}
                onHandleChangeUnit={this.onHandleChangeUnit}
            />
        );
    }
}

export default Forecast;