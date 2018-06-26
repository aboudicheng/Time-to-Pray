import React from 'react';
import ReactDOM from 'react-dom';
import Timetable from '../Table'
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

//Redux
import store from '../../store'
import {
    setGeolocation,
    setGeoErrorMessage,
    setPrayerErrorMessage,
    setIsLoading,
    setInputField,
    setMethod,
    setPeriod,
    setLang
} from '../../actions';

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
        fontSize: "0.7em",
        backgroundColor: "#1D2D3C",
        color: "#B4D27C",
        '&:hover': {
            background: '#879F4B',
            color: "#1D2D3C",
        }
    },
});

class Prayer extends React.Component {

    fetchPrayer = (link) => {
        fetch(link)
            .then(handleResponse)
            .then((data) => {
                store.dispatch(setPrayerErrorMessage(""));
                store.dispatch(setIsLoading(false))
                ReactDOM.render(<Timetable prayerTime={data} month={date.month} day={date.day} period={store.getState().period} />, document.getElementById("table"))
            })
            .catch((error) => {
                store.dispatch(setPrayerErrorMessage(error.data));
                store.dispatch(setIsLoading(false))
            });
    }

    componentWillUpdate(props) {
        if (!props.isGeolocationAvailable) {
            if (this.props.isGeolocationAvailable !== props.isGeolocationAvailable) {
                store.dispatch(setGeoErrorMessage(props.t('error.browser')))
                store.dispatch(setIsLoading(false))
            }
        }
        else if (!props.isGeolocationEnabled) {
            if (this.props.isGeolocationEnabled !== props.isGeolocationEnabled) {
                store.dispatch(setGeoErrorMessage(props.t('error.enable')))
                store.dispatch(setIsLoading(false))
            }
        }
        else if (props.coords) {
            if (this.props.coords !== props.coords) {
                store.dispatch(setGeolocation(props.coords))
                store.dispatch(setIsLoading(false))
            }
        }
        else {
            store.dispatch(setGeoErrorMessage(null))
        }
    }

    handleChange = event => {
        event.target.name === "method"
            ? store.dispatch(setMethod(event.target.value))
            : store.dispatch(setPeriod(event.target.value))
        store.dispatch(setIsLoading(true))
        this.listPrayer()
    };

    handleLangChange = event => {
        store.dispatch(setLang(event.target.value))
        switch (event.target.value) {
            case 0:
                setLanguage('en')
                break;
            case 1:
                setLanguage('fr')
                break;
            case 2:
                setLanguage('tr')
                break;
            case 3:
                setLanguage('jp')
                break;
            case 4:
                setLanguage('zh')
                break;
            case 5:
                setLanguage('zh_cn')
                break;
            default:
                return null;
        }
    }

    listPrayer = () => {
        const state = store.getState()
        if (state.address !== "")
            this.fetchPrayer(`${PRAYER_API}ByAddress?address=${state.address}&method=${state.method}&month=${date.month}&year=${date.year}`)
        else
            this.fetchPrayer(`${PRAYER_API}?latitude=${state.geolocation.latitude}&longitude=${state.geolocation.longitude}&method=${state.method}&month=${date.month}&year=${date.year}`)
    }

    handleInput = (e) => {
        store.dispatch(setInputField(e.target.value))
    }

    render() {
        const state = store.getState()

        const { t } = this.props

        const selectStyle = {
            width: 250,
            fontSize: "0.6em",
            marginBottom: "1.2em"
        }

        const itemStyle = {
            fontSize: "0.8em",
            whiteSpace: "nowrap",
        }

        const itemSelectStyle = {
            fontSize: "0.8em",
            whiteSpace: "nowrap",
            overflowX: "auto"
        }

        //selections
        const method_select = [t('methods.uisk'), t('methods.isna'), t('methods.mwl'), t('methods.uaqum'), t('methods.egas'), t('methods.igut'), t('methods.gr'), t('methods.kw'), t('methods.qt'), t('methods.muiss'), t('methods.uoidf'), t('methods.dibt')]
        const period_select = [t('period_select.today'), t('period_select.this_month')];
        const lang_select = [t('languages.en'), t('languages.fr'), t('languages.tr'), t('languages.jp'), t('languages.zh'), t('languages.zh_cn')]

        return (
            <div className="prayer-container">
                <div className="content">
                    <div className="select-table">
                        <form style={{ display: "flex", flexFlow: "column wrap" }} autoComplete="off">
                            <FormControl className="form-control">
                                <InputLabel htmlFor="method-simple"><div style={itemStyle}>{t('calculation_method')}</div></InputLabel>
                                <Select
                                    value={state.method}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'method',
                                        id: 'method-simple',
                                    }}
                                    style={selectStyle}
                                >
                                    {method_select.map((method, i) => {
                                        return <MenuItem style={itemSelectStyle} value={i} key={`method-${i}`}>{method}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className="form-control">
                                <InputLabel htmlFor="period-simple"><div style={itemStyle}>{t('period')}</div></InputLabel>
                                <Select
                                    value={state.period}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'period',
                                        id: 'period-simple',
                                    }}
                                    style={selectStyle}
                                >
                                    {period_select.map((period, i) => {
                                        return <MenuItem style={itemSelectStyle} value={i} key={`period-${i}`}>{period}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className="form-control">
                                <InputLabel htmlFor="language-simple"><div style={itemStyle}>{t('language_select')}</div></InputLabel>
                                <Select
                                    value={state.language}
                                    onChange={this.handleLangChange}
                                    inputProps={{
                                        name: 'language',
                                        id: 'language-simple',
                                    }}
                                    style={selectStyle}
                                >
                                    {lang_select.map((lang, i) => {
                                        return <MenuItem style={itemSelectStyle} value={i} key={`lang-${i}`}>{lang}</MenuItem>
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
                                    style: { fontSize: "0.7em" }
                                }}
                                InputLabelProps={{
                                    style: { fontSize: "0.55em" }
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

                    <div className="submit">
                        {state.isLoading
                            ? <CircularProgress style={{ color: purple[500] }} thickness={7} />
                            : !state.error
                                ? <Button onClick={this.listPrayer} className={this.props.classes.button} variant="outlined" size="medium">{t('search')}</Button>
                                : <div className="error">{state.error}</div>
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