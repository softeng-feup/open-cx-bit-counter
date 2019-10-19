const express = require('express');

const router = express.Router();

const request = require('request');

const path = require('path');

const Papa = require('papaparse'); // In-browser CSV parser

const fs = require('fs'); // Filesystem

const Measure = require('../models/Measure');


router.route('/').get((req, res) => {
  let { yearStart } = req.query;
  let { yearEnd } = req.query;
  if (yearStart === undefined) { yearStart = 0; }
  if (yearEnd === undefined) { yearEnd = 3000; }

  delete req.query.yearEnd;
  delete req.query.yearStart;

  // query param which will make it so that the year has to be in between the yearStart and yearEnd
  req.query.year = { $gt: yearStart, $lt: yearEnd };

  Measure.find(req.query, (err, itemArray) => {
    if (err) {
      res.json({
        code: 404,
        message: 'could not find any data',
      });
    } else {
      res.json({
        code: 200,
        numberOfEntries: itemArray.length,
        items: itemArray,
      });
    }
  });
});

/**
* This endpoint will clear the whole database's metrics
*/
router.route('/api/clear').get((req, res) => {
  Measure.deleteMany().exec((error) => {
    if (error) {
      res.json({
        code: 404,
        message: 'Could not delete data',
      });
    } else {
      res.json({
        code: 200,
        message: 'Data Deleted',
      });
    }
  });
});


function getCo2Data2017() {
  const certPath = path.join(__dirname, '../assets/co2_2017.csv');
  const content = fs.readFileSync(certPath, 'utf8');

  let source;
  let year;
  Papa.parse(content, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: (results) => {
      Object.keys(results.data[0]).forEach((key, index) => {
        if (index === 0) {
          year = results.data[0][key];
          return;
        }
        if (index === 1) {
          source = results.data[0][key];
          return;
        }

        const mMeasure = new Measure();
        mMeasure.source = source;
        mMeasure.year = year;
        mMeasure.value = results.data[0][key];
        mMeasure.metric = 'CO2';
        mMeasure.country = key;
        mMeasure.unit = 'MtCO₂';
        mMeasure.save();
      });
    },
  });
}


// this endpoint gets makes an api call to climate-watch which gives out all the yearly
//  info on the CO2 emissions since 1850
// If the rest api call is successful then save each year's measure to the database

router.route('/api/get/climate-watch').post((req, res) => {
  // Api call options
  const options = {
    url: 'https://climate-watch.vizzuality.com/api/v1/data/historical_emissions?source_ids[]=94&gas_ids[]=366&page=1&per_page=200&sort_col=2016&sort_dir=DESC&start_year=1850&sector_ids[]=1313',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Referer-Policy': 'no-referrer-when-downgrade',
      referer: 'https://climate-watch.vizzuality.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
    },
    method: 'GET',
    json: true,
  };

  // Make rest api call
  return request(options, (error, response, data) => {
    if (error) {
      res.json({
        code: 403,
        message: 'Could not fetch data',
      });
    }

    // Loop through the data (which is the first json object) and create an object for each,
    // after that simply save it.
    const countriesInfo = data.data;

    // Loop countries.
    for (let i = 0; i < countriesInfo.length; i += 1) {
      // Loop years for the corrent country loop
      for (let j = 0; j < countriesInfo[j].emissions.length; j += 1) {
        const mMeasure = new Measure();
        mMeasure.source = 'climate-watch';
        mMeasure.year = countriesInfo[i].emissions[j].year;
        mMeasure.value = countriesInfo[i].emissions[j].value;
        mMeasure.metric = countriesInfo[i].gas;
        mMeasure.country = countriesInfo[i].country;
        mMeasure.unit = countriesInfo[i].unit;
        mMeasure.save();
      }
    }

    getCo2Data2017();

    res.json({
      code: 200,
      values: data,
    });
  });
});


module.exports = router;
