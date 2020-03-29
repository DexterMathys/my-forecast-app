import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '../autocomplete';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './style.css';

const useStyles = makeStyles((theme) => ({
    select: {
        color: '#fff'
    },
  }
));

function Page(props) {
    const {
        text,
        unit,
        suggestions,
        onChangeText,
        onChangeSelection,
        onHandleChangeUnit
    } = props;

    const classes = useStyles();
    
    return (
        <AppBar position="static">
            <Toolbar className="appbar">
                <Grid container>
                    <Grid 
                        item 
                        xs={4} 
                    >
                        <Typography 
                            variant="h6" 
                            color="inherit"
                        >
                            My Forecast App
                        </Typography>
                    </Grid>

                    <Grid 
                        item 
                        xs={4} 
                    >
                        <Autocomplete 
                            text={text}
                            suggestions={suggestions}
                            onChangeText={onChangeText}
                            onChangeSelection={onChangeSelection}
                        />
                    </Grid>

                    <Grid 
                        item 
                        xs={4} 
                        align="right" 
                    >
                        <FormControl>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={unit}
                                onChange={onHandleChangeUnit}
                                autoWidth
                                className={classes.select}
                            >
                                <MenuItem value={'imperial'}>
                                    F°
                                </MenuItem>
                                <MenuItem value={'metric'}>
                                    C°
                                </MenuItem>
                                <MenuItem value={'default'}>
                                    K°
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Page;