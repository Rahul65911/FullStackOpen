const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());
app.options('*',cors());
var allowCrossDomain = (req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);


morgan.token('body', (req, res) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

const generateId= () => {
    return String(Math.floor(Math.random()*10000));
}

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const p = persons.find(p => p.id === id);
    if(p) {
        res.json(p);
    } else {
        res.status(400).json({
            error: "person not found",
        })
    }
});

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people <br />
        ${Date()}</p>`);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const p = persons.find(p => p.id === id);
    
    if(p) {
        persons = persons.filter(p => p.id !== id);
        res.status(204).send();
    } else {
        res.status(400).json({
            error: "Person does not exist or already deleted!!!",
        });
    }
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if(!body.name || !body.number) {
        return res.status(400).json({
            error: "Requered Name and Number!!!"
        });
    }

    let p = persons.find(p => p.name === body.name)
    if(p) {
        return res.status(400).json({
            error: "name must be unique"
        });
    }

    let person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    };

    persons = persons.concat(person);
    res.json(person);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));