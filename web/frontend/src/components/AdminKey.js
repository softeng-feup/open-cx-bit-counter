import React from 'react';
import TextField from '@material-ui/core/TextField';
import CloseButton from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';

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
            X
          </CloseButton>
          <fieldset className="login-form">
            <legend>Insert admin key</legend>
            <TextField id="key_text" label="Key" />
            <Button className="submit-button" variant="contained" color="primary" onClick={this.handleSubmit}>
                Submit
            </Button>
          </fieldset>
        </form>
      );
    }
}