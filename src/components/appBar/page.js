import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Autocomplete from '../autocomplete';
import Grid from '@material-ui/core/Grid';
import './style.css';

function Page(props) {
    const {
        text,
        suggestions,
        onChangeText,
        onChangeSelection
    } = props;
    
    return (
        <AppBar position="static">
            <Toolbar className="appbar">
                <Grid container>
                    <Grid item xs={4} >
                        <Typography variant="h6" color="inherit">
                            My Forecast App
                        </Typography>
                    </Grid>

                    <Grid item xs={4} >
                        <Autocomplete 
                            text={text}
                            suggestions={suggestions}
                            onChangeText={onChangeText}
                            onChangeSelection={onChangeSelection}
                        />
                    </Grid>

                    <Grid item xs={4} align="right" >
                        <AccountCircle />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Page;