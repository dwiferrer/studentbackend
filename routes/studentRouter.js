const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const Students = require("../models/students")

const studentRouter = express.Router()

studentRouter.use(bodyParser.json())

//STUDENTLIST
studentRouter.route("/studentlist")
.get((req, res, next) => {
    Students.find({})
    .then((student) => {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.json(student)
    }, (err) => next(err))
    .catch((err) => next(err))
})

.post((req, res, next) => {
    res.statusCode = 403
    res.end("POST operation not supported on /studentlist")
})

.put((req, res, next) => {
    res.statusCode = 403
    res.end("PUT operation not supported on /studentlist")
})

.delete((req, res, next) => {
    Students.remove({})
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.json(resp)
    }, (err => next(err)))
    .catch((err) => next(err))
})

//CREATE
studentRouter.route("/create")
.get((req, res, next) => {
    res.statusCode = 403
    res.end("GET operation not supported on /create")
})

.post((req, res, next) => {
    Students.create(req.body)
    .then((student) =>{
        console.log("Student created ", student)
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.json(student)
    }, (err => next(err)))
    .catch((err) => next(err))
})

.put((req, res, next) => {
    res.statusCode = 403
    res.end("PUT operation not supported on /create")
})

.delete((req, res, next) => {
    res.statusCode = 403
    res.end("DELETE operation not supported on /create")
})

//READ
studentRouter.route("/profile/:studentId")
.get((req, res, next) => {
    Students.find({sid: req.params.studentId})
    .then((student)=>{
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.json(student)
    }, (err) => next(err))
    .catch((err)=> next(err))
})

.put((req, res, next) => {
    res.statusCode = 403
    res.end("PUT operation not supported on /profile")
})

.post((req, res, next) => {
    res.statusCode = 403
    res.end("POST operation not supported on /profile")
})

.delete((req, res, next) => {
    res.statusCode = 403
    res.end("DELETE operation not supported on /profile")
})

//UPDATE
studentRouter.route("/edit/:studentId")
.get((req, res, next) => {
    res.statusCode = 403
    res.end("GET operation not supported on /edit")
})

.post((req, res, next) => {
    res.statusCode = 403
    res.end("POST operation not supported on /profile")
})

.put((req, res, next) => {
    Students.findOneAndUpdate({ sid: req.params.studentId}, {
        $set: req.body
    }, {new: true})
    .then((student)=>{
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.json(student)
    }, (err) => next(err))
    .catch((err)=> next(err))
})

.delete((req, res, next) => {
    res.statusCode = 403
    res.end("DELETE operation not supported on /profile")
})


//DELETE
studentRouter.route("/delete/:studentId")
.get((req, res, next) => {
    res.statusCode = 403
    res.end("GET operation not supported on /delete")
})

.post((req, res, next) => {
    res.statusCode = 403
    res.end("POST operation not supported on /delete")
})

.put((req, res, next) => {
    res.statusCode = 403
    res.end("PUT operation not supported on /delete")
})

.delete((req, res, next) => {
    Students.findOneAndRemove({ sid: req.params.studentId })
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.json(resp)
    }, (err => next(err)))
    .catch((err) => next(err))
})

module.exports = studentRouter