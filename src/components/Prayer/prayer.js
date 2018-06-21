import React from 'react';
import { geolocated } from 'react-geolocated';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import { API, Methods } from '../../config'
import { handleResponse } from '../../helpers'

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear(),
            method: 2,
        }
    }

    fetchPrayer(link) {
        fetch(link)
            .then(handleResponse)
            .then((data) => {
                console.log(data)
            })
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    componentWillReceiveProps(nextProps) {
        !nextProps.isGeolocationAvailable
            ? this.setState({ error: "Your browser does not support Geolocation" })
            : !nextProps.isGeolocationEnabled
                ? this.setState({ error: "Geolocation is not enabled" })
                : nextProps.coords
                    ? this.setState({ geolocation: nextProps.coords, isLoading: false })
                    : this.setState({ error: "" })

        this.fetchPrayer(`${API}?latitude=${nextProps.coords.latitude}&longitude=${nextProps.coords.longitude}&method=2&month=${this.state.month}&year=${this.state.year}`)
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { isLoading } = this.state

        const formStyle = {
            width: "50%",
            margin: "10 auto 10 auto",
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
                                    style={formStyle}
                                >
                                    {Methods.map((method, i) => {
                                        return <MenuItem value={i}>{method}</MenuItem>
                                    })}

                                </Select>
                            </FormControl>
                        </form>
                    </div>
                    <div className="geolocation">
                        {isLoading && <CircularProgress style={{ color: purple[500] }} thickness={7} />}
                        {!this.state.geolocation ? <div></div> : this.state.geolocation.latitude}
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