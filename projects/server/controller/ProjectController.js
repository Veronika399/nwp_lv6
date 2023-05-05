var Projectdb = require('../model/project');

exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id;

        Projectdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({
                        message: `Project with ${id} not found!`
                    });
                }else{
                    res.json(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: `Error retrieving project with id ${id}`});
            })
    }else{
        Projectdb.find()
            .then(project => {
                res.json(project)
            })
            .catch(err =>{
                res.status(500).send({ message: err.message || "Error occurred while retrieving project information!"});
            })
    }
}

exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty!"});
        return;
    }

    const project = new Projectdb({
        name : req.body.name,
        price: req.body.price,
        tasks_done: '',
        description: req.body.description,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
        members: '',
    });

    project
        .save(project)
        .then(data => {
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Some error occurred while creating a new project!"
            });
        });
}


exports.update = (req, res) => {
    if(!req.body){
        return res
            .status(400)
            .send({message:"Data to update can not be empty!"});
    }

    const id = req.params.id;
    req.body.updated_at = new Date(Date.now());


    Projectdb.findByIdAndUpdate(id, req.body, { new: true})
        .then(data => {
            if(!data){
                res.status(404).send({ message: `Cannot update project with ${id}.`})
            }else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message: "Invalid project information"});
        });
}


exports.delete = (req, res) => {
    const id = req.params.id;

    Projectdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message: `Cannot delete with id ${id}. Maybe id is wrong.`});
            }else{
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: `Could not delete project with ${id}`
            })
        })
}

