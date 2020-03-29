import React, { Component } from 'react';
import Page from './page';

class IAppBar extends Component {
    state = {
        text: ''
    }

    onChangeText = text => {
        this.setState({text});

        // this.props.findSuggestions(text);
    }

    onChangeSelection = text => {
        this.setState({text});

        const data = this.props.getWeather(text);
        
        if (data.cod === 200) {
            this.props.saveSuggestion(text);
        }
    }

    render() {
        const { text } = this.state;
        const { suggestions } = this.props;

        return (
            <Page 
                text={text}
                suggestions={suggestions}
                onChangeText={this.onChangeText}
                onChangeSelection={this.onChangeSelection}
            />
        );
    }
}


export default IAppBar;