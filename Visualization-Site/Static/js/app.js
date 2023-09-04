// Initial load
    // Select the loading screen element
const loadingScreen = document.getElementById("loading-screen");
    // collect data from the API
let allData = [];
d3.json("All-Presaved.json").then(data =>{
    data.forEach(element => {
        allData.push(element);
    });

    // print done
    console.log("Data Loaded");

    // graphs setup
    refreshGraphs();

    // remove loading screen
    loadingScreen.style.display = "none";
});

function refreshGraphs(){
    drawMap();
    drawPie();
    drawBar();
    refreshStats();
};



// create map
var map;
var markers;
function drawMap(){
    map = L.map('map').setView([-43.529011, 172.641516], 10);

    // Add Stadia Alidade Smooth Dark tile layer
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors'
    }).addTo(map);

    markers = new L.MarkerClusterGroup();
    map.addLayer(markers);


    allData.forEach(item => {
        addMarker([parseInt(item["latitude"]), parseInt(item["longitude"])], "red");
    });
};



// create markers
function addMarker(location){
    var point = L.marker(location);

    // add popup for the earthquake
    // circle.bindPopup(`
    //     <h2>Mag: ${size}</h2>
    //     <h2>Depth: ${depth}</h2>
    //     <h2>Location: ${location}</h2>`
    // );
};


// pie graph
function drawPie(){
    let p_data = [{
        labels: ["2001", "2002", "2003", "2004", "2005"],
        values: [10,20,30,40,50],
        type: 'pie'
    }];
    
    let p_layout = {
        title: `Pie Chart for {year}`
    };
    
    Plotly.newPlot('other', p_data, p_layout);
};
    // resize the chart when the window changes size
window.addEventListener('resize', function() {
    var container = document.getElementById('other'); // Replace with your chart's container ID
    var newWidth = container.offsetWidth;
    var newHeight = container.offsetHeight;
    
    Plotly.relayout('other', {
        width: newWidth,
        height: newHeight
    });
});



// bar graph
function drawBar(){
    let deaths = {
        2022: 0,
        2021: 0,
        2020: 0,
        2019: 0,
        2018: 0
    };
    for (const item of allData) {
        // num of deaths
        if(item.crashYear == "2022")
            deaths[2022] += parseInt(item.fatalInjuries);
        else if(item.crashYear == "2021")
            deaths[2021] += parseInt(item.fatalInjuries);
        else if(item.crashYear == "2020")
            deaths[2020] += parseInt(item.fatalInjuries);
        else if(item.crashYear == "2019")
            deaths[2019] += parseInt(item.fatalInjuries);
        else if(item.crashYear == "2018")
            deaths[2018] += parseInt(item.fatalInjuries);
    };
    console.log(Object.values(deaths));

    let b_data = [{
        y: Object.values(deaths),
        x: Object.keys(deaths),
        type: 'bar'
    }];
    let b_layout = {
        title: 'Fatalities By Year',
        xaxis: {
            title: 'Year',
            tickvals: Object.keys(deaths)
        },
        yaxis: {
            title: 'Fatalities'
        }
    };
    Plotly.newPlot("bar", b_data, b_layout);
        // round the edges of the chart
    var plotDiv = document.getElementsByClassName('main-svg')
    plotDiv[0].style.borderRadius = "15px";
    plotDiv[3].style.borderRadius = "15px";
};
    // resize the chart when the window changes size
window.addEventListener('resize', function() {
    var container = document.getElementById('bar'); // Replace with your chart's container ID
    var newWidth = container.offsetWidth;
    var newHeight = container.offsetHeight;
    
    Plotly.relayout('bar', {
        width: newWidth,
        height: newHeight
    });
});



// update stats
function refreshStats(){
    let replacementValues = [];
    // num of crashes
    replacementValues.push(allData.length);
    // loop through data
    let totalFatalInjuries = 0;
    let holidayCounts = {};
    let lightCounts = {};
    let roadCharacterCounts = {};
    for (const item of allData) {
        // num of deaths
        if (item.fatalInjuries !== undefined) {
            totalFatalInjuries += parseInt(item.fatalInjuries);
        }

        // crashes per holiday
        if (item.holiday !== "NULL" ){
            if (!holidayCounts[item.holiday]) {
                holidayCounts[item.holiday] = 1;
            } else {
                holidayCounts[item.holiday]++;
            }
        }

        // crashes per light
        if (item.light !== "Unknown" ){
            if (!lightCounts[item.light]) {
                lightCounts[item.light] = 1;
            } else {
                lightCounts[item.light]++;
            }
        }
        // roadCharacterCounts
        if (item.roadCharacter !== "NULL" ){
            if (!roadCharacterCounts[item.roadCharacter]) {
                roadCharacterCounts[item.roadCharacter] = 1;
            } else {
                roadCharacterCounts[item.roadCharacter]++;
            }
        }
    }
        // total deaths
    replacementValues.push(totalFatalInjuries);
        // holiday
    let holiday;
    let holiday_count = 0;
    for (const key in holidayCounts) {
        if (holidayCounts.hasOwnProperty(key)) {
            const value = holidayCounts[key];
            if(value > holiday_count){
                holiday = key;
                holiday_count = value
            }
        }
    
    }
    replacementValues.push(holiday);
        // light
    let light;
    let light_count = 0;
    for (const key in lightCounts) {
        if (lightCounts.hasOwnProperty(key)) {
            const value = lightCounts[key];
            if(value > holiday_count){
                light = key;
                light_count = value
            }
        }
    
    }
    replacementValues.push(light);
        // roadCharacter
    let roadCharacter;
    let roadCharacter_count = 0;
    for (const key in roadCharacterCounts) {
        if (roadCharacterCounts.hasOwnProperty(key)) {
            const value = roadCharacterCounts[key];
            if(value > holiday_count){
                roadCharacter = key;
                roadCharacter_count = value
            }
        }
    
    }
    replacementValues.push(roadCharacter);

    d3.select("#n-crashes").text(replacementValues[0]);
    d3.select("#n-deaths").text(replacementValues[1]);
    d3.select("#holiday").text(replacementValues[2]);
    d3.select("#light").text(replacementValues[3]);
    d3.select("#roadCharacter").text(replacementValues[4]);
};
