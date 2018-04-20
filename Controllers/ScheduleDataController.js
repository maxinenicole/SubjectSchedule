'use strict';
var mongoose = require('mongoose');
var SubjectInfo = mongoose.model('SubjectInfo');
var SubjectSchedule = mongoose.model('SubjectSchedule');

exports.processRequest = function(req, res) {
if (req.body.result.action == "schedule") {
    getSubjectSchedule(req,res)
  }
  else if (req.body.result.action == "tell.about")
  {
      getSubjectInfo(req,res)
  }
};

function getSubjectInfo(req,res)
{
let subjectToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.subject ? req.body.result.parameters.subject : 'Unknown';
SubjectInfo.findOne({name:subjectToSearch},function(err,subjectExists)
      {
        if (err)
        {
          return res.json({
              speech: 'Something went wrong!',
              displayText: 'Something went wrong!',
              source: 'subject info'
          });
        }
if (subjectExists)
        {
          return res.json({
                speech: subjectExists.description,
                displayText: subjectExists.description,
                source: 'subject info'
            });
        }
        else {
          return res.json({
                speech: 'Currently I am not having information about this subject',
                displayText: 'Currently I am not having information about this subject',
                source: 'subject info'
            });
        }
      });
}

function getSubjectSchedule(req,res)
{
let parameters = req.body.result.parameters;
    if (parameters.team1 == "")
    {
      let game_occurence = parameters.game_occurence;
      let team = parameters.team;
      if (game_occurence == "previous")
      {
        //previous game
        GameSchedule.find({opponent:team},function(err,subject)
        {
          if (err)
          {
            return res.json({
                speech: 'Something went wrong!',
                displayText: 'Something went wrong!',
                source: 'subject schedule'
            });
          }
          if (subject)
          {
            var requiredSubject;
            for (var i=0; i < subject.length; i++)
            {
                var subject = subject[i];
var convertedCurrentDate = new Date();
                var convertedSubjectDate = new Date(subject.date);
if (convertedSubjectDate > convertedCurrentDate)
                {
                  if(subject.length > 1)
                  {
                    requiredSubject = subject[i-1];
var winningStatement = "";
                    if (requiredSubject.isWinner)
                    {
                        winningStatement = "Kings won this match by "+requiredSubject.score;
                    }
                    else {
                      winningStatement = "Kings lost this match by "+requiredSubject.score;
                    }
                    return res.json({
                        speech: 'Last game between Kings and '+parameters.team+' was played on '+requiredSubject.date+' .'+winningStatement,
                        displayText: 'Last game between Kings and '+parameters.team+' was played on '+requiredSubject.date+' .'+winningStatement,
                        source: 'game schedule'
                    });
                    break;
                  }
                  else {
                    return res.json({
                        speech: 'Cant find any previous game played between Kings and '+parameters.team,
                        displayText: 'Cant find any previous game played between Kings and '+parameters.team,
                        source: 'game schedule'
                    });
                  }
                }
            }
}
});
      }
      else {
        return res.json({
            speech: 'Next game schedules will be available soon',
            displayText: 'Next game schedules will be available soon',
            source: 'game schedule'
        });
      }
    }
    else {
      return res.json({
          speech: 'Cant handle the queries with two teams now. I will update myself',
          displayText: 'Cant handle the queries with two teams now. I will update myself',
          source: 'game schedule'
      });
    }
  }