var express = require('express');
var server = express();
var port = process.env.PORT || 8080;
var apiKey = require('./secrets').googleGeoAPIKey;
var axios = require('axios');
var root = 'https://jsonplaceholder.typicode.com';
var locationRoot = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

server.get('/posts/:postID', function(request, response){
  var postID = request.params.postID;
  var url = `${root}/posts/${postID}`;
  axios.get(url)
        .then(function(results){
          response.send(results.data);
        })
        .catch(function(err){
          response.send(err);
        })
});

server.get('/location/:address', function(req, resp){
  var address = req.params.address;
  var location = `${locationRoot}${address}&key=${apiKey}`;
  axios.get(location)
      .then(function(results){
        resp.send(results.data);
      })
      .catch(function(err){
        resp.send(err);
      })

});



server.listen(port);
