'use strict';

function mainTeamInfo (team) {
  const teamApi = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=';
  // const divElement = document.createElement('div');
  // const searchButton = document.querySelector('.search-btn');
  console.log();
  axios
    .get(teamApi + team)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}


//     const form = document.querySelector('form');
//     form.innerHTML += `<button class="team-selector"><img src="${a.strTeamBadge}" alt="${a.strTeam}"> </button>`;
//   };
// })
