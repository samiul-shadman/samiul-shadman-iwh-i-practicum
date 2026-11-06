const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;

const CUSTOM_OBJECT = 'cars';
const CUSTOM_OBJECT_PROPERTIES = 'name,car_model,engine,wheels';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here
app.get('/', async (req, res) => {
    const carsUrl = `https://api.hubspot.com/crm/v3/objects/${CUSTOM_OBJECT}?properties=${CUSTOM_OBJECT_PROPERTIES}`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };
    try {
        const resp = await axios.get(carsUrl, { headers });
        const data = resp.data.results;
        res.render('homepage', { title: 'Cars | HubSpot APIs', data });
    } catch (error) {
        console.error(error);
    }
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here
app.get('/update-cobj', async (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here
app.post('/update-cobj', async (req, res) => {
    const newCar = {
        properties: {
            name: req.body.name,
            car_model: req.body.car_model,
            engine: req.body.engine,
            wheels: req.body.wheels
        }
    };

    const createCarUrl = `https://api.hubspot.com/crm/v3/objects/${CUSTOM_OBJECT}`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(createCarUrl, newCar, { headers });
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));
