var table = document.getElementById("data");
var district_table = document.getElementById("district_data");
var district_name = document.getElementById("district");
var goback = document.getElementById("back");
var goback1 = document.getElementById("back1");
var district_header = document.getElementById("district");
var row, state_name, Confirmed, Deaths, recovered, anchor,delta_confirmed, delta_recovered, delta_deaths;
var json_data;
var district_delta_confirmed, district_delta_recovered, district_delta_deaths;

function getStatesData() {
  fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api_india", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
      "x-rapidapi-key": "c31eb42d89msh1d8880fda342e90p1a87e2jsncf22d0ecf439",
    },
  })
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      json_data = data;
      updateTable(data);
    })
    .catch((err) => {
      console.log(err);
    });

}

function updateTable(data) {
  var i = 0;
  for (let key in data.state_wise) {
    row = document.createElement("tr");
    state_name = document.createElement("td");
    Confirmed = document.createElement("td");
    delta_confirmed = document.createElement('span');
    delta_confirmed.setAttribute('style','color: red;');
    delta_deaths = document.createElement('span');
    delta_deaths.setAttribute('style','color: #7f53ac;');
    delta_recovered = document.createElement('span');
    delta_recovered.setAttribute('style','color: green;');
    Deaths = document.createElement("td");
    recovered = document.createElement("td");
    anchor = document.createElement("a");
    anchor.setAttribute("href", "#");
    anchor.setAttribute("onclick", "show_district()");
    anchor.innerText = key;
    Confirmed.innerText = data.state_wise[key].confirmed;
    delta_confirmed.innerText = " "+"[ "+data.state_wise[key].deltaconfirmed+" ]";
    Deaths.innerText = data.state_wise[key].deaths;
    delta_deaths.innerText = " "+"[ "+data.state_wise[key].deltadeaths+" ]";
    recovered.innerText = data.state_wise[key].recovered;
    delta_recovered.innerText = " "+"[ "+data.state_wise[key].deltarecovered+" ]";
    state_name.appendChild(anchor);
    row.appendChild(state_name);
    row.appendChild(Confirmed);
    Confirmed.appendChild(delta_confirmed);
    row.appendChild(Deaths);
    Deaths.appendChild(delta_deaths);
    row.appendChild(recovered);
    recovered.appendChild(delta_recovered);
    table.appendChild(row);
  }
    // Disable district table Button
    if (!goback.classList.contains("display_toggle")) {
      goback.classList.toggle("display_toggle");
    }
  // Enable Homepage Button
  if (goback1.classList.contains("display_toggle")) {
    goback1.classList.toggle("display_toggle");
  }
}

function show_district() {
  var target = event.target || event.srcElement;
  name = target.innerText;
  // Disable Main Table
  if (!table.classList.contains("display_toggle")) {
    table.classList.toggle("display_toggle");
  }

  // Disable Homepage Button
  if (!goback1.classList.contains("display_toggle")) {
    goback1.classList.toggle("display_toggle");
  }

  // Enable District Name Header
  if (district_name.classList.contains("display_toggle")) {
    district_name.classList.toggle("display_toggle");
  }

  // Enable District Table
  if (district_table.classList.contains("display_toggle")) {
    district_table.classList.toggle("display_toggle");
  }

  // Enable Button
  if (goback.classList.contains("display_toggle")) {
    goback.classList.toggle("display_toggle");
  }

  district_name.innerText = "Cases in " + name;
  var i = 0;
  for (let key in json_data.state_wise[name].district) {
    row = document.createElement("tr");
    dis_name = document.createElement("td");
    Confirmed = document.createElement("td");
    district_delta_confirmed = document.createElement('span');
    district_delta_confirmed.setAttribute('style','color: red');
    Deaths = document.createElement("td");
    district_delta_deaths = document.createElement('span');
    district_delta_deaths.setAttribute('style','color: #7f53ac');
    recovered = document.createElement("td");
    district_delta_recovered = document.createElement('span');
    district_delta_recovered.setAttribute('style','color: green');
    dis_name.innerText = key;
    Confirmed.innerText = json_data.state_wise[name].district[key].confirmed;
    district_delta_confirmed.innerText = " " + "[ " + json_data.state_wise[name].district[key].delta.confirmed + " ]";
    Deaths.innerText = json_data.state_wise[name].district[key].deceased;
    district_delta_deaths.innerText = " " + "[ " + json_data.state_wise[name].district[key].delta.deceased + " ]";
    recovered.innerText = json_data.state_wise[name].district[key].recovered;
    district_delta_recovered.innerText =  " " + "[ "+ json_data.state_wise[name].district[key].delta.recovered + " ]";
    row.appendChild(dis_name);
    row.appendChild(Confirmed);
    Confirmed.appendChild(district_delta_confirmed);
    row.appendChild(Deaths);
    Deaths.appendChild(district_delta_deaths);
    row.appendChild(recovered);
    recovered.appendChild(district_delta_recovered);
    district_table.appendChild(row);
  }
}
