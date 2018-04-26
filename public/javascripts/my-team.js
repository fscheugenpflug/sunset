'use strict';

function mainTeamInfo (team, league_id, team_id) {
  const teamApi = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=';
  const standingsApi = 'https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=';

  axios
    .get(teamApi + team)
    .then(response => {
      console.log(response);
      const badgeTeam = document.querySelector('.team-logo');
      badgeTeam.src = response.data.teams[0].strTeamBadge;
      const teamGi = document.querySelector('#team-gi');
      teamGi.innerHTML = response.data.teams[0].strDescriptionEN;
      const teamSi = document.querySelector('#team-si');
      teamSi.innerHTML = response.data.teams[0].strStadiumDescription;
      const teamStadium = document.querySelector('.stadium');
      teamStadium.src = response.data.teams[0].strStadiumThumb;
      const teamWeb = document.querySelector('.team-website');
      teamWeb.setAttribute('href', `http://${response.data.teams[0].strWebsite}`);
      const teamYoutube = document.querySelector('.team-youtube');
      teamYoutube.setAttribute('href', `http://${response.data.teams[0].strYoutube}`);
      const teamFace = document.querySelector('.team-facebook');
      teamFace.setAttribute('href', `http://${response.data.teams[0].strFacebook}`);
      const teamInstagramm = document.querySelector('.team-instagramm');
      teamInstagramm.setAttribute('href', `http://${response.data.teams[0].strInstagram}`);
    })
    .catch(error => {
      console.log(error);
    });

  axios
    .get(standingsApi + league_id)
    .then(response => {
      console.log(response);
      const currentPositionTag = document.querySelector('h4');
      const standingInformation = response.data.table;
      for (let i = 0; i < standingInformation.length; i++) {
        if (standingInformation[i].teamid === team_id) {
          var currentPosition = i + 1;
        };
      };
      currentPositionTag.innerHTML = currentPosition;
    })
    .catch(error => {
      console.log(error);
    });
}
