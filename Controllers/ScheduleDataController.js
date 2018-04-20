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
/*
function getSubjectInfo(req,res)
{
let subjectToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.subjectName ? req.body.result.parameters.subjectName : 'Unknown';
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
                speech: 'Currently I am not having info about this team',
                displayText: 'Currently I am not having information about this team',
                source: 'subject info'
            });
        }
      });
}*/

function getSubjectInfo(req,res)
{
	let subjectToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.subjectName ? req.body.result.parameters.subjectName : 'Unknown';
	SubjectInfo.findOne({name:subjectToSearch},function(err, subjectExists)
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
                source: 'subject existssss'
            });
        }
        else {
          return res.json({
                speech: 'Currently I am not having info about '+subjectToSearch,
                displayText: 'Currently I am not having information about this team',
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
        SubjectSchedule.find({opponent:team},function(err,games)
        {
          if (err)
          {
            return res.json({
                speech: 'Something went wrong!',
                displayText: 'Something went wrong!',
                source: 'game schedule'
            });
          }
          if (games)
          {
            var requiredGame;
            for (var i=0; i < games.length; i++)
            {
                var game = games[i];
var convertedCurrentDate = new Date();
                var convertedGameDate = new Date(game.date);
if (convertedGameDate > convertedCurrentDate)
                {
                  if(games.length > 1)
                  {
                    requiredGame = games[i-1];
var winningStatement = "";
                    if (requiredGame.isWinner)
                    {
                        winningStatement = "Kings won this match by "+requiredGame.score;
                    }
                    else {
                      winningStatement = "Kings lost this match by "+requiredGame.score;
                    }
                    return res.json({
                        speech: 'Last game between Kings and '+parameters.team+' was played on '+requiredGame.date+' .'+winningStatement,
                        displayText: 'Last game between Kings and '+parameters.team+' was played on '+requiredGame.date+' .'+winningStatement,
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