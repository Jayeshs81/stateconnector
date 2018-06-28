/************************************************************************
 * MAIN CODE
 ************************************************************************/
const express = require("express");
const bodyparser = require("body-parser");
const request=require('request');

var app = express();
app.use(bodyparser.json());

//-- Connector Descriptor
app.get("/", function(req, res) {
    console.log("-- Received for connector descriptor received.");
    
    var descriptor = {};
    descriptor.key = "States_of_India";
    descriptor.name = "States of India";
    descriptor.description = "Provides a list of states in India";

    stateDescriptor = {};
    stateDescriptor.key = "State";
    stateDescriptor.recordType = "value";
    stateDescriptor.optionsAvailable = true;
    stateDescriptor.fetchOneAvailable = true;

    id = {};
    id.key = "id";
    id.name = "Id";
    id.type = {};
    id.type.name = "number";

    country = {};
    country.key = "country";
    country.name = "Country";
    country.type = {};
    country.type.name = "text";

    name = {};
    name.key = "name";
    name.name = "Name";
    name.type = {};
    name.type.name = "text";

    abbr = {};
    abbr.key = "abbr";
    abbr.name = "Abbreviation";
    abbr.type = {};
    abbr.type.name = "text";

    area = {};
    area.key = "area";
    area.name = "Area";
    area.type = {};
    area.type.name = "text";

    largest_city = {};
    largest_city.key = "largest_city";
    largest_city.name = "Largest City";
    largest_city.type = {};
    largest_city.type.name = "text";

    capital = {};
    capital.key = "capital";
    capital.name = "Capital";
    capital.type = {};
    capital.type.name = "text";    

    stateDescriptor.fields = [id, country, name, abbr, area, largest_city, capital];
    descriptor.typeDescriptors = [stateDescriptor];

    descriptor.version = 1;
    descriptor.protocolVersion = 1;

    res.set('Content-Type', 'application/json');
    var decsriptor = JSON.stringify(descriptor);
    res.send(decsriptor);
});

app.get("/state/options", function(req, response) {
    request.get('http://services.groupkt.com/state/get/IND/all', function(err,res,body) {
        console.log("-- Receive request for options.");
        if(err) { console.log("-- Error occurred when getting options."); }
        if(res.statusCode == 200 ) {
            console.log("-- Response body.");
            console.log(body);
            var data = JSON.parse(body);
            var states = [];
            for(var i = 0; i < data.RestResponse.result.length; i++) {
                var state = {};
                state.id = data.RestResponse.result[i].id;
                state.name = data.RestResponse.result[i].name;
                states.push(state);
            }
            response.set('Content-Type', 'application/json');
            console.log(JSON.stringify(states));
            response.send(JSON.stringify(states));
        }
    });
}
)

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
