const express = require("express");


const router = express.Router();
const Action = require('../data/helpers/actionModel')

router.get('/api/actions/:id', validateId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/api/actions/:id', validateActionField, (req, res) => {
    const newAction = {project_id: req.params.id, ...req.body}
    Action.insert(newAction)
    .then((action) => {
        res.status(201).json(action)
    }).catch((err) => {
        res.status(500).json(err.message)
    })
})

router.put('/api/actions/:id',[validateId, validateActionField], (req, res) => {
    Action.update(req.params.id, req.body)
    .then((updatedAction) => {
        res.status(200).json(updatedAction)
    }).catch((err) => {
        res.status(500).json(err.message)
    })
})

router.delete('/api/actions/:id', validateId, (req, res) => {
    Action.remove(req.params.id)
    .then(() => {
        res.status(200).json({message: `successfully deleted post id of ${req.params.id}`})
    }).catch((err) => {
        res.status(500).json(err.message)
    })
})


function validateId(req, res, next) {
    const { id } = req.params
    Action.get(id)
    .then((data) => {
        if(data){
            req.action = data
            next()
        } else {
            res.status(400).json({message: `no projects found with id ${id}`})
        }
    }).catch((err) => {
        res.status(500).json(err.message)
    })
}

function validateActionField(req, res, next){
    if(!req.body){
        res.status(400).json('missing text data')
    } else if(!req.body.notes || !req.body.description){
        res.status(400).json('please fill out notes and description field')
    } else {
        next()
    }
}
module.exports = router