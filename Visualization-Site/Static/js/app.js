// Initial load
    // Select the loading screen element
const loadingScreen = document.getElementById("loading-screen");
    // collect data from the API
let allData = [];
getData("all");
function getData(year){
    loadingScreen.style.display = "flex";
    d3.json("All-Presaved.json").then(data =>{
        data.forEach(element => {
            allData.push(element);
        });

        // filter year
        if(year != "all")
            allData = allData.filter(dict => dict["crashYear"] = year);

        
        // print done
        console.log(`${year} Data Loaded`);

        // graphs setup
        drawMap();
        refreshGraphs(allData);

        // remove loading screen
        loadingScreen.style.display = "none";
    });
};

function refreshGraphs(data){
    drawPie(data);
    drawBar();
    refreshStats(data);
};



// create map
var map = L.map('map').setView([-43.5303157954806, 172.635393560578], 15);
var markers;
function drawMap(){

    // Add Stadia Alidade Smooth Dark tile layer
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors'
    }).addTo(map);

    markers = L.markerClusterGroup();
    map.addLayer(markers);

    updateWindow();
};




// create markers
function addMarkers(item){
    let lat = parseFloat(item["latitude"]);
    let lon = parseFloat(item["longitude"]);
    // let mark = L.marker([lat, lon]).addTo(map);
    let mark = L.marker([lat, lon]);
    markers.addLayer(mark);

    // console.log(item);
    mark.bindPopup(`
        <h2>Lat: ${lat}</h2>
        <h2>Lon: ${lon}</h2>`
    );
};
function updateWindow(){
    markers.clearLayers();
    let box = map.getBounds();
    const swLat = box["_southWest"]["lat"];
    const neLat = box["_northEast"]["lat"];
    const swLng = box["_southWest"]["lng"];
    const neLng = box["_northEast"]["lng"];
    const filteredDicts = allData.filter(dict => parseFloat(dict["latitude"]) > swLat && parseFloat(dict["latitude"]) < neLat && parseFloat(dict["longitude"]) > swLng && parseFloat(dict["longitude"]) < neLng);
    // console.log(filteredDicts.length);

    // add markers
    filteredDicts.forEach(item => {
        addMarkers(item);
    });
    // refresh data
    refreshGraphs(filteredDicts);
};
map.on('zoomend', updateWindow);
map.on('moveend', updateWindow);


// pie graph
function drawPie(data){
    let holidayCounts = {};
    for (const item of data) {
        // crashes per holiday
        if (item.holiday !== "NULL" ){
            if (!holidayCounts[item.holiday]) {
                holidayCounts[item.holiday] = 1;
            } else {
                holidayCounts[item.holiday]++;
            }
        }
    }

    let p_data = [{
        labels: Object.keys(holidayCounts),
        values: Object.values(holidayCounts),
        type: 'pie'
    }];
    
    let p_layout = {
        title: `Crashes By Holiday`
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
function refreshStats(data){
    let replacementValues = [];
    // num of crashes
    replacementValues.push(data.length);
    // loop through data
    let totalFatalInjuries = 0;
    let holidayCounts = {};
    let lightCounts = {};
    let roadCharacterCounts = {};
    for (const item of data) {
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
        if (item.roadCharacter !== "Nil" ){
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
        const value = roadCharacterCounts[key];
        if(value > roadCharacter_count){
            roadCharacter = key;
            roadCharacter_count = value
        }
    }
    replacementValues.push(roadCharacter);

    d3.select("#n-crashes").text(replacementValues[0]);
    d3.select("#n-deaths").text(replacementValues[1]);
    d3.select("#holiday").text(replacementValues[2]);
    d3.select("#light").text(replacementValues[3]);
    d3.select("#roadCharacter").text(replacementValues[4]);
};


// dropdown changed
function optionChanged(id){
    if(id == "all")
        getData("all");
    else if(id == "2022")
        getData("2022");
    else if(id == "2021")
        getData("2021");
    else if(id == "2020")
        getData("2020");
    else if(id == "2019")
        getData("2019");
    else if(id == "2018")
        getData("2018");
};

// location button
function locationButton(lat, lon){
    map.setView([lat, lon], 15);
}
