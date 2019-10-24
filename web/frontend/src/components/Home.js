import React, { Component } from 'react'
import Calendar from 'react-calendar';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function createData(title, orator, time, room, occupation) {
  return { title, orator, time, room, occupation };
}

const rows = [
  createData('Talk 1', 'Orator A', '10:00 - 11:00','B301', '90'),
  createData('Talk 2', 'Orator B', '10:00 - 10:30', 'B302', '80'),
  createData('Talk 3', 'Orator C', '11:00 - 12:30', 'B301', '--'),
  createData('Talk 4', 'Orator D', '11:40 - 12:30', 'B306', '--'),
  createData('Talk 5', 'Orator E', '12:00 - 13:00', 'B309', '--'),
];

export default class Home extends Component {


  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <>
        <Box boxShadow={10}>
          <Calendar
            onChange={this.onChange}
            value={this.state.date} />
        </Box>



        <Box boxShadow={10} className="rooms-container">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Orator</TableCell>
                <TableCell align="right">Hour</TableCell>
                <TableCell align="right">Room</TableCell>
                <TableCell align="right">Ocupation (%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">{row.title}</TableCell>
                  <TableCell align="right">{row.orator}</TableCell>
                  <TableCell align="right">{row.time}</TableCell>
                  <TableCell align="right">{row.room}</TableCell>
                  <TableCell align="right">{row.occupation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </>
    )
  }
}

