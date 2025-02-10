const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
const users = [];


const findUserById = (id) => users.find(u => u.id === id);

// 1. Create a User
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Both name and email are required!' });
    }

    const newUser = {
        id: uuidv4(),
        name,
        email
    };

    users.push(newUser);
    return res.status(201).json(newUser);
});

// 2. Retrieve a User
app.get('/users/:id', (req, res) => {
    const user = findUserById(req.params.id);

    if (!user) {
        return res.status(404).json({ error: 'The user cannot be found!' });
    }

    return res.status(200).json(user);
});

// 3. Update a User
app.put('/users/:id', (req, res) => {
    const user = findUserById(req.params.id);

    if (!user) {
        return res.status(404).json({ error: 'The user cannot be found!' });
    }

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Both name and email are required!' });
    }

    user.name = name;
    user.email = email;

    return res.status(200).json(user);
});

// 4. Delete a User
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'The user cannot be found!' });
    }

    users.splice(index, 1);
    return res.status(204).send(); 
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing