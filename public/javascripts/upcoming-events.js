'use strict';

function mainTeamEvents (team_id) {
  const teamEventApi = 'https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=';
  const teamApi = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=';
  console.log(team_id);
  console.log(teamApi + team_id);
  axios
    .get(teamEventApi + team_id)
    .then(response => {
      let eventDuration = response.data.events.length;
      let homeGameId = [];
      let homeTeam = [];
      let awayTeam = [];
      let gameDate = [];
      let allPromises = {
        homeTeam: [],
        awayTeam: []
      };
      console.log(response);

      const title = response.data.events[0].strLeague;
      document.getElementById('league').innerHTML = title;

      for (let i = 0; i < eventDuration; i++) {
        homeTeam.push(response.data.events[i].strHomeTeam);
        awayTeam.push(response.data.events[i].strAwayTeam);
        homeGameId.push(response.data.events[i].idHomeTeam);
        gameDate.push(response.data.events[i].strDate);

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
            console.log(homeBadge);
            let teamElement = document.createElement('div');
            let domContainers = `<div class="team-container-upcoming">
          <img  class="badgeimg" src="${homeBadge}">
          <span class="vs">vs <br> ${gameDate[idx]}</span>
          
          <img class="badgeimg" src="${awayBadge}">
          </div>`;
            teamElement.innerHTML = domContainers;
            document.getElementById('upcoming-events').appendChild(teamElement.firstChild);
          });
        });
    })
    .catch(error => {
      console.log(error);
    });
}
