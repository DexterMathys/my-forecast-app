import React, { Component } from 'react';
import Page from './page';

class IAppBar extends Component {
    state = {
        text: ''
    }

    /*
     * Function for update the text of the searh box
     */
    onChangeText = text => {
        this.setState({text});
    }

    /*
     * Functino for request to Open Weather Map and save the suggestion
     */
    onChangeSelection = async text => {
        this.setState({text});

        const data = await this.props.getWeather(text);
        
        // if 200 OK save the suggestion
        if (data.cod === 200) {
            this.props.saveSuggestion(text);
        }
    }

    /*
     * Function for update the unit and request to Open Weather Map
     */
    onChangeUnit = async event => {
        await this.props.onHandleChangeUnit(event);

        if (this.state.text.trim() !== '') {
            this.onChangeSelection(this.state.text);
        }

    }

    render() {
        const { text } = this.state;
        const { unit, suggestions } = this.props;

        return (
            <Page 
                text={text}
                unit={unit}
                suggestions={suggestions}
                onChangeText={this.onChangeText}
                onChangeSelection={this.onChangeSelection}
                onHandleChangeUnit={this.onChangeUnit}
            />
        );
    }
}


export default IAppBar;