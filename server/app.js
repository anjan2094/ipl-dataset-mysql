const express = require('express');
const app = express();
var mysql = require('mysql');
var path = require('path');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql123',
  database: 'ipldata'
});

app.use(express.static(path.join(__dirname, '../client')))
app.get("/matchPlayed", (req, res) => {
  connection.query("SELECT season as name, count(*) as y FROM matches group by season", function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
app.get("/winTeam", (req, res) => {
  connection.query("SELECT season, winner, count(winner) as count FROM matches group by season, winner", function (err, result) {
    if (err) {
      throw err;
    }
    else {
      let noOfMatchesPlayed = result.reduce(function (acc, cur) {
        if (cur.winner != 'null') {
          acc.push([cur.season, [cur.winner, cur.count]])
        }
        return acc;
      }, []);
      res.send(noOfMatchesPlayed);
      console.log(noOfMatchesPlayed);
    }
  });
});
app.get("/extraRuns", (req, res) => {
  connection.query("SELECT d.bowlingteam as team, sum(d.extraruns) as total FROM deliveries d where d.id in (select id from matches where season=2016) group by d.bowlingteam", function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
app.get("/economicalBowler", (req, res) => {
  connection.query("SELECT d.bowler as bowler, sum(d.batsmanruns) as runs, count(bowler) as ball FROM deliveries d where d.id in (select id from matches where season=2015) group by d.bowler", function (err, result) {
    if (err) throw err;
    let economy = result.reduce(function (acc, cur) {
      acc[cur.bowler] = (cur.runs / cur.ball) * 6;
      return acc;
    }, {});
    let sortable = [];
    for (var key in economy) {
      sortable.push([key, economy[key]]);
    }
    sortable.sort(function (a, b) {
      return a[1] - b[1];
    });
    let top10 = sortable.slice(0, 10);
    res.send(top10);
  });
});
app.listen('3000', () => {
  console.log("Server started on port 3000");
})

