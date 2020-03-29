import React, { Fragment } from 'react';
import { Paper, Typography, CssBaseline, Grid, Button, IconButton } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Alert from '@material-ui/lab/Alert';
import AppBar from '../appBar';
import {
    layer, control, //name spaces
    Controls,     //group
    Map, Layers   //objects
  } from "react-openlayers";
import './style.css';

function Page(props) {
    const {
        unit,
        currentForecast,
        error,
        suggestions,
        saveSuggestion,
        getWeather,
        deleteSuggestion,
        onHandleChangeUnit
    } = props;

    return (
        <Fragment>
            <CssBaseline />

            <AppBar 
                unit={unit} 
                suggestions={suggestions} 
                saveSuggestion={saveSuggestion} 
                getWeather={getWeather} 
                onHandleChangeUnit={onHandleChangeUnit} 
            />

            <div className="details-page">
                <Paper
                    elevation={1}
                    className="paper-container"
                >
                    {currentForecast ?
                        (
                            <Fragment>
                                <Typography 
                                    gutterBottom 
                                    variant="h5" 
                                    component="h2" 
                                    align="center"
                                >
                                    {currentForecast.city + ', ' + currentForecast.country}
                                </Typography>
                                <Typography 
                                    gutterBottom 
                                    variant="h6" 
                                    component="h3" 
                                    align="center"
                                >
                                    {currentForecast.main + ', ' + currentForecast.description}
                                </Typography>
                                <Grid
                                    container 
                                    direction="row" 
                                    justify="center"
                                    align="center"
                                >
                                    <Grid 
                                        item
                                        xs={2}
                                        key={'temp'}
                                        className="card-container"
                                    >
                                        <Typography 
                                            gutterBottom 
                                            component="p" 
                                            className="content"
                                        >
                                            {'Temperature: ' + currentForecast.temp + '°'}
                                        </Typography>
                                    </Grid>
                                    <Grid 
                                        item
                                        xs={2}
                                        key={'pressure'}
                                        className="card-container"
                                    >
                                        <Typography 
                                            gutterBottom 
                                            component="p" 
                                            className="content"
                                        >
                                            {'Pressure: ' + currentForecast.pressure + 'hPa'}
                                        </Typography>
                                    </Grid>
                                    <Grid 
                                        item
                                        xs={2}
                                        key={'humidity'}
                                        className="card-container"
                                    >
                                        <Typography 
                                            gutterBottom 
                                            component="p" 
                                            className="content"
                                        >
                                            {'Humidity: ' + currentForecast.humidity + '%'}
                                        </Typography>
                                    </Grid>
                                    <Grid 
                                        item
                                        xs={2}
                                        key={'temp_max'}
                                        className="card-container"
                                    >
                                        <Typography 
                                            gutterBottom 
                                            component="p" 
                                            className="content"
                                        >
                                            {'Max temperature: ' + currentForecast.temp_max + '°'}
                                        </Typography>
                                    </Grid>
                                    <Grid 
                                        item
                                        xs={2}
                                        key={'temp_min'}
                                        className="card-container"
                                    >
                                        <Typography 
                                            gutterBottom 
                                            component="p" 
                                            className="content"
                                        >
                                            {'Min temperature: ' + currentForecast.temp_min + '°'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <div
                                    id="map"
                                    className="map item-image"
                                >
                                    <Map 
                                        view={{center: [currentForecast.lon, currentForecast.lat], zoom: 4}}
                                    >
                                        <Layers>
                                            <layer.Tile/>
                                        </Layers>
                                        <Controls 
                                            attribution={false} 
                                            zoom={true}
                                        >
                                            <control.Rotate />
                                            <control.ScaleLine />
                                            <control.FullScreen />
                                            <control.OverviewMap />
                                            <control.ZoomSlider />
                                            <control.ZoomToExtent />
                                            <control.Zoom />
                                        </Controls>
                                    </Map>
                                </div>
                            </Fragment>
                        )
                        :
                        (
                            <Fragment>
                                <Typography 
                                    gutterBottom 
                                    variant="h5" 
                                    component="h2" 
                                    align="center"
                                >
                                    Find a city forecast
                                </Typography>
                                <Typography 
                                    gutterBottom 
                                    component="p" 
                                    className="content" 
                                    align="center"
                                >
                                    Type the city name and then press ENTER
                                </Typography>
                                {error &&
                                    (
                                        <Grid
                                            container 
                                            direction="row" 
                                            justify="center"
                                            align="center"
                                        >
                                            <Grid 
                                                item
                                                xs={3}
                                                key={'error'}
                                            >
                                                <Typography 
                                                    gutterBottom 
                                                    component="p" 
                                                    className="content"
                                                >
                                                    <Alert 
                                                        variant="filled" 
                                                        severity="error"
                                                    >
                                                        {'An error has occurred: ' + error}
                                                    </Alert>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    )
                                }
                            </Fragment>
                        )
                    }
                </Paper>
            </div>
            {suggestions.length > 0 &&
                (
                    <div className="recent-page">
                        <Paper
                            elevation={1}
                            className="recent-container"
                        >
                            <Fragment>
                                <Grid
                                    container 
                                    direction="row" 
                                    align="center"
                                >
                                    <Grid 
                                        item
                                        xs={2}
                                        key={'Recent'}
                                    >
                                        <Typography 
                                            gutterBottom 
                                            component="p" 
                                            className="recent"
                                        >
                                            Recents:
                                        </Typography>
                                    </Grid>
                                    {suggestions.map(suggestion => 
                                        <Grid 
                                            item
                                            xs={2}
                                            key={suggestion}
                                        >
                                            <Typography 
                                                gutterBottom 
                                                component="p"
                                            >
                                                <Button onClick={()=>{getWeather(suggestion)}} >
                                                    {suggestion}
                                                </Button>
                                                <IconButton 
                                                    size="small" 
                                                    onClick={()=>{deleteSuggestion(suggestion)}} 
                                                    color="secondary" 
                                                    aria-label="delete recent"
                                                >
                                                    <DeleteForeverIcon fontSize="inherit" />
                                                </IconButton>
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </Fragment>
                        </Paper>
                    </div>
                )
            }
        </Fragment>
    );
}

export default Page;