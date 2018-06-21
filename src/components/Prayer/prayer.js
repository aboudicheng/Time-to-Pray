import React from 'react';
import ReactDOM from 'react-dom';
import { geolocated } from 'react-geolocated';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import { API, Methods, Period } from '../../config'
import { handleResponse } from '../../helpers'

//Select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './prayer.css';

const currentDate = new Date();

class Prayer extends React.Component {
    constructor() {
        super();

        this.state = {
            currentDate: null,
            geolocation: null,
            error: "",
            isLoading: true,
            day: currentDate.getDate(),
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear(),
            method: 2,
            period: 0,
            prayerTime: null,
        }
    }

    fetchPrayer(link) {
        fetch(link)
            .then(handleResponse)
            .then((data) => {
                this.setState({ prayerTime: data })
            })
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.isGeolocationAvailable
            ? this.setState({ error: "Your browser does not support Geolocation" })
            : !nextProps.isGeolocationEnabled
                ? this.setState({ error: "Geolocation is not enabled" })
                : nextProps.coords
                    ? this.setState({ geolocation: nextProps.coords, isLoading: false })
                    : this.setState({ error: null })

        this.fetchPrayer(`${API}?latitude=${nextProps.coords.latitude}&longitude=${nextProps.coords.longitude}&method=2&month=${this.state.month}&year=${this.state.year}`)
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    listPrayer = () => {
        this.fetchPrayer(`${API}?latitude=${this.state.geolocation.latitude}&longitude=${this.state.geolocation.longitude}&method=${this.state.method}&month=${this.state.month}&year=${this.state.year}`)

        const Timetable = () => {

            let id = 0;
            function createData(name, time) {
                id += 1;
                return { id, name, time };
            }

            const data = [
                createData("Fajr", this.state.prayerTime.data[this.state.day - 1].timings.Fajr),
                createData("Dhuhr", this.state.prayerTime.data[this.state.day - 1].timings.Dhuhr),
                createData("Asr", this.state.prayerTime.data[this.state.day - 1].timings.Asr),
                createData("Maghrib", this.state.prayerTime.data[this.state.day - 1].timings.Maghrib),
                createData("Isha", this.state.prayerTime.data[this.state.day - 1].timings.Isha),
            ];

            return (
                <Paper style={{ width: '100%', overflowX: 'auto', }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Prayer</TableCell>
                                <TableCell numeric>Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(n => {
                                return (
                                    <TableRow key={n.id}>
                                        <TableCell component="th" scope="row">
                                            {n.name}
                                        </TableCell>
                                        <TableCell numeric>{n.time}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            );
        }

        ReactDOM.render(<Timetable />, document.getElementById("table"))
    }

    render() {
        const { isLoading } = this.state

        const selectStyle = {
            width: "60%",
            fontSize: "0.8em",
        }

        const itemStyle = {
            fontSize: "0.8em",
            whiteSpace: "nowrap"
        }

        return (
            <div className="prayer-container">
                <div className="content">
                    <div className="select-table">
                        <form style={{ display: "flex", flexWrap: "wrap" }} autoComplete="off">
                            <FormControl className="form-control">
                                <InputLabel htmlFor="method-simple">Calculation Method</InputLabel>
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
                                        return <MenuItem style={itemStyle} value={i}>{method}</MenuItem>
                                    })}

                                </Select>
                            </FormControl>
                            <FormControl className="form-control">
                                <InputLabel htmlFor="period-simple">Period</InputLabel>
                                <Select
                                    value={this.state.period}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'period',
                                        id: 'period-simple',
                                    }}
                                    style={{ fontSize: "0.8em", width: "100%" }}
                                >
                                    {Period.map((period, i) => {
                                        return <MenuItem style={itemStyle} value={i}>{period}</MenuItem>
                                    })}

                                </Select>
                            </FormControl>
                        </form>
                    </div>
                    <div className="submit">
                        {isLoading
                            ? <CircularProgress style={{ color: purple[500] }} thickness={7} />
                            : <Button onClick={this.listPrayer} variant="contained" color="primary" size="small">List</Button>
                        }
                    </div>
                    <div id="table"></div>
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