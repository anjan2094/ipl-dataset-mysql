
// 1. Plot the number of matches played per year of all the years in IPL.
module.exports = {
    matchesPlayed: function (matches) {
        let problem1 = matches.reduce(function (acc, cur) {
            acc[cur.season] = (acc[cur.season] + 1) || 1
            return acc;
        }, {});
        return problem1
    },

    //2. Plot a stacked bar chart of matches won of all teams over all the years of IPL.

    winTeam: function (matches) {
        let problem2 = matches.reduce(function (acc, cur) {
            if (acc.hasOwnProperty([cur.season])) {

                if (acc[cur.season].hasOwnProperty([cur.winner])) {
                    acc[cur.season][cur.winner] = acc[cur.season][cur.winner] + 1;
                }
                else {
                    acc[cur.season][cur.winner] = 1;
                }
            }
            else {
                acc[cur.season] = {}
                acc[cur.season][cur.winner] = 1;
            }
            return acc;
        }, {});
        return problem2
    },

    // 3. For the year 2016 plot the extra runs conceded per team.

    extraRuns: function (matches, delivery) {

        let data2016 = matches.filter(function (year) {

            if (year.season === 2016) {
                return year.id
            }
        })
        let matchId2016 = data2016.map(function (value) {
            return value.id;
        })

        let problem3 = delivery.reduce(function (acc, cur) {

            if (matchId2016.includes(parseInt(cur.match_id))) {
                if (acc.hasOwnProperty(cur.bowling_team)) {
                    acc[cur.bowling_team] = acc[cur.bowling_team] + parseInt(cur.extra_runs)
                }
                else {
                    acc[cur.bowling_team] = {};
                    acc[cur.bowling_team] = parseInt(cur.extra_runs)
                }
            }

            return acc
        }, {})
        return problem3;
    },

    // 4.For the year 2015 plot the top economical bowlers.

    economyBowler: function (matches, delivery) {

        let data2015 = matches.filter(function (year) {

            if (year.season === 2015) {
                return year.id
            }
        })
        let matchId2015 = data2015.map(function (value) {

            return value.id

        })
        let problem4 = delivery.reduce(function (acc, cur) {

            if (matchId2015.includes(parseInt(cur.match_id))) {
                if (acc.hasOwnProperty(cur.bowler)) {
                    acc[cur.bowler]['runs'] = acc[cur.bowler]['runs'] + parseInt(cur.total_runs);
                    acc[cur.bowler]['balls'] = acc[cur.bowler]['balls'] + 1;
                }
                else {
                    acc[cur.bowler] = {}
                    acc[cur.bowler]['runs'] = parseInt(cur.total_runs);
                    acc[cur.bowler]['balls'] = 1;
                }
            }
            return acc;
        }, [])
        let bowlerName = Object.keys(problem4)
        let bowlerEconomy = {};

        for (i in bowlerName) {
            if (problem4.hasOwnProperty(bowlerName[i])) {
                bowlerEconomy[bowlerName[i]] = (problem4[bowlerName[i]]['runs'] / problem4[bowlerName[i]]['balls']) * 6;
            }
        }
        return bowlerEconomy;
    }
}