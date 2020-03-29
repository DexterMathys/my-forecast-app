import React, { Component } from 'react';
import Page from './page';
import {WEATHER_KEY} from '../../keys';

class Forecast extends Component {

    state = {
        currentItem: null,
        suggestions: [],
        error: null
    };
    
    componentDidMount() {
        // this.props.findCurrentItem(parseInt(this.props.match.params.itemId));
    }

    saveSuggestion = suggestion => {
        let suggestions = this.state.suggestions;
        if (suggestions.length === 0 || suggestions.find(n => n === suggestion) === undefined) {
            if (suggestions.length >= 5) {
                suggestions.shift();
            }
            suggestions.push(suggestion);
            this.setState({suggestions});
        }
    }

    getWeather = async text => {
        const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${WEATHER_KEY}&units=metric`;
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);

        let currentItem = null;
        let error = data.message;
        if (data.cod === 200) {
            currentItem = {
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                temp_min: data.main.temp_min,
                temp_max: data.main.temp_max,
                description: data.weather[0].description,
                wind_speed: data.wind.speed,
                city: data.name,
                country: data.sys.country
            };
            error = null;
        }

        this.setState({
            currentItem: currentItem,
            error: error
        });

        return data;
    }

    render() {

        return (
            <Page
                currentItem={this.state.currentItem}
                error={this.state.error}
                suggestions={this.state.suggestions}
                saveSuggestion={this.saveSuggestion}
                getWeather={this.getWeather}
            />
        );
    }
}

export default Forecast;