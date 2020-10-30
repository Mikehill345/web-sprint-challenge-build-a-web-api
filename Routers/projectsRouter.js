const express = require("express");


const router = express.Router();
const Project = require('../data/helpers/projectModel')


router.get('/api/projects/:id', validateId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/api/projects', validateProjectField, (req, res) => {
    Project.insert(req.body)
    .then((post) => {
        res.status(201).json(post)
    }).catch((err) => {
        res.status(500).json(err.message)
    })
})

router.put('/api/projects/:id',[validateId, validateProjectField], (req, res) => {
    Project.update(req.params.id, req.body)
    .then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(500).json(err.message)
    })
})

router.delete('/api/projects/:id', validateId, (req, res) => {
    Project.remove(req.params.id)
    .then(() => {
        res.status(200).json({message: `successfully deleted post id of ${req.params.id}`})
    }).catch((err) => {
        res.status(500).json(err.message)
    })
})

router.get('/api/projects/:id/actions',[validateId], (req, res) => {
    Project.getProjectActions(req.params.id)
    .then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(500).json(err.message)
    })
})


function validateId(req, res, next) {
    const { id } = req.params
    Project.get(id)
    .then((data) => {
        if(data){
            req.project = data
            next()
        } else {
            res.status(400).json({message: `no projects found with id ${id}`})
        }
    }).catch((err) => {
        res.status(500).json(err.message)
    })
}

function validateProjectField(req, res, next){
    if(!req.body){
        res.status(400).json('missing text data')
    } else if(!req.body.name || !req.body.description){
        res.status(400).json('please fill out name and description field')
    } else {
        next()
    }
}
module.exports = router