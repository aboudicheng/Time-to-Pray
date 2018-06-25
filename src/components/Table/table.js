import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

//Translation
import { translate } from 'react-switch-lang';

const createData = (name, time, date) => {
    let id = date.concat(" " + name)
    return { id, name, time, date }
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#1D2D3C",
        color: theme.palette.common.white,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class Timetable extends React.Component {
    constructor(props) {
        super(props);

        const { t } = props

        let data

        switch (props.period) {
            case 0:
                data = [[
                    createData(t('prayers.fajr'), props.prayerTime.data[props.day - 1].timings.Fajr, props.prayerTime.data[props.day - 1].date.readable),
                    createData(t('prayers.dhuhr'), props.prayerTime.data[props.day - 1].timings.Dhuhr, props.prayerTime.data[props.day - 1].date.readable),
                    createData(t('prayers.asr'), props.prayerTime.data[props.day - 1].timings.Asr, props.prayerTime.data[props.day - 1].date.readable),
                    createData(t('prayers.maghrib'), props.prayerTime.data[props.day - 1].timings.Maghrib, props.prayerTime.data[props.day - 1].date.readable),
                    createData(t('prayers.isha'), props.prayerTime.data[props.day - 1].timings.Isha, props.prayerTime.data[props.day - 1].date.readable),
                ]];
                break;
            case 1:
                data = props.prayerTime.data.map((prayer, i) => {
                    return [
                        createData(t('prayers.fajr'), prayer.timings.Fajr, prayer.date.readable),
                        createData(t('prayers.dhuhr'), prayer.timings.Dhuhr, prayer.date.readable),
                        createData(t('prayers.asr'), prayer.timings.Asr, prayer.date.readable),
                        createData(t('prayers.maghrib'), prayer.timings.Maghrib, prayer.date.readable),
                        createData(t('prayers.isha'), prayer.timings.Isha, prayer.date.readable),
                    ]
                })

                break;
            default:
                return;
        }

        this.state = {
            id: 0,
            data: data,
            t: t
        }
    }

    componentWillReceiveProps(newProps) {
        const { t } = this.state

        let data

        switch (newProps.period) {
            case 0:
                const prayerData = newProps.prayerTime.data[newProps.day - 1]
                data = [[
                    createData(t('prayers.fajr'), prayerData.timings.Fajr, prayerData.date.readable),
                    createData(t('prayers.dhuhr'), prayerData.timings.Dhuhr, prayerData.date.readable),
                    createData(t('prayers.asr'), prayerData.timings.Asr, prayerData.date.readable),
                    createData(t('prayers.maghrib'), prayerData.timings.Maghrib, prayerData.date.readable),
                    createData(t('prayers.isha'), prayerData.timings.Isha, prayerData.date.readable),
                ]];
                break;
            case 1:
                data = newProps.prayerTime.data.map((prayer, i) => {
                    const newData = [
                        createData(t('prayers.fajr'), prayer.timings.Fajr, prayer.date.readable),
                        createData(t('prayers.dhuhr'), prayer.timings.Dhuhr, prayer.date.readable),
                        createData(t('prayers.asr'), prayer.timings.Asr, prayer.date.readable),
                        createData(t('prayers.maghrib'), prayer.timings.Maghrib, prayer.date.readable),
                        createData(t('prayers.isha'), prayer.timings.Isha, prayer.date.readable),
                    ]
                    return newData
                })

                break;
            default:
                return;
        }

        this.setState({ data: data })
    }

    render() {
        const { data } = this.state
        const { classes } = this.props

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>{this.state.t('date')}</CustomTableCell>
                            {data[0].map((n, i) => {
                                return (
                                    <CustomTableCell key={n.id}>{n.name}</CustomTableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((day, i) => <TableRow component="th" scope="row"><CustomTableCell key={i}>{day[0].date}</CustomTableCell>{day.map((prayer, j) => <CustomTableCell numeric key={prayer.id}>{prayer.time}</CustomTableCell>)}</TableRow>)}
                    </TableBody>
                </Table>
            </Paper>
        );
    }


}

export default withStyles(styles)(translate(Timetable));