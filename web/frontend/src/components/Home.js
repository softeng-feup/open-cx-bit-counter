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

import axios from 'axios';


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
  createData('Talk 1', 'Orator A', '10:00 - 11:00', 'B301', '90'),
  createData('Talk 2', 'Orator B', '10:00 - 10:30', 'B302', '80'),
  createData('Talk 3', 'Orator C', '11:00 - 12:30', 'B301', '--'),
  createData('Talk 4', 'Orator D', '11:40 - 12:30', 'B306', '--'),
  createData('Talk 5', 'Orator E', '12:00 - 13:00', 'B309', '--'),
];

export default class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      daysArray: [],
      date: new Date()
    };

  }


  onChange = date => {
    console.log(date)
    this.setState({ date })
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:6200/api/room/list')
      .then((res) => {
        const { room } = res.data;
        let daysArray = [];

        for (let i = 0; i < room.length; i++) {
          let talkList = room[i].talk;
          for (let j = 0; j < talkList.length; j++) {
            const mTalk = talkList[j];
            mTalk.room = room[i].name
            const talkDate = new Date(mTalk.start).toDateString();
            let newDate = true;
            for (let k = 0; k < daysArray.length; k++) {
              if (daysArray[k].date == talkDate) {
                daysArray[k].talk.push(mTalk)
                newDate = false;
              }
            }

            if (newDate && mTalk.start !== undefined) {
              const newDay = new Object({
                date: talkDate,
                talk: []
              })
              newDay.talk.push(mTalk)
              daysArray.push(newDay);
            }
          }
        }

        console.log(daysArray)
        this.setState({
          daysArray: daysArray
        });
      }).catch(() => {
      });
  }

  render() {
    const { daysArray, date } = this.state;

    let talkArray = [];
    
    for (let i = 0; i < daysArray.length; i++) {
      if (daysArray[i].date == date.toDateString()) {
        talkArray = daysArray[i].talk;
      }
    }
    
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
            {talkArray !== undefined ? (
              <TableBody>
                {talkArray.map(talk => (
                  <TableRow key={talk._id}>
                    <TableCell component="th" scope="row">{talk.title}</TableCell>
                    <TableCell align="right">{talk.orator}</TableCell>
                    <TableCell align="right">{talk.start}</TableCell>
                    <TableCell align="right">{talk.room}</TableCell>
                    <TableCell align="right">{talk.occupation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : null}
          </Table>
        </Box>
      </>
    )
  }
}

