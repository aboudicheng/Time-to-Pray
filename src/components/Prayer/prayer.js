import React from 'react';
import ReactDOM from 'react-dom';
import Timetable from '../Table/table'
import { geolocated } from 'react-geolocated';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import { PRAYER_API, Methods, Period } from '../../config'
import { handleResponse } from '../../helpers'

//Select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import './prayer.css';

const currentDate = new Date();
const date = {
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
}

class Prayer extends React.Component {
    constructor() {
        super();

        this.state = {
            currentDate: null,
            geolocation: null,
            error: "",
            isLoading: true,
            method: 3,
            period: 0,
            prayerTime: null,
            address: "",
        }
    }

    fetchPrayer = (link) => {
        fetch(link)
            .then(handleResponse)
            .then((data) => {
                this.setState((prevState) => {
                    return { prayerTime: data }
                })
                ReactDOM.render(<Timetable prayerTime={data} day={date.day} />, document.getElementById("table"))
            });
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.isGeolocationAvailable
            ? this.setState({ error: "Your browser does not support Geolocation", isLoading: false })
            : !nextProps.isGeolocationEnabled
                ? this.setState({ error: "Geolocation is not enabled", isLoading: false })
                : nextProps.coords
                    ? this.setState({ geolocation: nextProps.coords, isLoading: false })
                    : this.setState({ error: null })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    listPrayer = () => {
        if (this.state.address !== "")
            this.fetchPrayer(`${PRAYER_API}ByAddress?address=${this.state.address}&method=${this.state.method}&month=${this.state.month}&year=${this.state.year}`)
        else
            this.fetchPrayer(`${PRAYER_API}?latitude=${this.state.geolocation.latitude}&longitude=${this.state.geolocation.longitude}&method=${this.state.method}&month=${this.state.month}&year=${this.state.year}`)
    }

    handleInput = (e) => {
        this.setState({ address: e.target.value})
    }

    render() {
        const { isLoading } = this.state

        const selectStyle = {
            width: "100%",
            fontSize: "0.6em",
            marginBottom: "1.2em"
        }

        const itemStyle = {
            fontSize: "0.8em",
            whiteSpace: "nowrap"
        }

        return (
            <div className="prayer-container">
                <div className="content">
                    <div className="select-table">
                        <form style={{ display: "flex", flexFlow: "column wrap" }} autoComplete="off">
                            <FormControl className="form-control">
                                <InputLabel htmlFor="method-simple"><div style={itemStyle}>Calculation Method</div></InputLabel>
                                <Select
                                    value={this.state.method}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'method',
                                        id: 'method-simple',
                                    }}
                                    style={selectStyle}
                                >
                                    {Methods.map((method, i) => {
                                        return <MenuItem style={itemStyle} value={i} key={`method-${i}`}>{method}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className="form-control">
                                <InputLabel htmlFor="period-simple"><div style={itemStyle}>Period</div></InputLabel>
                                <Select
                                    value={this.state.period}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'period',
                                        id: 'period-simple',
                                    }}
                                    style={selectStyle}
                                >
                                    {Period.map((period, i) => {
                                        return <MenuItem style={itemStyle} value={i} key={`period-${i}`}>{period}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <TextField
                                id="search"
                                label="Search (optional)"
                                type="search"
                                margin="normal"
                                style={{fontSize: "0.8em"}}
                                onChange={this.handleInput}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        this.listPrayer();
                                        e.preventDefault()
                                    }
                                }}
                            />
                        </form>
                    </div>
                    <div id="table"></div>
                    <div className="submit">
                        {isLoading
                            ? <CircularProgress style={{ color: purple[500] }} thickness={7} />
                            : !this.state.error
                                ? <Button onClick={this.listPrayer} variant="contained" color="primary" size="medium">find</Button>
                                : this.state.error
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Prayer);