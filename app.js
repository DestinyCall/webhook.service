'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json()); 

const token = '1234567890';

app.get('/', (req, res) =>
{
    if (req.headers.token !== token) 
    {
         return res.sendStatus(401);
    }
    return res.end(req.query.challenge);
    res.send("Webhook Service");
});

app.post('/webhook', (req, res) => {
    
    if (req.headers.token !== token)  
     {
         return res.sendStatus(401);
     }

    // print request body
    console.log(req.body);

    // return a text response
    const data = {
        responses: [
            {
                type: 'text',
                elements: ['Hi From Order Webhook']
            }
        ]
    };

    res.json(data);
});

app.listen(7007, () => console.log('[Order] Webhook is listening'));