/*

Environment variable: DATA_URL
--> Get request link provided by AWS API Gateway

Relevant connection: get_data/lambda_function.py

*/

const axios = require("axios");

exports.handler = async (event, context) => {
    // get_data script provides the data
    // Upon successful call, send data to another function
    let data = axios({
        method: "GET",
        url: process.env.DATA_URL,
    })
        .then((response) => {
            return convertGeoJson(response.data);
        })
        .catch((err) => {
            console.log(err);
            const error = {
                'name': err
            }
            return error;
        });

    // Main function to create and return data
    function convertGeoJson(data) {
        let geojson = {
            type: "FeatureCollection",
            features: [],
        };

        data.map((item) => {
            // Create individual entries for OpenStreetMap API
            let loo = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [item.lat, item.long],
                },
                properties: {
                    name: item.name,
                    code: item.code,
                    accessible: item.accessible,
                    gender_neutral: item.gender_neutral,
                    nearest_station: item.nearest_station,
                },
            };

            // Finally push individual entry to main array
            geojson.features.push(loo);

        });

        return geojson;

    }

    return data;

};