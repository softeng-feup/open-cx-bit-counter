import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactApexChart from "react-apexcharts";
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

const chartJson = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: []
      },
      dataLabels: {
        enabled: false
      },
    },
    series: [
      {
        name: "series-1",
        data: []
      }
    ]
  
}
class Table extends React.Component {
  state = {
    expanded: null
  };

  constructor(props) {
    super(props);

    this.state = {
      talkArray: this.props.talkArray,
      date: new Date(),
    };

  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  componentDidUpdate(prevProps) {

    if (prevProps.talkArray !== this.props.talkArray) {
      for (let i = 0; i < this.props.talkArray.length; i++) {
        let series = JSON.parse(JSON.stringify(chartJson));
        console.log(series)
        this.props.talkArray[i].series = [];
        for (let j = 0; j < this.props.talkArray[i].occupation_list.length; j++) {
          series.series[0].data.push(this.props.talkArray[i].occupation_list[j].value)
          series.options.xaxis.categories.push("")
        }
        this.props.talkArray[i].series = series;
      }
      console.log(this.props.talkArray)

      this.setState({
        talkArray: this.props.talkArray
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    const { talkArray, date } = this.state;

    console.log(talkArray)

    return (

      <>
        {talkArray !== undefined ? (
          <div className={classes.root}>
            {talkArray.map(talk => (
              <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography component="th" scope="row" style={{ fontSize: '24px' }}><b>{talk.title}</b></Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  {console.log(talk)}

                  <div class="col-md-12" style={{ display: 'flex' }}>
                    <div class="col-md-6">
                      <ReactApexChart
                        style={{ width: '100%' }}
                        options={talk.series.options}
                        series={talk.series.series}
                        type="area"
                        width="100%"
                      />
                    </div>
                    <div class="col-md-6 float-left" style={{ alignSelf: 'center' }}>
                      <Typography align="left" style={{ padding: '10px' }}><b>Orator - </b>{talk.orator}</Typography>
                      <Typography align="left" style={{ padding: '10px' }}><b>Hour - </b>{talk.hour}</Typography>
                      <Typography align="left" style={{ padding: '10px' }}><b>Room - </b>{talk.room}</Typography>
                      <Typography align="left" style={{ padding: '10px' }}><b>Occupation - </b>{talk.occupation}</Typography>
                    </div>
                  </div>

                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}

          </div>
        ) : null}
      </>
    )
  }
}

Table.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Table);