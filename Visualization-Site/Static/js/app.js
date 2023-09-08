// Initial load
// Select the loading screen element
const loadingScreen = document.getElementById("loading-screen");
// collect data from the API
let allData = [];
var barData = null;
getData("all");
function getData(year) {
   // clear global data list
   allData = [];
   // add loading screen
   loadingScreen.style.display = "flex";
   // if all data needs to be collected
   if (year == "all") {
      // make call to API for all data
      d3.json(`http://127.0.0.1:5000/api/v1.0`)
         .then((data) => {
            data.forEach((element) => {
               allData.push(element);
            });
         })
         .then(() => {
            // after data loaded
            // print to console to confirm data loaded
            console.log(`${year} Data Loaded`);
            // Add data to the graphs
            drawMap();
            refreshGraphs(allData);
            pt_drawBar(year);

            // remove loading screen
            loadingScreen.style.display = "none";
         });
   }
   // if not all, then a specif year will be collected
   else {
      // make call to API for specific year
      d3.json(`http://127.0.0.1:5000/api/v1.0/${year}`)
         .then((data) => {
            data.forEach((element) => {
               allData.push(element);
            });
         })
         .then(() => {
            // after data loaded
            // print to console to confirm data loaded
            console.log(`${year} Data Loaded`);
            // Add data to the graphs
            drawMap();
            refreshGraphs(allData);
            pt_drawBar(year);
            // remove loading screen
            loadingScreen.style.display = "none";
         });
   }
}

function refreshGraphs(data) {
   drawPie(data);
   drawBar();
   refreshStats(data);
}

// create map
var map = L.map("map").setView([-43.5303157954806, 172.635393560578], 15);
var markers;
function drawMap() {
   // Add Stadia Alidade Smooth Dark tile layer
   L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors',
   }).addTo(map);

   // make markers layer and add it to the map
   // the cluster group object groups markers on that layer together, making something similar to a heat map
   markers = L.markerClusterGroup();
   map.addLayer(markers);

   // add inital data to the map
   updateWindow();
}

// create markers
function addMarkers(item) {
   // set variables for the location of the crash
   let lat = parseFloat(item["latitude"]);
   let lon = parseFloat(item["longitude"]);
   let mark = L.marker([lat, lon]);
   // add crash as a marker, add marker to the markers layer
   markers.addLayer(mark);

   // add popup for the marker
   mark.bindPopup(`
        <h3>Lat: ${lat}</h3>
        <h3>Lon: ${lon}</h3>
        <h3>Fatal Injuries: ${item["fatalInjuries"]}</h3>
        <h3>Other Injuries: ${parseInt(item["seriousInjuries"]) + parseInt(item["minorInjuries"])}</h3>
        <h3>Holiday: ${item["holiday"]}</h3>`);
}
function updateWindow() {
   // if the markers layer has points, cleat it
   if (markers.getLayers().length > 0) {
      markers.clearLayers();
   }
   // get current bounds of the map
   let box = map.getBounds();
   // set variables for each corner of the map
   const swLat = box["_southWest"]["lat"];
   const neLat = box["_northEast"]["lat"];
   const swLng = box["_southWest"]["lng"];
   const neLng = box["_northEast"]["lng"];
   // filter the data to get only points that are in the maps bounds
   const filteredDicts = allData.filter((dict) => parseFloat(dict["latitude"]) > swLat && parseFloat(dict["latitude"]) < neLat && parseFloat(dict["longitude"]) > swLng && parseFloat(dict["longitude"]) < neLng);

   // add markers for each of the points in the filtered dict
   filteredDicts.forEach((item) => {
      addMarkers(item);
   });

   // refresh the other graphs with the filtered data
   refreshGraphs(filteredDicts);
}
// action listener
// if map zoomed: call updata window
map.on("zoomend", updateWindow);
// action listener
// if map moved: call updata window
map.on("moveend", updateWindow);

// pie graph
function drawPie(data) {
   let holidayCounts = {};
   // loop through input data
   for (const item of data) {
      // if the holiday isn't null or undefined
      if (item.holiday !== null && item.holiday !== undefined) {
         // if the item is already in the dict, add to count
         if (!holidayCounts[item.holiday]) {
            holidayCounts[item.holiday] = 1;
         }
         // if the item is not in the dict, add it to the dict
         else {
            holidayCounts[item.holiday]++;
         }
      }
   }

   // data and layout for the graph
   let p_data = [
      {
         labels: Object.keys(holidayCounts),
         values: Object.values(holidayCounts),
         type: "pie",
      },
   ];
   let p_layout = {
      title: `Crashes By Holiday`,
   };
   // plot the pie graph
   Plotly.newPlot("other", p_data, p_layout);
}
// action listener
// resize the chart when the window changes size
window.addEventListener("resize", function () {
   // select the graph container
   var container = document.getElementById("other");
   // set the new sizes
   var newWidth = container.offsetWidth;
   var newHeight = container.offsetHeight;

   // resize the bar graph
   Plotly.relayout("other", {
      width: newWidth,
      height: newHeight,
   });
});

// bar graph
function drawBar() {
   // declare dicts
   let deaths = {
      2022: 0,
      2021: 0,
      2020: 0,
      2019: 0,
      2018: 0,
   };
   let crashes = {
      2022: 0,
      2021: 0,
      2020: 0,
      2019: 0,
      2018: 0,
   };
   // loop through data
   for (const item of allData) {
      // count num of deaths per year
      if (item.crashYear == "2022") {
         deaths[2022] += parseInt(item.fatalInjuries);
         crashes[2022] += 1;
      } else if (item.crashYear == "2021") {
         deaths[2021] += parseInt(item.fatalInjuries);
         crashes[2021] += 1;
      } else if (item.crashYear == "2020") {
         deaths[2020] += parseInt(item.fatalInjuries);
         crashes[2020] += 1;
      } else if (item.crashYear == "2019") {
         deaths[2019] += parseInt(item.fatalInjuries);
         crashes[2019] += 1;
      } else if (item.crashYear == "2018") {
         deaths[2018] += parseInt(item.fatalInjuries);
         crashes[2018] += 1;
      }
   }

   // data and layout for the graph
   let b_data = [
      {
         y: Object.values(crashes),
         x: Object.keys(crashes),
         type: "bar",
      },
   ];
   let b_layout = {
      title: "Crashes By Year",
      xaxis: {
         title: "Year",
         tickvals: Object.keys(deaths),
      },
      yaxis: {
         title: "Crashes",
      },
   };
   // plot bar chart
   Plotly.newPlot("bar", b_data, b_layout);

   var plotDiv = document.getElementsByClassName("main-svg");
   // add radius to the pie chart
   plotDiv[0].style.borderRadius = "15px";
   // add radius to the bar chart
   plotDiv[3].style.borderRadius = "15px";
}
// action listener
// resize the chart when the window changes size
window.addEventListener("resize", function () {
   // select the graph container
   var container = document.getElementById("bar");
   // set the new sizes
   var newWidth = container.offsetWidth;
   var newHeight = container.offsetHeight;

   // resize the bar graph
   Plotly.relayout("bar", {
      width: newWidth,
      height: newHeight,
   });
});

function pt_drawBar(year) {
   // declare dicts
   if (year == "all") {
      // re instates graph after being removed due to selecting only one year instead of all
      document.getElementById("budget").style.display = "block";
      let budget = {
         "2017_18": 0,
         "2018_19": 0,
         "2019_20": 0,
         "2020_21": 0,
         "2021_22": 0,
      };
      // loop through data
      for (const item of allData) {
         // find amount spent on new zealand public transport as a whole
         if (item.Region == "New Zealand") {
            budget["2017_18"] = parseInt(item.cost_2017_18);
            budget["2018_19"] = parseInt(item.cost_2018_19);
            budget["2019_20"] = parseInt(item.cost_2019_20);
            budget["2020_21"] = parseInt(item.cost_2020_21);
            budget["2021_22"] = parseInt(item.cost_2021_22);
         }
      }

      // data and layout for the graph
      let b_data = [
         {
            y: Object.values(budget),
            x: Object.keys(budget),
            type: "bar",
         },
      ];
      let b_layout = {
         title: "Public Transport Expense",
         xaxis: {
            title: "Financial Year",
            tickvals: Object.keys(budget),
         },
         yaxis: {
            title: "Budget",
         },
      };
      // plot bar chart
      Plotly.newPlot("budget", b_data, b_layout);

      var plotDiv = document.getElementsByClassName("main-svg");
      // add radius to the pie chart
      plotDiv[0].style.borderRadius = "15px";
      // add radius to the bar chart
      plotDiv[3].style.borderRadius = "15px";
   } else {
      //removes graph when only one year is selected
      return (document.getElementById("budget").style.display = "none");
   }
}

// action listener
// resize the chart when the window changes size
window.addEventListener("resize", function () {
   // select the graph container
   var container = document.getElementById("budget");
   // set the new sizes
   var newWidth = container.offsetWidth;
   var newHeight = container.offsetHeight;

   // resize the bar graph
   Plotly.relayout("budget", {
      width: newWidth,
      height: newHeight,
   });
});

// update stats
function refreshStats(data) {
   // list of values for the Stats section
   let replacementValues = [];

   // add num of crashes
   replacementValues.push(data.length);

   // declare variables
   let totalFatalInjuries = 0;
   let holidayCounts = {};
   let lightCounts = {};
   let roadCharacterCounts = {};

   // loop through data
   for (const item of data) {
      // collect num of deaths
      if (item.fatalInjuries !== undefined) {
         totalFatalInjuries += parseInt(item.fatalInjuries);
      }

      // collect crashes per holiday
      if (item.holiday !== null) {
         // if the item doesnt exist it adds it to the dict
         if (!holidayCounts[item.holiday]) {
            holidayCounts[item.holiday] = 1;
         }
         // if it does exist it adds to the count
         else {
            holidayCounts[item.holiday]++;
         }
      }

      // collect crashes per light
      if (item.light !== "Unknown") {
         // if the item doesnt exist it adds it to the dict
         if (!lightCounts[item.light]) {
            lightCounts[item.light] = 1;
         }
         // if it does exist it adds to the count
         else {
            lightCounts[item.light]++;
         }
      }
      // collect road Character
      if (item.roadCharacter !== "Nil") {
         // if the item doesnt exist it adds it to the dict
         if (!roadCharacterCounts[item.roadCharacter]) {
            roadCharacterCounts[item.roadCharacter] = 1;
         }
         // if it does exist it adds to the count
         else {
            roadCharacterCounts[item.roadCharacter]++;
         }
      }
   }

   // add total deaths
   replacementValues.push(totalFatalInjuries);

   // holiday
   let holiday;
   let holiday_count = 0;
   // loop through dick to find the the holiday with the most crashes
   for (const key in holidayCounts) {
      if (holidayCounts.hasOwnProperty(key)) {
         const value = holidayCounts[key];
         if (value > holiday_count) {
            holiday = key;
            holiday_count = value;
         }
      }
   }
   // if no holiday giben
   if (holiday == null) {
      holiday = "none";
   }
   // add holiday
   replacementValues.push(holiday);

   // light
   let light;
   let light_count = 0;
   // loop through dick to find the the light condidion with the most crashes
   for (const key in lightCounts) {
      if (lightCounts.hasOwnProperty(key)) {
         const value = lightCounts[key];
         if (value > holiday_count) {
            light = key;
            light_count = value;
         }
      }
   }
   // if no light condidion given
   if (light == null) {
      light = "none";
   }
   // add light
   replacementValues.push(light);

   // roadCharacter
   let roadCharacter;
   let roadCharacter_count = 0;
   // loop through dick to find the the road character with the most crashes
   for (const key in roadCharacterCounts) {
      const value = roadCharacterCounts[key];
      if (value > roadCharacter_count) {
         roadCharacter = key;
         roadCharacter_count = value;
      }
   }
   // if no road condidion given
   if (roadCharacter == null) {
      roadCharacter = "none";
   }
   // add road character
   replacementValues.push(roadCharacter);

   // add the data to the Stats table
   d3.select("#n-crashes").text(replacementValues[0]);
   d3.select("#n-deaths").text(replacementValues[1]);
   d3.select("#holiday").text(replacementValues[2]);
   d3.select("#light").text(replacementValues[3]);
   d3.select("#roadCharacter").text(replacementValues[4]);
}

// dropdown changed
function optionChanged(id) {
   // change the year of the data to be preseneted
   if (id == "all") getData("all");
   else if (id == "2022") getData("2022");
   else if (id == "2021") getData("2021");
   else if (id == "2020") getData("2020");
   else if (id == "2019") getData("2019");
   else if (id == "2018") getData("2018");
}

// location button
function locationButton(lat, lon, zoom) {
   // move to the position of the pressed button
   map.setView([lat, lon], zoom);
}
