const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const app = express();
const port = 80;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
}); 

app.post('/create', (req, res) => {
    //uuid
    const id = uuidv4();
    const { name, ipfs, theme } = req.body;

    // create a json file with the data and save it
    const data = {
        id,
        "name":name,
        "description":"Music NFT created by ABC",
        "image":ipfs,
        theme
    };

    fs.writeFileSync(`data/${id}.json`, JSON.stringify(data));

    res.send({
        file: `${id}.json`
    });

});

app.use('/data', express.static('data'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
