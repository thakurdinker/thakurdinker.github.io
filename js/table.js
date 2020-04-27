var table = document.getElementById("data");
var district_table = document.getElementById("district_data");
var district_name = document.getElementById("district");
var goback = document.getElementById("back");
let btn_container = document.querySelector(".btn_container");
var district_header = document.getElementById("district");
var row, state_name, Confirmed, Deaths, recovered, anchor;
var json_data;

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
    Deaths = document.createElement("td");
    recovered = document.createElement("td");
    anchor = document.createElement("a");
    anchor.setAttribute("href", "#");
    anchor.setAttribute("onclick", "show_district()");
    anchor.innerText = key;
    Confirmed.innerText = data.state_wise[key].confirmed;
    Deaths.innerText = data.state_wise[key].deaths;
    recovered.innerText = data.state_wise[key].recovered;
    state_name.appendChild(anchor);
    row.appendChild(state_name);
    row.appendChild(Confirmed);
    row.appendChild(Deaths);
    row.appendChild(recovered);
    table.appendChild(row);
  }
}

function show_district() {
  var target = event.target || event.srcElement;
  name = target.innerText;
  // Disable Main Table
  if (!table.classList.contains("display_toggle")) {
    table.classList.toggle("display_toggle");
  }

  // Disable Button Container
  if (!btn_container.classList.contains("display_toggle")) {
    btn_container.classList.toggle("display_toggle");
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
    Deaths = document.createElement("td");
    recovered = document.createElement("td");
    dis_name.innerText = key;
    Confirmed.innerText = json_data.state_wise[name].district[key].confirmed;
    Deaths.innerText = json_data.state_wise[name].district[key].deceased;
    recovered.innerText = json_data.state_wise[name].district[key].recovered;
    row.appendChild(dis_name);
    row.appendChild(Confirmed);
    row.appendChild(Deaths);
    row.appendChild(recovered);
    district_table.appendChild(row);
  }
}
