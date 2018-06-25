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

const createData = (id, name, time) => {
    return { id, name, time }
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
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

        const data = [
            createData(0, t('prayers.fajr'), props.prayerTime.data[props.day - 1].timings.Fajr),
            createData(1, t('prayers.dhuhr'), props.prayerTime.data[props.day - 1].timings.Dhuhr),
            createData(2, t('prayers.asr'), props.prayerTime.data[props.day - 1].timings.Asr),
            createData(3, t('prayers.maghrib'), props.prayerTime.data[props.day - 1].timings.Maghrib),
            createData(4, t('prayers.isha'), props.prayerTime.data[props.day - 1].timings.Isha),
        ];

        this.state = {
            id: 0,
            data: data,
            t: t
        }
    }

    componentWillReceiveProps(newProps) {
        const data = [
            createData(0, this.state.t('prayers.fajr'), newProps.prayerTime.data[newProps.day - 1].timings.Fajr),
            createData(1, this.state.t('prayers.dhuhr'), newProps.prayerTime.data[newProps.day - 1].timings.Dhuhr),
            createData(2, this.state.t('prayers.asr'), newProps.prayerTime.data[newProps.day - 1].timings.Asr),
            createData(3, this.state.t('prayers.maghrib'), newProps.prayerTime.data[newProps.day - 1].timings.Maghrib),
            createData(4, this.state.t('prayers.isha'), newProps.prayerTime.data[newProps.day - 1].timings.Isha),
        ];
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
                            <CustomTableCell>{this.state.t('prayer')}</CustomTableCell>
                            {data.map(n => {
                                return (
                                    <CustomTableCell key={n.id}>{n.name}</CustomTableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow component="th" scope="row">
                            <CustomTableCell>{this.state.t('time_timezone')}</CustomTableCell>
                            {data.map((n, i) => {
                                return (
                                    <CustomTableCell numeric key={i}>{n.time}</CustomTableCell>
                                );
                            })}
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }


}

export default withStyles(styles)(translate(Timetable));