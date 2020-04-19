var dashboard = document.getElementById('dash');
var confirmed = document.getElementById("Confirmed");
var deaths = document.getElementById("deaths");
var recovered = document.getElementById("Recovered");
var active = document.getElementById("active");
var time = document.getElementById("date");
var  image = document.getElementsByClassName("image");
var loading_icon = document.getElementById('loading_icon');
var chart1 = document.getElementById('chart1');
var chart2 = document.getElementById('chart2');
var chart3 = document.getElementById('chart3');
var chart_exit = document.getElementById('goback')
var date = new Date();
var input = document.getElementById('input');
var input_name = document.getElementById('countryname');
time.innerHTML = "Date : "+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
var name = "", temp1 = "", temp2 = "";
var temp3, countryname = "";
var final_name = [];
var line_chart_data = [];

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
		getTotalsSummary();


	});
}

function getTotalsSummary(){
	line_chart_data = [];
	var i=0;
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://coronavirus-map.p.rapidapi.com/v1/spots/summary",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
			"x-rapidapi-key": "c31eb42d89msh1d8880fda342e90p1a87e2jsncf22d0ecf439"
		}
	}
	
	$.ajax(settings).done(function (response) {
		// console.log(response);
		for (let key in response.data){
		  
			line_chart_data[i] = response.data[key];
            i++;
		}
		line_chart_data = line_chart_data.reverse();
		// console.log(line_chart_data);
		updateLineChart(line_chart_data);
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
	temp2 = name.slice(1, input_name.value.length);

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
			"url": "https://coronavirus-map.p.rapidapi.com/v1/summary/region?region=" +input1+ "",
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
				getweekly(input1);
				input_name.value = "";
				// disable input field
				input.classList.toggle('display_toggle');

				// enable dashboard
                dashboard.classList.toggle('display_toggle');

				
				confirmed.innerHTML = response.data.summary['total_cases'];
				deaths.innerHTML = response.data.summary['deaths'];
				recovered.innerHTML = response.data.summary['recovered'];
				active.innerHTML = response.data.summary['active_cases'];
			}
		});

}


function getweekly(countryname){
	line_chart_data = [];
	var i=0;
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://coronavirus-map.p.rapidapi.com/v1/spots/week?region="+countryname+"",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
			"x-rapidapi-key": "c31eb42d89msh1d8880fda342e90p1a87e2jsncf22d0ecf439"
		}
	}
	
	$.ajax(settings).done(function (response) {
		// console.log(response);
		for (let key in response.data){
		  
			line_chart_data[i] = response.data[key];
            i++;
		}	
		line_chart_data = line_chart_data.reverse();
		// console.log(line_chart_data);
		updateLineChart(line_chart_data);	
	});
}


function updateLineChart(data1){
	
    var conf=[], dth=[], rec=[];
	for(i=0;i<data1.length;i++){
		conf.push(data1[i].total_cases);
		dth.push(data1[i].deaths);
		rec.push(data1[i].recovered);
	}
	// console.log(conf);
	// console.log(dth);
	// console.log(rec);
	// Confirmed Cases
	Highcharts.chart('container1', {
		
		// chart: {
		// 	backgroundColor: light yellow
	    // },
		title: {
			text: 'Confirmed Cases'
		},
	
		yAxis: {
			title: {
				text: 'Total Cases'
			}
		},
	
		xAxis: {
			title : {
				text: 'Days'
			},
			accessibility: {
				rangeDescription: 'Range: 0 to 7'
			}
		},
	
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle'
		},
	
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				},
				pointStart: 1
			}
		},
	
		series: [{
			name: 'Confirmed cases',
			data: conf
		}],
	
		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom'
					}
				}
			}]
		}
	
	});

	// Deaths
	Highcharts.chart('container2', {

		title: {
			text: 'Deaths'
		},
	
		yAxis: {
			title: {
				text: 'Total Deaths'
			}
		},
	
		xAxis: {
			title : {
				text: 'Days'
			},
			accessibility: {
				rangeDescription: 'Range: 0 to 7'
			}
		},
	
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle'
		},
	
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				},
				pointStart: 1
			}
		},
	
		series: [
		{
			name: 'Deaths',
			data: dth
		}
],
	
		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom'
					}
				}
			}]
		}
	
	});
// Recovered
	Highcharts.chart('container3', {

		title: {
			text: 'Recovered'
		},
	
		yAxis: {
			title: {
				text: 'Total Recovered'
			}
		},
	
		xAxis: {
			title : {
				text: 'Days'
			},
			accessibility: {
				rangeDescription: 'Range: 0 to 7'
			}
		},
	
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle'
		},
	
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				},
				pointStart: 1
			}
		},
	
		series: [
		{
			name: 'Recovered',
			data: rec
		}],
	
		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom'
					}
				}
			}]
		}
	
	});
}

function chart_enable_disable(){
	if(!input_name.classList.toggle('display_toggle')){
		console.log("Disabling");
		input_name.classList.toggle('display_toggle');
	}
	if(!dashboard.classList.toggle('display_toggle')){
		console.log("Disabling");
		dashboard.classList.toggle('display_toggle');
	}

	chart1.classList.toggle('display_toggle');
	chart2.classList.toggle('display_toggle');
	chart3.classList.toggle('display_toggle');
	chart_exit.classList.toggle('display_toggle');

	// getweekly();
}