import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '../appBar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './style.css';

function Page(props) {
    const {
        currentItem,
        error,
        suggestions,
        saveSuggestion,
        getWeather
    } = props;

    return (
        <Fragment>
            <CssBaseline />

            <AppBar suggestions={suggestions} saveSuggestion={saveSuggestion} getWeather={getWeather} />

            <div className="details-page">
                <Paper
                    elevation={1}
                    className="paper-container"
                >
                    {currentItem ?
                        (
                            <Fragment>
                                <div
                                    id="map"
                                    className="map item-image"
                                    // style={{
                                    //     // backgroundImage: `url(${currentItem.image})`,
                                    //     backgroundImage: `url(https://www.google.com/maps/@-34.8269715,-58.1779026,15z)`,
                                    // }}
                                >
                                </div>
                                <Typography gutterBottom variant="h5" component="h2" align="center">
                                    {currentItem.city}
                                </Typography>

                                <Typography gutterBottom component="p" className="content">
                                    {currentItem.temp}
                                </Typography>
                            </Fragment>
                        )
                        :
                        (
                            <Fragment>
                                <Typography gutterBottom variant="h5" component="h2" align="center">
                                    Find a city forecast
                                </Typography>
                                <Typography gutterBottom component="p" className="content" align="center">
                                    Type the city name and then press ENTER
                                </Typography>
                                {error &&
                                    (
                                        <Typography gutterBottom component="p" className="content" align="center">
                                            {error}
                                        </Typography>
                                    )
                                }
                            </Fragment>
                        )
                    }
                </Paper>
            </div>
        </Fragment>
    );
}

export default Page;