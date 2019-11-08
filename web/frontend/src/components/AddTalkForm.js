import React from 'react';

export default class AddTalkForm extends React.Component {
    constructor(props) {
      super(props);
      const { open, setOpen } = props;

      this.state = {title: '',
                    orator: '',
                    date: '',
                    start: '',
                    end: '',
                    room: ''};
  
      this.handleTitle = this.handleTitle.bind(this);
      this.handleOrator = this.handleOrator.bind(this);
      this.handleDate = this.handleDate.bind(this);
      this.handleStart = this.handleStart.bind(this);
      this.handleEnd = this.handleEnd.bind(this);
      this.handleRoom = this.handleRoom.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.handleClose = () => {
        setOpen(false);
      };
    }
  
    handleTitle(event) {
      this.setState({title: event.target.value});
    }
    handleOrator(event) {
      this.setState({orator: event.target.value});
    }
    handleDate(event) {
      this.setState({date: event.target.value});
    }
    handleStart(event) {
      this.setState({start: event.target.value});
    }
    handleEnd(event) {
      this.setState({end: event.target.value});
    }
    handleRoom(event) {
      this.setState({room: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Added talk: ' + this.state.title + 
            ' by ' + this.state.orator +
            ' in ' + this.state.date +
            ' starting at ' + this.state.start + 
            ' and finishing at ' + this.state.end +
            ' in ' + this.state.room);
      event.preventDefault();
      this.handleClose();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Add a talk</legend>
            <label>
              Title:
              <input type="text" title={this.state.title} onChange={this.handleTitle}/>
            </label>
            <label>
              Orator:
              <input type="text" orator={this.state.orator} onChange={this.handleOrator}/>
            </label>
            <label>
              Date:
              <input type="date" date={this.state.date} onChange={this.handleDate}/>
            </label>
            <label>
              Start:
              <input type="time" start={this.state.start} onChange={this.handleStart}/>
            </label>
            <label>
              End:
              <input type="time" end={this.state.end} onChange={this.handleEnd}/>
            </label>
            <label>
              Room:
              <input type="text" room={this.state.room} onChange={this.handleRoom}/>
            </label>
            <input type="submit" value="Submit" />
          </fieldset>
        </form>
      );
    }
  }