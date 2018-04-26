'use strict';

function mainTeamInfo (team) {
  const teamApi = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=';

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
      teamWeb.href = response.data.teams[0].strWebsite;
      const teamYoutube = document.querySelector('.team-youtube');
      teamYoutube.href = response.data.teams[0].strYoutube;
      const teamFace = document.querySelector('.team-facebook');
      teamFace.href = response.data.teams[0].strFacebook;
      const teamInstagramm = document.querySelector('.team-instagramm');
      teamInstagramm.href = response.data.teams[0].strInstagram;
    })
    .catch(error => {
      console.log(error);
    });
}
