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

export default class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      daysArray: [],
      date: new Date()
    };

  }


  onChange = date => {
    this.setState({ date })
  }

  updateTalkList(){
    axios.get('http://127.0.0.1:6200/api/room/list')
    .then((res) => {
      const { room } = res.data;
      let daysArray = [];
      for (let i = 0; i < room.length; i++) {
        let talkList = room[i].talk;
        for (let j = 0; j < talkList.length; j++) {
          const mTalk = talkList[j];
          const talkStartDate = new Date(mTalk.start);
          const talkEndDate = new Date(mTalk.end);
          const talkDate = talkStartDate.toDateString();

          let startTime = '';

          startTime  += talkStartDate.getHours().toString() 
          if(talkStartDate.getHours() < 10){
            startTime  += '0';
          }
          startTime  += ':' + talkStartDate.getMinutes().toString() 
          if(talkStartDate.getMinutes() < 10){
            startTime  += '0';
          }
          startTime  += ' - ' + talkEndDate.getHours().toString() 
          if(talkEndDate.getHours() < 10){
            startTime  += '0';
          }
          startTime  += ':' + talkEndDate.getMinutes().toString() 
          if(talkEndDate.getMinutes() < 10){
            startTime  += '0';
          }
          mTalk.room = room[i].name
          mTalk.hour = startTime
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

      this.setState({daysArray: daysArray});
    }).catch(() => {
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.updateTalkList(), 1000);
  }

  render() {
    const { daysArray, date } = this.state;

    let talkArray = [];
    
    for (let i = 0; i < daysArray.length; i++) {
      if (daysArray[i].date == date.toDateString()) {
        talkArray = daysArray[i].talk;
        i = daysArray.length
      }
    }

    console.log(daysArray)
    
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
                <TableCell align="right">Ocupation</TableCell>
              </TableRow>
            </TableHead>
            {talkArray !== undefined ? (
              <TableBody>
                {talkArray.map(talk => (
                  <TableRow key={talk._id}>
                    <TableCell component="th" scope="row">{talk.title}</TableCell>
                    <TableCell align="right">{talk.orator}</TableCell>
                    <TableCell align="right">{talk.hour}</TableCell>
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

