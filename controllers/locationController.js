const axios = require('axios');

module.exports = {
    getLoc(req, res, next) {
      let loc = res.locals.generalLoc;
      axios.request({
        method: 'get',
        url: "http://ipinfo.io/json/?token=ca0bf2e0b0eeac",
      })
      .then(result => {
        res.locals.generalLoc = result.data.city;
        console.log(result.data.city);
        next();
      })
      .catch(err => {
        next();
      });
    },
  };
