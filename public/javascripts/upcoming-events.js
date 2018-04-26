'use strict';

function mainTeamEvents (team_id) {
  const teamEventApi = 'https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=';
  console.log(teamID);

  axios
    .get(teamEventApi + team_id)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}
