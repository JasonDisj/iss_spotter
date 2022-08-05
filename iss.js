const request = require('request');

// const url = 'https://api.ipify.org?format=json';
//  const fetchMyIP = function(callback) { 
//   request(url, (err, response, body) => {
//     if (err) {
//       callback(err, null);
//       return;
//     }
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }
//     callback(null, JSON.parse(body).ip);
//   })
// }



// const url = `http://ipwho.is/${ip}`;
// const fetchCoordsByIP = function(ip, callback) {
//   request(url, (err, response, body) => {
//     if (err) {
//       callback(err, null);
//       return;
//     }
//     if (!JSON.parse(body).success) {
//       const msg = `Success status was ${JSON.parse(boday).success}. Server message says: ${JSON.parse(body).message} when fetching for IP ${JSON.parse(body).ip}`;
//       callback(Error(msg), null);
//       return;
//     }
//     const latitude = JSON.parse(body).latitude;
//     const longitude = JSON.parse(body).longitude
//     callback(null, {latitude, longitude})
//   });
// }

// const fetchISSFlyOverTimes = function(coordinates, callback) {
//   const url = `https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
//   request(url, (err, response, body) => {
//     if (err) {
//       callback(err, null);
//       return;
//     }
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }
//     callback(null, JSON.parse(body).response);
//   })
// }



const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coordinates, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};



// module.exports = { fetchMyIP };
// module.exports = { fetchCoordsByIP };
// module.exports = { fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };