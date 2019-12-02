import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default class AddTalkForm extends React.Component {
    constructor(props) {
      super(props);
      const { setOpen } = props;

      this.handleClose = () => {
        setOpen(false);
      };
    }
  

    addTalkToDataBase(){
      let params = {
        title: this.state.title,
        speaker: this.state.speaker,
        room: this.state.room,
        start: this.state.start,
        end: this.state.end
      }
    
      axios.post('http://127.0.0.1:6200/api/talk/create', null, {params})
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
            <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField autoFocus margin="dense" id="Title" label="Title" type="string" fullWidth />
              <TextField margin="dense" id="Speaker" label="Speaker" type="string" fullWidth />
              <TextField margin="dense" id="Date" label="Date" type="date" fullWidth />
              <TextField margin="dense" id="Start" label="Start" type="time" fullWidth />
              <TextField margin="dense" id="End" label="End" type="time" fullWidth />
              <TextField margin="dense" id="Room" label="Room" type="string" fullWidth />
            </form>
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
      );
    }
}