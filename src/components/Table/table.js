import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const createData = (id, name, time) => {
    return { id, name, time }
}

class Timetable extends React.Component {
    constructor(props) {
        super(props);

        const data = [
            createData(0, "Fajr", props.prayerTime.data[props.day - 1].timings.Fajr),
            createData(1, "Dhuhr", props.prayerTime.data[props.day - 1].timings.Dhuhr),
            createData(2, "Asr", props.prayerTime.data[props.day - 1].timings.Asr),
            createData(3, "Maghrib", props.prayerTime.data[props.day - 1].timings.Maghrib),
            createData(4, "Isha", props.prayerTime.data[props.day - 1].timings.Isha),
        ];

        this.state = {
            id: 0,
            data: data,
        }
    }

    componentWillReceiveProps(newProps) {
        const data = [
            createData(0, "Fajr", newProps.prayerTime.data[newProps.day - 1].timings.Fajr),
            createData(1, "Dhuhr", newProps.prayerTime.data[newProps.day - 1].timings.Dhuhr),
            createData(2, "Asr", newProps.prayerTime.data[newProps.day - 1].timings.Asr),
            createData(3, "Maghrib", newProps.prayerTime.data[newProps.day - 1].timings.Maghrib),
            createData(4, "Isha", newProps.prayerTime.data[newProps.day - 1].timings.Isha),
        ];
        this.setState({ data: data })
    }

    render() {
        const { data } = this.state

        return (
            <Paper style={{ width: '100%', overflowX: 'auto', }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Prayer</TableCell>
                            <TableCell numeric>Time (timezone)</TableCell>
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


}

export default Timetable;