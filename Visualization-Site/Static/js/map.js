// data collection
let allData = [];
    // getting data from premade json file for speed
d3.json("All-Presaved.json").then(data =>{
    data.forEach(element => {
        // add element to data array
        allData.push(element);
    });

    // fill map with data
    updateWindow();
});

// creating map object
map = new OSMBuildings({
    container: 'bigmap',
    position: { latitude: -43.52983008, longitude: 172.6507091 },
    tilt: 30,
    zoom: 15,
    minZoom: 15,
    maxZoom: 20,
});
// add background to the map 
map.addMapTiles('https://tile-a.openstreetmap.fr/hot/{z}/{x}/{y}.png');
// add 3d buildings to the map
map.addGeoJSONTiles('https://{s}.data.osmbuildings.org/0.2/ph2apjye/tile/{z}/{x}/{y}.json', { fixedZoom: 15 });

// function that adds a tower for a given data point
function addTower(crash){
    // get the location of the data point
    let location = [parseFloat(crash["longitude"]), parseFloat(crash["latitude"])]
    // scale factor
    let size = .00008;
    // create a array of points, format dictated by OSMBuildings
    let points = [
        [location[0]-size, location[1]-size],
        [location[0]+size, location[1]-size],
        [location[0]+size, location[1]+size],
        [location[0]-size, location[1]+size],
        [location[0]-size, location[1]-size]
    ];

    // total injuries
    let injuries = parseInt(crash.minorInjuries) + parseInt(crash.fatalInjuries);

    // set color of the tower
    let color = "green";
    if(parseInt(crash.minorInjuries) > 0)
        color = "orange";
    if(parseInt(crash.fatalInjuries) > 0)
        color = "red";

    // speed limit
    let speed = parseInt(crash.speedLimit);

    // create tower for the data point and add it to the map
    map.addGeoJSON({
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            properties: {
                // color = severity of crash
                color: color,
                roofColor: color,
                // height = total injuries
                height: 10+(30*injuries),
                minHeight: 0
            },
            geometry: {
                type: 'Polygon',
                coordinates: [points]
            }
        }]
    });
};

// function captures what is currently viewable on the map, and add data points if needed
function updateWindow(){
    // get current bounds of the map
    let bounds = map.getBounds();

    // set variable for each corner of the map
    const swLat = bounds[3]["latitude"];
    const neLat = bounds[1]["latitude"];
    const swLng = bounds[3]["longitude"];
    const neLng = bounds[1]["longitude"];
    // finter the data dict for points in the bounds of the map
    const filteredDicts = allData.filter(dict => parseFloat(dict["latitude"]) < swLat && parseFloat(dict["latitude"]) > neLat && parseFloat(dict["longitude"]) > swLng && parseFloat(dict["longitude"]) < neLng);

    // call a function to add a tower for each data point in the bounds of the map
    filteredDicts.forEach(crash => addTower(crash));
};

// set inital center point and zoom level of the map
var initialCenter = map.getPosition();
var initialZoom = map.getZoom();

// on a timer this function checks if the map has been moved or zoomed
setInterval(function () {
    // set current map zoom and center point
    var currentCenter = map.getPosition();
    var currentZoom = map.getZoom();

    // Check if the map has moved
    if (currentCenter.latitude !== initialCenter.latitude || currentCenter.longitude !== initialCenter.longitude) {
        // call updateWindow to add data if needed
        updateWindow();
        initialCenter = currentCenter; // Update the initial center
    }

    // Check if the map has zoomed
    if (currentZoom !== initialZoom) {
        // call updateWindow to add data if needed
        updateWindow();
        initialZoom = currentZoom; // Update the initial zoom level
    }
}, 1000); // Adjust the interval as needed