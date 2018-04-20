var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SubjectSchedule = new Schema({

date:{
 type:Date,
 required:false
},
opponent:{
 type:String,
 required:false
},
hasBeenPlayed:{
  type:Boolean,
  required:false
},
isWinner:{
  type:Boolean,
  required:false
},
score:{
  type:String,
  required:false
}
});
module.exports = mongoose.model('SubjectSchedule', SubjectSchedule);