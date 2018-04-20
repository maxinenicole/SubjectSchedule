var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SubjectSchedule = new Schema({
date:{
 type:Date,
 required:false
},
subject:{
 type:String,
 required:false
},
dayOfTheWeek:{
  type:String,
  required:false
}
});
module.exports = mongoose.model('SubjectSchedule', SubjectSchedule);