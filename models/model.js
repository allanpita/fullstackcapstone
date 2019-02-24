const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
studentid:{type:String, required:[true, 'Student ID is required' ], unique:[true]},
firstname:{type:String, required:[true, 'Firstname is required' ]},
lastname:{type:String, required:[true, 'Lastname is required' ]},
age:{type:Number, required:[true, 'Age is required' ]},
curriculum:[
{class:{type:String,required:[true, 'Class is required' ]},
GPA:{type:Number,required:[true, 'GPA is required' ]},
absences:{type:Number}
}]

});

studentSchema
.virtual('fullname')
.get(function () {
  return this.firstname + ', ' + this.lastname;
});

const student = mongoose.model('student', studentSchema);
module.exports = student; 

/*

{
	"firstname":"joe",
	"lastname":"Doe",
	"age":21,
	"curriculum":[
		{"class":"Math",
		"GPA":90,
		"absences":2},
		{"class":"History",
		"GPA":90,
		"absences":2},
		{"class":"Science",
		"GPA":90,
		"absences":2},
		{"class":"English",
		"GPA":90,
		"absences":2},
		{"class":"Elective",
		"GPA":90,
		"absences":2}
		]
	
}

*/