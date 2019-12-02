import React from 'react';
import axios from 'axios';
import CloseButton from '@material-ui/core/Button';

export default class AdminKey extends React.Component {
    constructor(props) {
      super(props);
      const { setOpenAdmin } = props;

      this.state = {key: ''};
  
      this.handleKey = this.handleKey.bind(this);

      this.handleClose = () => {
        setOpenAdmin(false);
      };
    }
  
    handleKey(event) {
      this.setState({key: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      this.handleClose();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit} >
          <CloseButton className="close-button" onClick={this.handleClose} >
            <legend>X</legend>
          </CloseButton>
          <fieldset>
            <legend>Insert admin key</legend>
            <label>
              Key:
              <input type="text" title={this.state.key} onChange={this.handleKey}/>
            </label>
            <input type="submit" value="Submit" />
          </fieldset>
        </form>
      );
    }
}