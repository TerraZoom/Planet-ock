/*
 (c) 2016 John Williams
 This helper file provides basic functionality for the Length of Day Clock app 
*/

function getCookie(lat,lon) {

}


// set cookie from auto geolocation

function setCookie(lat,lon) {
	var lat_cookie = lat;
	var lon_cookie = lon;
}


	function timeBetween(sunset, sunrise) {
		var time2 = sunset;
		var time1 = sunrise;
		
		// convert to milliseconds
		var time2_ms = time2.getTime();
		var time1_ms = time1.getTime();
		
		// get diff
		var diff_ms = time2_ms - time1_ms;
		// take out ms
		diff_ms = diff_ms/1000;
		var seconds = Math.floor(diff_ms % 60);
		diff_ms = diff_ms/60;
		var minutes = Math.floor(diff_ms % 60);
		diff_ms = diff_ms/60;
		var hours = Math.floor(diff_ms % 24);
		var days = Math.floor(diff_ms/24);
		
		return hours + 'h ' + minutes + 'm ' + seconds + "s";
	}

	// get percentage of day that is sunlight
	function daylightPercent(sunset, sunrise) {
		var day_ms = 86400000;
		var time2 = sunset;
		var time1 = sunrise;
		
		// convert to milliseconds
		var time2_ms = time2.getTime();
		var time1_ms = time1.getTime();
		
		// get diff
		var diff_ms = time2_ms - time1_ms;
		var daylightPercent = (diff_ms/day_ms)*100;

		return daylightPercent;

	}
	
	// get percentage of day that is sunlight
	function dayPercent(time2, time1) {
		var day_ms = 86400000;
		var time2a = time2;
		var time1a = time1;
		
		// convert to milliseconds
		var time2a_ms = time2a.getTime();
		var time1a_ms = time1a.getTime();
		
		// get diff
		var diff_ms = time2a_ms - time1a_ms;
		var timePercent = (diff_ms/day_ms)*100;

		return timePercent;

	}	
	
	function sunriseCalc() {
		alert("sunriseCalc");
	}
	
	// get next 42 days (6 weeks)

	// get the 7 days of week selected

	function sunriseCalc2() {
		// get today
		var today = new Date();
		var today2 = moment().format("MMM Do, YYYY");
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		
		// hard code my lat/lon for testing
		var myLatitude = 40.3428; // document.getElementById("latitude").value;
		var myLongitude = -105.6836; // document.getElementById("longitude").value;
		var myOffset = document.getElementById("timezone").value;

		var infoDiv = document.getElementById('suncalc').value;
		var times = SunCalc.getTimes(today, myLatitude, myLongitude);
		/////////////////////////////////
		// morning astronomical twilight
		// morning nautical twilight
		// morning civil twilight
		
		var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
		var sunsetStr = times.sunset.getHours() + ':' + times.sunset.getMinutes();		
		
		
		var astroDawn = times["nightEnd"]; // morning astronomical twilight starts
		var nauticalDawn = times["nauticalDawn"]; // morning nautical twilight starts
		var civilDawn = times["dawn"]; // morning civil twilight starts
		var sunrise = times["sunrise"];
		var solarNoon = times["solarNoon"];
		var nadir = times["nadir"];
		var sunset = times["sunset"]; // evening civil twilight starts
		var civilDusk = times["dusk"];
		
		var astroDawnLen = timeBetween(nauticalDawn, astroDawn);
		var nauticalDawnLen = timeBetween(civilDawn, nauticalDawn);
		var civilDawnLen = timeBetween(sunrise, civilDawn);
		
		var astroDawnPercent = dayPercent(nauticalDawn, astroDawn);
		var nauticalDawnPercent = dayPercent(civilDawn, nauticalDawn);
		var civilDawnPercent = dayPercent(sunrise, civilDawn);
		
		/////////////////////////////////	
		// evening civil twilight = dusk - sunset
		// evening nautical twilight = nauticalDusk - dusk
		// evening astronomical twilight = nightBegin - astroDusk

		var nauticalDusk = times["dusk"]; // evening astronomical twilight starts
		var astroDusk = times["nauticalDusk"];
		var nightBegin = times["night"];
		var nightEnd = times["nightEnd"];
		
		var sunriseTime = moment(sunrise).format("h:mm a");
		var sunsetTime = moment(sunset).format("h:mm a");
		var goldenHourStart = moment(times["goldenHour"]).format("h:mm a"); // evening golden hour starts
		var goldenHourEnd = moment(times["goldenHourEnd"]).format("h:mm a"); // morning golden hour end

		var civilDuskLen = timeBetween(civilDusk, sunset);
		var nauticalDuskLen = timeBetween(nauticalDusk, civilDusk);
		var astroDuskLen = timeBetween(astroDusk, nauticalDusk);
		var civilDuskPercent = dayPercent(civilDusk, sunset);
		var nauticalDuskPercent = dayPercent(astroDusk, nauticalDusk);
		var astroDuskPercent = dayPercent(nightBegin, astroDusk);
		
	// show location
		var myTimezone = guessTimezone();
		
		function guessTimezone() {
			var theTimezone = moment.tz.guess();
			return theTimezone;
		}


		var timezoneDiv = document.getElementById('timezone');
			timezoneDiv.innerHTML = "";
			timezoneDiv.innerHTML = timezoneDiv.innerHTML + "My Timezone: " + myTimezone;				
		
		var lod = timeBetween(sunset, sunrise);
		var lodPercent = daylightPercent(sunset, sunrise);
		console.log(times);
		console.log("Date: " + new Date());
		console.log("Lat: " + myLatitude);
		console.log("Lon: " + myLongitude);
		console.log("Sunrise: " + sunriseTime);
		console.log("Sunset: " + sunsetTime);
		console.log("LOD: " + lod);
		console.log("goldenHour: " + goldenHourStart + " - " + goldenHourEnd);
		console.log("percent of daylight: " + lodPercent);
		
		nodeLat = document.createTextNode(myLatitude);
		nodeLon = document.createTextNode(myLongitude);
		coords = myLatitude + " | " + myLongitude; 		
		
		// show coords
		var coordsDiv = document.getElementById('coords');
			coordsDiv.innerHTML = "";
			coordsDiv.innerHTML = coordsDiv.innerHTML + coords;
			
		// show today
		var todayDiv = document.getElementById('today2');
			todayDiv.innerHTML = "";
			todayDiv.innerHTML = todayDiv.innerHTML + "Today's date: " + today2;


			var gridDay = moment(today).add(lodDay, 'd'); // moment(today + i).format("MMM Do, YYYY");
			var gridTimes = SunCalc.getTimes(gridDay, myLatitude, myLongitude);
			var gridSunrise = gridTimes["sunrise"];
			var gridSunset = gridTimes["sunset"];
			var gridLOD = timeBetween(gridSunset, gridSunrise);
			var gridLODPercent = daylightPercent(gridSunset, gridSunrise);
			var night1 = (100 - gridLODPercent)/2;
			var night2 = (100 - gridLODPercent)/2;

			
		// show today's grid
		var todayGridDiv = document.getElementById('todayGrid');
			todayGridDiv.innerHTML = "";
			todayGridDiv.innerHTML = todayGridDiv.innerHTML
				+ "	<div id = 'result'><h3>Result for today: </h3></div>"
				+	" <div class='progress' style='height:200px !important; width: 100% !important;' >"  
				+	"<div class='progress-bar progress-bar-night' role='progressbar' style='width:" + night1.toFixed(2) + "%'></div>"				
				// +   "<div class='progress-bar progress-bar-astro' role='progressbar' style='width:" + astroDawnPercent.toFixed(2) + "%'></div>"
				// +   "<div class='progress-bar progress-bar-nautical' role='progressbar' style='width:" + nauticalDawnPercent.toFixed(2) + "%'></div>"				
				+   "<div class='progress-bar progress-bar-civil' role='progressbar' style='width:" + civilDawnPercent.toFixed(2) + "%'></div>"
				+   "<div class='progress-bar progress-bar-daylight' role='progressbar' style='width:" + gridLODPercent.toFixed(2) + "%'>" + gridLOD + "</div>"
				+   "<div class='progress-bar progress-bar-civil' role='progressbar' style='width:" + civilDuskPercent.toFixed(2) + "%'></div>"				
				// +   "<div class='progress-bar progress-bar-nautical' role='progressbar' style='width:" + nauticalDuskPercent.toFixed(2) + "%'></div>"
				// + "<div class='progress-bar progress-bar-astro' role='progressbar' style='width:" + astroDuskPercent.toFixed(2) + "%'></div>"
				+	"<div class='progress-bar progress-bar-night' role='progressbar' style='width:" + night2.toFixed(2) + "%'></div>"
				+	"</div>";	
								
			
		// show sunrise
		var sunriseDiv = document.getElementById('sunrise');
			sunriseDiv.innerHTML = "";
			sunriseDiv.innerHTML = sunriseDiv.innerHTML + "Sunrise: " + moment(sunrise).format('MMMM Do YYYY h:mm a');		

		// show sunset
		var sunsetDiv = document.getElementById('sunset');
			sunsetDiv.innerHTML = "";
			sunsetDiv.innerHTML = sunsetDiv.innerHTML + "Sunset: " + moment(sunset).format('MMMM Do YYYY h:mm a');					
			
		// show length of daylight
		// var lodDiv = document.getElementById('lod');
		//	lodDiv.innerHTML = "";
		//	lodDiv.innerHTML = lodDiv.innerHTML + lod;
			
		// need ifthen to list out the next 10/30 days length of day.
		// setting up the date/sunrise/sunset grid
		
		
	
		
		// CREATING THE LOD Table Grid //////////////////////////////////
		var lodTable = document.getElementById("sunriseTable");
		var i = 0;
		while (i < 52) { // getting 6 iterations (6 weeks)
		
		var lodDay = i*7; // need this number to add to date		
		var lodRow = lodTable.insertRow(0);

		var lodDate = lodRow.insertCell(0);
		var lodSunrise = lodRow.insertCell(1);
		var lodLod = lodRow.insertCell(2);
		var lodPercent = lodRow.insertCell(3);
		var lodSunset = lodRow.insertCell(4);
		
		// Add some text to the new cells:
			var gridDay = moment(today).add(lodDay, 'd'); // moment(today + i).format("MMM Do, YYYY");
			var gridTimes = SunCalc.getTimes(gridDay, myLatitude, myLongitude);
			var gridSunrise = gridTimes["sunrise"];
			var gridSunset = gridTimes["sunset"];
			var gridLOD = timeBetween(gridSunset, gridSunrise);
			var gridLODPercent = daylightPercent(gridSunset, gridSunrise);
			var night1 = (100 - gridLODPercent)/2;
			var night2 = (100 - gridLODPercent)/2;

			//	<div class="progress">
			// 		<div class="progress-bar progress-bar-night" role="progressbar" style="width:20%">
    		// Night
  			// 		</div>
  			// 		<div class="progress-bar progress-bar-astro" role="progressbar" style="width:10%">
    		// Astro
			//		</div>
			//	</div>

				lodDate.innerHTML = moment(gridDay).format("MMM Do YYYY");
				lodSunrise.innerHTML = moment(gridSunrise).format("h:mm a");
				lodPercent.innerHTML = 
				//	"<div class='progress'>" 
				//		"<div class='progress-bar progress-bar-night' role='progressbar' style='width:" + night1.toFixed(2) + "%'>Night</div>" +
				//		"<div class='progress-bar progress-bar-daylight' role='progressbar' style='width:" + gridLODPercent.toFixed(2) + "%'>Daylight</div>" +
				//		"<div class='progress-bar progress-bar-night' role='progressbar' style='width:" + night2.toFixed(2) + "%'>Night</div>" +
				//	"</div>";
					
					" <div class='progress'>"  
				+		"<div class='progress-bar progress-bar-night' role='progressbar' style='width:" + night1.toFixed(2) + "%'></div>"
				+   	"<div class='progress-bar progress-bar-daylight' role='progressbar' style='width:" + gridLODPercent.toFixed(2) + "%'>" + gridLOD + "</div>"
				+		"<div class='progress-bar progress-bar-night' role='progressbar' style='width:" + night2.toFixed(2) + "%'></div>"
				+	"</div>";	
					
					
					
				lodSunset.innerHTML = moment(gridSunset).format("h:mm a");
		i++;
		}
	}