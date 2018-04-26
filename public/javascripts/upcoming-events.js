'use strict';

function mainTeamEvents (team_id) {
  const teamEventApi = 'https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=';
  const teamApi = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=';
  console.log(team_id);

  axios
    .get(teamEventApi + team_id)
    .then(response => {
      let eventDuration = response.data.events.length;
      let homeGameId = [];
      let homeTeam = [];
      let awayTeam = [];
      let homeTeamColor = [];
      let allPromises = {
        homeTeam: [],
        awayTeam: []
      };

      console.log(response);
      console.log(eventDuration);

      const title = response.data.events[0].strLeague;
      document.getElementById('league').innerHTML = title;

      for (let i = 0; i < eventDuration; i++) {
        homeTeam.push(response.data.events[i].strHomeTeam);
        awayTeam.push(response.data.events[i].strAwayTeam);
        homeGameId.push(response.data.events[i].idHomeTeam);

        allPromises.homeTeam.push(axios.get(teamApi + homeTeam[i]));
        allPromises.awayTeam.push(axios.get(teamApi + awayTeam[i]));
      }

      const homePromises = Promise.all(allPromises.homeTeam);
      const awayPromises = Promise.all(allPromises.awayTeam);

      Promise.all([homePromises, awayPromises])
        .then((result) => {
          result[0].forEach((elem, idx) => {
            const homeBadge = elem.data.teams[0].strTeamBadge;
            const awayBadge = result[1][idx].data.teams[0].strTeamBadge;

            let teamElement = document.createElement('div');
            let domContainers = `<div class="container-teams">
                <img  class="badgeimg" src="${homeBadge}">
                <span class="vs">vs</span>
                <img class="badgeimg" src="${awayBadge}">
                </div>`;
            teamElement.innerHTML = domContainers;
            document.getElementById('up-coming-events').appendChild(teamElement.firstChild);
          });
        });
    })
    .catch(error => {
      console.log(error);
    });
}
