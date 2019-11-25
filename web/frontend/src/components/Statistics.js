import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class Statistics extends React.Component {
  state = {
    expanded: null
  };

  constructor(props) {
    super(props);

    this.state = {
      talkArray: this.props.talkArray
      }
    };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  componentDidUpdate(prevProps) {
    console.log(this.props.talkArray);
    if(prevProps.talkArray !== this.props.talkArray) {
        let max = -1;
        for (let i = 0; i < this.props.talkArray.length; i++) {
            let maxAux =  Math.max(...this.props.talkArray[i].occupation_list.map(s => s.value));
            if(maxAux >= max) {
              max = maxAux;
              this.max = maxAux
              this.room = this.props.talkArray[i].room;

              this.speaker = this.props.talkArray[i].speaker;
              this.min = Math.min(...this.props.talkArray[i].occupation_list.map(s => s.value));
              this.title = this.props.talkArray[i].title;
              
              let sum  = this.props.talkArray[i].occupation_list.map(item => item.value).reduce((prev, next) => prev + next);
              this.average = sum / this.props.talkArray[i].occupation_list.length;

              let res = this.props.talkArray[i].occupation_list.filter(obj => obj.value == max);
              let dateAux = res[0].date;
              let day = dateAux.split('T');
              let time = day[1].split('.');
              
              this.timeAtMax = time[0];
            }
        }
    }
  }

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    const { talkArray } = this.state;

    return (

      <>
        {talkArray !== undefined ? (
          <div className={classes.root}>
              <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography component="th" scope="row" style={{fontSize:'24px'}}><b>Best Talk</b></Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <div class="col-md-12" style={{ display: 'flex' }}>
                    <div class="col-md-6 float-left" style={{ alignSelf: 'center' }}>
                      <Typography align="left" style={{padding:'10px'}}><b>Title - </b>{this.title}</Typography>
                      <Typography align="left" style={{padding:'10px'}}><b>Speaker - </b>{this.speaker}</Typography>
                      <Typography align="left" style={{padding:'10px'}}><b>Room - </b>{this.room}</Typography>
                      <Typography align="left" style={{padding:'10px'}}><b>Max Atendees - </b>{this.max}</Typography>
                      <Typography align="left" style={{padding:'10px'}}><b>Min Atendees- </b>{this.min}</Typography>
                    </div>
                    <div class="col-md-6 float-right">
                        <Typography align="left" style={{padding:'10px'}}><b>Average - </b>{this.average}</Typography>
                        <Typography align="left" style={{padding:'10px'}}><b>Time @ Max Atendees - </b>{this.timeAtMax}</Typography>
                    </div>
                  </div>

                </ExpansionPanelDetails>
              </ExpansionPanel>
          </div>
        ) : null}
      </>
    )
  }
}

export default withStyles(styles)(Statistics);