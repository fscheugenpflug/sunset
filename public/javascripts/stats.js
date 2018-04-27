'use strict';

function standingsInfo (league_id) {
  const standingsApi = 'https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=';
  const teamEventApi = 'https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=';

  axios
    .get(standingsApi + league_id)
    .then(response => {
      console.log(response);
      const tableDiv = document.querySelector('.standing-table');
      const tableElement = response.data.table;
      const leagueId = response.data.table[0].teamid;
      console.log(leagueId);
      const teamContainer = [];

      tableElement.forEach((element, index) => {
        var divTeamElement = document.createElement('div');
        divTeamElement.setAttribute('class', 'team-container');
        tableDiv.appendChild(divTeamElement);
        teamContainer.push(document.querySelectorAll('.team-container'));
        const name = document.createElement('div');
        name.innerText = tableElement[index].name;
        teamContainer[index][index].appendChild(name);
        const played = document.createElement('div');
        played.innerText = tableElement[index].played;
        teamContainer[index][index].appendChild(played);
        const win = document.createElement('div');
        win.innerText = tableElement[index].win;
        teamContainer[index][index].appendChild(win);
        const draw = document.createElement('div');
        draw.innerText = tableElement[index].draw;
        teamContainer[index][index].appendChild(draw);
        const loss = document.createElement('div');
        loss.innerText = tableElement[index].loss;
        teamContainer[index][index].appendChild(loss);
        const goalsfor = document.createElement('div');
        goalsfor.innerText = tableElement[index].goalsfor;
        teamContainer[index][index].appendChild(goalsfor);
        const goalsagainst = document.createElement('div');
        goalsagainst.innerText = tableElement[index].goalsagainst;
        teamContainer[index][index].appendChild(goalsagainst);
        const total = document.createElement('div');
        total.innerText = tableElement[index].total;
        teamContainer[index][index].appendChild(total);
      });
      axios.get(teamEventApi + leagueId)
        .then(response => {
          console.log(response);
          const standingsTitle = response.data.events[0].strLeague;
          document.getElementById('standing').innerHTML = ' Standings for ' + standingsTitle;
        });
    })
    .catch(error => {
      console.log(error);
    });
}
