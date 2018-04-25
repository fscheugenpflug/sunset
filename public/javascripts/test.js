const formElement = document.querySelector('form');
divElement.setAttribute('class', 'team-selector');
let innerElement = `<p>${a.strTeam}</p>`;
innerElement.appendChild(divElement);
formElement.appendChild(divElement);
console.log(team[i]);

// axios
//   .get(teamInfoApi + 'Arsenal') // Inputfield
//   .then((response) => {
//     console.log(response.data.teams[0].strTeam);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
