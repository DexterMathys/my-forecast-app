import React, { Component } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import './style.css';

class Autocomplete extends Component {
    state = {
        isOpen: false,
    };

    render() {
        const {
            suggestions,
            onChangeText,
            onChangeSelection,
            text,
        } = this.props;
        
        const {
            isOpen,
        } = this.state;

        return (
            <div className="main-container">
                <div className="container-icon">
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="City name"
                    value={text}
                    style={{ width: '100%' }}
                    onChange={(event) => {
                        const newText = event.target.value;

                        onChangeText(newText);

                        if (!isOpen && newText) {
                            this.setState({ isOpen: true });
                        } else if (isOpen && !newText) {
                            this.setState({ isOpen: false });
                        }
                    }}
                    onBlur={() => {
                        setTimeout(() => this.setState({ isOpen: false }), 100);
                    }}
                    onFocus={() => {
                        if (text) {
                            this.setState({ isOpen: true });
                        }
                    }}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter' && text.trim() !== '') {
                            onChangeSelection(text);
                            this.setState({ isOpen: false });
                        }
                    }}
                />
                {isOpen &&
                <Paper className="container-results" square>
                    {suggestions.map(suggestion =>
                    <MenuItem
                        key={suggestion}
                        component="div"
                        onClick={() => {
                            onChangeSelection(suggestion);
                            this.setState({ isOpen: false });
                        }}
                    >
                        {suggestion}
                    </MenuItem>)}
                </Paper>}
            </div>
        );
    }
}

export default Autocomplete;