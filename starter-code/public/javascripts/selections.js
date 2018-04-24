'use strict';

function main () {
  const teamApi = 'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English%20Premier%20League';
  const team = [];
  const searchButton = document.querySelector('.search-btn');

  function getTeams () {
    const teamInput = document.getElementById('team-search').value;
    console.log(teamInput);
    axios.get(teamApi)
      .then((response) => {
        for (var i = 0; i < response.data.teams.length; i++) {
          let a = response.data.teams[i];
          team.push(a);
          if (teamInput === a.strTeam) {
            console.log('correct');

            axios.post('/dashboard', {team: teamInput})
              .then((result) => {
                window.location.href = result.data.redirect;
              });
          }
        }
        console.log(team);
      })
      //     const form = document.querySelector('form');
      //     form.innerHTML += `<button class="team-selector"><img src="${a.strTeamBadge}" alt="${a.strTeam}"> </button>`;
      //   };
      // })
      .catch((error) => {
        console.log(error);
      });
  }

  searchButton.addEventListener('click', getTeams);
}

window.addEventListener('load', main);
