const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config();

const pushURL = process.env.PUSHDB_URL || 'https://project-toolchain-iotpushtodb.mybluemix.net';
const MAXVALUE_SENSOR = 4095;

router.get('/', (req, res) =>{
    res.send('Microservice to handle IoT device Inputs');
})

router.post('/processInputData', async (req, res) => {
    let input = req.body;
    
    if (!validateInput()) {
        res.status(400).json('bad request, please check your data');
    }

    let macid = preprocessInput(input);
    input = {sensorData: input, macid: macid}

    let jsonToSend = JSON.stringify(input);

    let microServiceResponse = {};

    fetch(pushURL+ '/api/pushSensorDatatoDB' ,{
        method: 'POST',
        body: jsonToSend,
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res =>res.json())
    .then(json => {
        microServiceResponse = json;
        console.log(microServiceResponse)
    })
    .catch(err => console.log(err));
    

    res.status(202).send();
});


function validateInput() {
    let valid = true;
    
    return valid;
}

//Mofifies the values of soilHumidity,rainDrops,light of the input Json and returns macid Value
function preprocessInput(input) {
    let macid={};

    if(input.rainDrops < 4000)
        input.rainDrops = 'Y';
    else
        input.rainDrops = 'N';
    
        input.soilHumidity = transformValueToPercentage(input.soilHumidity);
        input.light = transformValueToPercentage(input.light);

    macid= input.macid;
    delete input["macid"];
    
    return macid;
}

//transform the input value to a percentage
function transformValueToPercentage(sensorValue) {
    let decimalValue = 1-(sensorValue/MAXVALUE_SENSOR);
    let intValue = decimalValue * 100;
    return intValue.toFixed(2);
}

module.exports = router;