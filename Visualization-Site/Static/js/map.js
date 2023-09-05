let allData = [];
d3.json("All-Presaved.json").then(data =>{
    data.forEach(element => {
        allData.push(element);
    });
    // allData = allData.filter(dict => parseInt(dict["fatalInjuries"]) > 0);
    // allData.forEach(crash => addTower([parseFloat(crash["longitude"]), parseFloat(crash["latitude"])]));
    
    updateWindow();
    // addTower([parseFloat(allData[0]["longitude"]), parseFloat(allData[0]["latitude"])]);
});


map = new OSMBuildings({
    container: 'bigmap',
    position: { latitude: -43.52983008, longitude: 172.6507091 }, // TODO: could be user's location
    tilt: 30,
    zoom: 15,
    minZoom: 15,
    maxZoom: 20,
});

map.addMapTiles('https://tile-a.openstreetmap.fr/hot/{z}/{x}/{y}.png');

map.addGeoJSONTiles('https://{s}.data.osmbuildings.org/0.2/ph2apjye/tile/{z}/{x}/{y}.json', { fixedZoom: 15 });

function addTower(crash){
    let location = [parseFloat(crash["longitude"]), parseFloat(crash["latitude"])]
    let size = .00008;
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

    map.addGeoJSON({
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            properties: {
                color: color,
                roofColor: color,
                height: 10+(30*injuries),
                // height: speed,
                minHeight: 0
            },
            geometry: {
                type: 'Polygon',
                coordinates: [points]
            }
        }]
    });
};


function updateWindow(){
    let bounds = map.getBounds();

    const swLat = bounds[3]["latitude"];
    const neLat = bounds[1]["latitude"];
    const swLng = bounds[3]["longitude"];
    const neLng = bounds[1]["longitude"];
    const filteredDicts = allData.filter(dict => parseFloat(dict["latitude"]) < swLat && parseFloat(dict["latitude"]) > neLat && parseFloat(dict["longitude"]) > swLng && parseFloat(dict["longitude"]) < neLng);

    // addTower(filteredDicts[0]);
    filteredDicts.forEach(crash => addTower(crash));
};

function onMoved(){
    console.log("moved");
    updateWindow();
}
function onZoomed(){
    console.log("zoomed");
    updateWindow();
}

var initialCenter = map.getPosition();
var initialZoom = map.getZoom();
// Check for changes in map center and zoom level using a setInterval
setInterval(function () {
    var currentCenter = map.getPosition();
    var currentZoom = map.getZoom();

    // Check if the map has moved
    if (currentCenter.latitude !== initialCenter.latitude || currentCenter.longitude !== initialCenter.longitude) {
        onMoved();
        initialCenter = currentCenter; // Update the initial center
    }

    // Check if the map has zoomed
    if (currentZoom !== initialZoom) {
        onZoomed();
        initialZoom = currentZoom; // Update the initial zoom level
    }
}, 1000); // Adjust the interval as needed