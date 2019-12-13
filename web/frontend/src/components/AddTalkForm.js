import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import getMinutes from 'date-fns/getMinutes'
import getHours from 'date-fns/getHours'
import getUnixTime from 'date-fns/getUnixTime'
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import axios from 'axios';

export default class AddTalkForm extends React.Component {
    constructor(props) {
      super(props);
      
      const { setOpen } = props;

      this.state = {
        title: '',
        speaker: '',
        date: null,
        start: null,
        end: null,
        room: '',
        open: false
      };
      
      this.handleClose = () => {
        setOpen(false);
      };

      this.handleTitle = this.handleTitle.bind(this);
      this.handleSpeaker = this.handleSpeaker.bind(this);
      this.handleDate = this.handleDate.bind(this);
      this.handleStart = this.handleStart.bind(this);
      this.handleEnd = this.handleEnd.bind(this);
      this.handleRoom = this.handleRoom.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleTitle(event) {
      this.setState({title: event.target.value});
    }

    handleSpeaker(event) {
      this.setState({speaker: event.target.value});
    }

    handleDate(event) {
      let date_s = getUnixTime(event) *1000;
      this.setState({date: date_s});
    }

    handleStart(event) {
      let hours = getHours(event);
      let minutes = getMinutes(event);
      let start_time = (hours * 3600 + minutes * 60 + this.state.date)*1000;
      this.setState({start: start_time});
    }

    handleEnd(event) {
      let hours = getHours(event);
      let minutes = getMinutes(event);
      let end_time = (hours * 3600 + minutes * 60 + this.state.date)*1000;
      this.setState({end: end_time});
    }

    handleRoom(event) {
      this.setState({room: event.target.value});
    }

    addTalkToDataBase(){
      let params = {
        title: this.state.title,
        speaker: this.state.speaker,
        room: this.state.room,
        start: this.state.start,
        end: this.state.end
      }
    
      axios.post('http://api.feupbitcounter.info/api/talk/create', null, {params})
      .then((response) => {
        console.log(response);
      })
      .catch(error => {
      console.log(error.message);
      });
    }
  
    handleSubmit(event) {
      event.preventDefault();
      this.addTalkToDataBase();
      this.handleClose();
    }
  
    render() {
      return (
        <Dialog open={true} onClose={this.handleClose} aria-labelledby="form-diaglog-title">
          <DialogTitle id="fomr-dialog-title">
            Add a Talk
          </DialogTitle>
          <form onSubmit={this.handleSubmit}>
          <DialogContent>
            <TextField 
              autoFocus 
              margin="normal"
              required={true}
              id="Title" label="Title" 
              value={this.title} onChange={this.handleTitle} 
              type="string" fullWidth 
            />
            <TextField 
              margin="normal"
              required={true}
              id="Speaker" label="Speaker" 
              value={this.speaker} onChange={this.handleSpeaker} 
              type="string" fullWidth 
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="dense" 
                required={true}
                disablePast={true} 
                format="dd/MM/yyyy" 
                id="Date" label="Date" 
                value={this.state.date} onChange={this.handleDate} 
                fullWidth 
              />
              <KeyboardTimePicker 
                margin="dense" 
                required={true}
                size="small"
                clearable 
                ampm={false} 
                id="Start" label="Start" 
                value={this.state.start} onChange={this.handleStart} 
                fullWidth 
                />
              <KeyboardTimePicker 
                margin="dense" 
                required={true} 
                size="small"             
                clearable 
                ampm={false} 
                id="End" label="End" 
                value={this.state.end} onChange={this.handleEnd} 
                fullWidth 
                />
            </MuiPickersUtilsProvider>
            <TextField 
              margin="normal" 
              required={true}
              size="small"
              id="Room" label="Room" 
              type="string" 
              value={this.room} onChange={this.handleRoom} 
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" label="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
          </form>
        </Dialog>
    );
  }
}
