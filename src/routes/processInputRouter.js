const router = require('express').Router();

const pushtoDB_URL = 'https://google.com';

router.get('/', (req, res) =>{
    res.send('Microservice to handle IoT device Inputs');
})

router.post('/processInput', (req, res) => {
    const { input } = req.body;
    
    if (! validateInput(input)) {
        res.status(400).json('bad request, please check your data');
    }

    fetch(pushtoDB_URL ,{
        method: 'POST',
        body: JSON.stringify(formatInputToJson(input)),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(json => {
        res.status(202);
    })
    .catch(err => console.log(err));

});


//Operacion suma
router.post('/suma', (req, res) => {
    const { nums } = req.body;
    let valor = 0;
    for(j=0; j<nums.length; j++)
        valor = valor+nums[j];

    res.send({ respuesta: valor});
});

function validateInput(input) {
    let valid = true;
    
    return valid;
}


module.exports = router;