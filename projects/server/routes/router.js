const express = require('express');
const route = express.Router();

const projectController = require('../controller/ProjectController');

route.get('/', (req, res) => {
    res.send('Crud App!')
});

route.get('/api/papi', (req, res) => {
    res.send('Crud App!')
})


route.get('/api/projects', projectController.find);
route.post('/api/projects', projectController.create);
route.put('/api/projects/:id', projectController.update);
route.delete('/api/projects/:id', projectController.delete);

module.exports = route;