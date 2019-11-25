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
        let min = 0;
        let speaker = '';
        let room = '';
        let title = '';
        for (let i = 0; i < this.props.talkArray.length; i++) {
            let maxAux =  Math.max(...this.props.talkArray[i].occupation_list.map(s => s.value));
            if(maxAux >= max) {
                max = maxAux
                room = this.props.talkArray[i].room;
                speaker = this.props.talkArray[i].orator;
                min = Math.min(...this.props.talkArray[i].occupation_list.map(s => s.value));
                title = this.props.talkArray[i].title;
            }
        }
        this.orator = speaker;
        this.max = max;
        this.room = room;
        this.min = min;
        this.title = title;
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
                      <Typography align="left" style={{padding:'10px'}}><b>Orator - </b>{this.orator}</Typography>
                      <Typography align="left" style={{padding:'10px'}}><b>Room - </b>{this.room}</Typography>
                      <Typography align="left" style={{padding:'10px'}}><b>Max Atendees - </b>{this.max}</Typography>
                      <Typography align="left" style={{padding:'10px'}}><b>Min Atendees- </b>{this.min}</Typography>
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