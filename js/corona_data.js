var dashboard = document.getElementById('dash');
var confirmed = document.getElementById("Confirmed");
var deaths = document.getElementById("deaths");
var recovered = document.getElementById("Recovered");
var active = document.getElementById("active");
var time = document.getElementById("date");
var  image = document.getElementsByClassName("image");
var date = new Date();
var input = document.getElementById('input');
var input_name = document.getElementById('countryname');
time.innerHTML = "Date : "+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
var name = "", temp1 = "", temp2 = "";
var temp3;
var final_name = [];
//Converts name in required format
function getname() {

	if (countryname == null) {

		return "";
	}

	name = countryname.value;
	//check for white spaces
	// console.log(/\s/g.test(name));
	if (/\s/g.test(name)) {

		temp3 = name.split(/\s+/);
		name = "";
		// console.log(temp3);
		for (var i = 0; i < temp3.length; i++) {
			temp1 = temp3[i].slice(0, 1);
			temp2 = temp3[i].slice(1, temp3[i].length);
			final_name[i] = temp1.toUpperCase() + temp2.toLowerCase();
			name = name + final_name[i] + " ";
		}


		// console.log(name);
		return name;
	}


	temp1 = name.slice(0, 1);
	temp2 = name.slice(1, countryname.value.length);

	name = temp1.toUpperCase() + temp2.toLowerCase();

	return name;
}

// Total Worldwide cases
function getTotals(){
    // console.log("setting icons");
    // Setting loading  icons 
    for(i=0;i<image.length;i++){
        image[i].classList.toggle('display_toggle');
    }
    var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://coronavirus-map.p.rapidapi.com/v1/summary/latest",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
			"x-rapidapi-key": "c31eb42d89msh1d8880fda342e90p1a87e2jsncf22d0ecf439"
		}
	}

	$.ajax(settings).done(function (response) {
        // console.log(response);
        
        // Removing Loading icons
        for(i=0;i<image.length;i++){
            image[i].classList.toggle('display_toggle');
        }
        confirmed.classList.toggle('display_toggle');
        deaths.classList.toggle('display_toggle');
        recovered.classList.toggle('display_toggle');
        active.classList.toggle('display_toggle');
		confirmed.innerHTML = response.data.summary['total_cases'];
		deaths.innerHTML = response.data.summary['deaths'];
        recovered.innerHTML = response.data.summary['recovered'];
        active.innerHTML = response.data.summary['active_cases'];
		//updatePieChart(Number(pie_total = response.data.summary['total_cases']), Number(pie_death = response.data.summary['deaths']), Number(pie_recovered = response.data.summary['recovered']));
		//getTotalsSummary();
	});
}

function recieve_input() {

	if (input_name.value == "") {

		return null;
	}

	name = input_name.value;
	//check for white spaces
	// console.log(/\s/g.test(name));
	if (/\s/g.test(name)) {

		temp3 = name.split(/\s+/);
		name = "";
		// console.log(temp3);
		for (var i = 0; i < temp3.length; i++) {
			temp1 = temp3[i].slice(0, 1);
			temp2 = temp3[i].slice(1, temp3[i].length);
			final_name[i] = temp1.toUpperCase() + temp2.toLowerCase();
			name = name + final_name[i] + " ";
		}


		// console.log(name);
		return name;

	}
	temp1 = name.slice(0, 1);
	temp2 = name.slice(1, countryname.value.length);

	name = temp1.toUpperCase() + temp2.toLowerCase();

	return name;
}
// Get Country Data
function getData(){
	// If dashboard is enabled then disable it
	if(!dashboard.classList.toggle('display_toggle')){
		dashboard.classList.toggle('display_toggle');
	}
	
	//If input field is disabled then enable it
	if(input.classList.toggle('display_toggle')){
		// console.log(input.classList.toggle('display_toogle'));
		input.classList.toggle('display_toggle');	
	}

	// recieve input
	input1 = recieve_input();
	// console.log(input1);
	// if(input1==null){
	// 	alert("Enter a name");
	// }
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://coronavirus-map.p.rapidapi.com/v1/summary/region?region=" + getname() + "",
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
				"x-rapidapi-key": "c31eb42d89msh1d8880fda342e90p1a87e2jsncf22d0ecf439"
			}
		}
	
		$.ajax(settings).done(function (response) {
			console.log(response);
			//check for Incorrect Country
	
			if (!response) {
				console.log('No data');
	
			}
	
			else {
				input_name.value = "";
				input.classList.toggle('display_toggle');
				dashboard.classList.toggle('display_toggle');
				
				confirmed.innerHTML = response.data.summary['total_cases'];
				deaths.innerHTML = response.data.summary['deaths'];
				recovered.innerHTML = response.data.summary['recovered'];
				active.innerHTML = response.data.summary['active_cases'];
			}
		});

}
