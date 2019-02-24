const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const student = require('../models/model')
const app = express();
//allows CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//My Get Route
router.get('/api/', (req,res) =>{
	student.find({},(err, students)=>{
		res.json(students);
	})
});
//My Get by id Route
router.get('/api/:id', (req,res) =>{
	student.findById(req.params.id, (err, student)=>{
		if (err){
		res.status(500).send(`${err} Cannot find the specified ID`)}
		else{
			res.json(student);
		}
	})
});
//My Post Route
router.post('/api/', (req,res)=>{
	student.create(req.body)
	.then((student)=>{
		res.send(student);
	})
});
//My Put Route
router.put('/api/:id',(req,res)=>{
	student.findById(req.params.id, (err, studentchanged)=>{
		studentchanged.grades.Math = req.body.grades.Math;
		studentchanged.grades.English = req.body.grades.English;
		studentchanged.grades.Science = req.body.grades.Science;
		studentchanged.grades.History = req.body.grades.History;
		studentchanged.grades.Elective = req.body.grades.Elective;
		studentchanged.save()
		res.json(studentchanged)
	})
});
//My Delete Route
router.delete('/api/:id', (req,res)=>{
	student.findById(req.params.id, (err, deletestudent)=>{
		if (err){
		res.status(500).send(`${err} Cannot find the specified item`)}
		else{
			deletestudent.remove();
			res.status(204).send('Student Removed');
		}
	})
});

module.exports = router;

