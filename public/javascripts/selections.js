'use strict';

function main () {
  // const teamApi = 'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English%20Premier%20League';
  const teamApi = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=';
  const team = [];
  const searchButton = document.querySelector('.search-btn');

  function capitalizeFirstLetter (string) {
    let teamInputSpace = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    return teamInputSpace.split(' ').join('_');
  };

  function getTeams () {
    const teamInput = document.getElementById('team-search').value;
    const teamInputUpdated = capitalizeFirstLetter(teamInput);
    console.log(teamInputUpdated);
    axios.get(teamApi + teamInputUpdated)
      .then((response) => {
        const a = response.data.teams[0];

        axios.post('/dashboard', {team: teamInputUpdated})
          .then((result) => {
            window.location.href = result.data.redirect;
          });

        console.log(team);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchButton.addEventListener('click', getTeams);
}

window.addEventListener('load', main);
