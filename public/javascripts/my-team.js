'use strict';

function mainTeamInfo (team) {
  const teamApi = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=';
  const teamInfoTotal = team;

  const aElement = document.createElement('a');
  // const searchButton = document.querySelector('.search-btn');
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
      // const teamNetwork = document.querySelector('.team-social-network');
      // aElement.href = response.data.teams[0].strWebsite;
      // teamNetwork.appendChild(aElement.href);
    })
    .catch(error => {
      console.log(error);
    });
}

//     const form = document.querySelector('form');
//     form.innerHTML += `<button class="team-selector"><img src="${a.strTeamBadge}" alt="${a.strTeam}"> </button>`;
//   };
// })
