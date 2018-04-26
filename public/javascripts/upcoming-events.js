'use strict';

function mainTeamEvents (team_id) {
  const teamEventApi = 'https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=';
  console.log(team_id);

  axios
    .get(teamEventApi + team_id)
    .then(response => {
      var eventDuration = response.data.events.length;
      var homeGameId = [];
      var homeTeam = [];
      var awayTeam = [];
      var homeTeamColor = [];
      console.log(response);
      console.log(eventDuration);

      const title = response.data.events[0].strLeague;
      document.getElementById('league').innerHTML = title;

      for (var i = 0; i < eventDuration; i++) {
        homeTeam.push(response.data.events[i].strHomeTeam);
        awayTeam.push(response.data.events[i].strAwayTeam);
        homeGameId.push(response.data.events[i].idHomeTeam);
        var teamElement = document.createElement('div');
        var domContainers = `<div class="container-teams">
        <span class="home-team">${homeTeam[i]}</span>
        <span class="vs">vs</span>
         <span class="away-team"> ${awayTeam[i]}</span>
         </div>`;
        teamElement.innerHTML = domContainers;
        document.getElementById('up-coming-events').appendChild(teamElement.firstChild);

        if (team_id === homeGameId[i]) {
          homeTeamColor = document.querySelectorAll('.home-team');
          homeTeamColor[i].style.color = 'rgba(0, 66, 37, 0.5)';
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
}

checkIfMatch();
