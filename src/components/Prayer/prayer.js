import React from 'react';
import ReactDOM from 'react-dom';
import Timetable from '../Table/table'
import { geolocated } from 'react-geolocated';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import { PRAYER_API } from '../../config'
import { handleResponse } from '../../helpers'

//Select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

//Translation
import {
    setLanguage,
    translate,
} from 'react-switch-lang';

import './prayer.css';

const currentDate = new Date();
const date = {
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
}

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
    },
    button: {
        margin: theme.spacing.unit,
        fontSize: "0.7em"
      },
});

class Prayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: null,
            geolocation: null,
            error: "", //for geolocation
            errorMessage: "", //for fetching prayer data
            isLoading: true,
            method: 2,
            period: 0,
            prayerTime: null,
            address: "",
            language: 0,
        }
    }

    fetchPrayer = (link) => {
        fetch(link)
            .then(handleResponse)
            .then((data) => {
                this.setState((prevState) => {
                    return { prayerTime: data, errorMessage: "" }
                })
                ReactDOM.render(<Timetable prayerTime={data} day={date.day} />, document.getElementById("table"))
            })
            .catch((error) => {
                this.setState({
                    errorMessage: error.data
                })
            });
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.isGeolocationAvailable
            ? this.setState({ error: this.props.t('error.browser'), isLoading: false })
            : !nextProps.isGeolocationEnabled
                ? this.setState({ error: this.props.t('error.enable'), isLoading: false })
                : nextProps.coords
                    ? this.setState({ geolocation: nextProps.coords, isLoading: false })
                    : this.setState({ error: null })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleLangChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        switch (event.target.value) {
            case 0:
                setLanguage('en')
                break;
            case 1:
                setLanguage('zh')
                break;
            case 2:
                setLanguage('zh_cn')
                break;
            default:
                return null;
        }
    }

    listPrayer = () => {
        if (this.state.address !== "")
            this.fetchPrayer(`${PRAYER_API}ByAddress?address=${this.state.address}&method=${this.state.method}&month=${date.month}&year=${date.year}`)
        else
            this.fetchPrayer(`${PRAYER_API}?latitude=${this.state.geolocation.latitude}&longitude=${this.state.geolocation.longitude}&method=${this.state.method}&month=${date.month}&year=${date.year}`)
    }

    handleInput = (e) => {
        this.setState({ address: e.target.value })
    }

    render() {
        const { isLoading } = this.state

        const { t } = this.props

        const selectStyle = {
            width: 250,
            fontSize: "0.6em",
            marginBottom: "1.2em"
        }

        const itemStyle = {
            fontSize: "0.8em",
            whiteSpace: "nowrap",
            overflowX: "auto"
        }

        //selections
        const method_select = [t('methods.uisk'), t('methods.isna'), t('methods.mwl'), t('methods.uaqum'), t('methods.egas'), t('methods.igut'), t('methods.gr'), t('methods.kw'), t('methods.qt'), t('methods.muiss'), t('methods.uoidf'), t('methods.dibt')]
        const period_select = [t('period_select.today'), t('period_select.this_week'), t('period_select.this_month')];
        const lang_select = [t('languages.en'), t('languages.zh'), t('languages.zh_cn')]

        return (
            <div className="prayer-container">
                <div className="content">
                    <div className="select-table">
                        <form style={{ display: "flex", flexFlow: "column wrap" }} autoComplete="off">
                            <FormControl className="form-control">
                                <InputLabel htmlFor="method-simple"><div style={itemStyle}>{t('calculation_method')}</div></InputLabel>
                                <Select
                                    value={this.state.method}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'method',
                                        id: 'method-simple',
                                    }}
                                    style={selectStyle}
                                >
                                    {method_select.map((method, i) => {
                                        return <MenuItem style={itemStyle} value={i} key={`method-${i}`}>{method}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className="form-control">
                                <InputLabel htmlFor="period-simple"><div style={itemStyle}>{t('period')}</div></InputLabel>
                                <Select
                                    value={this.state.period}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'period',
                                        id: 'period-simple',
                                    }}
                                    style={selectStyle}
                                >
                                    {period_select.map((period, i) => {
                                        return <MenuItem style={itemStyle} value={i} key={`period-${i}`}>{period}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className="form-control">
                                <InputLabel htmlFor="period-simple"><div style={itemStyle}>{t('language_select')}</div></InputLabel>
                                <Select
                                    value={this.state.language}
                                    onChange={this.handleLangChange}
                                    inputProps={{
                                        name: 'language',
                                        id: 'language-simple',
                                    }}
                                    style={selectStyle}
                                >
                                    {lang_select.map((lang, i) => {
                                        return <MenuItem style={itemStyle} value={i} key={`lang-${i}`}>{lang}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <TextField
                                id="search"
                                label={t('search_any_place')}
                                type="search"
                                margin="normal"
                                className={this.props.classes.textField}
                                inputProps={{
                                    style: { fontSize: "0.7rem" }
                                }}
                                InputLabelProps={{
                                    style: { fontSize: "0.6rem" }
                                }}
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
                                ? <Button onClick={this.listPrayer} className={this.props.classes.button} variant="contained" color="primary" size="medium">{t('search')}</Button>
                                : <div className="error">{this.state.error}</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(translate(Prayer)));