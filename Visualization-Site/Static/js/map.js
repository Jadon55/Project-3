map = new OSMBuildings({
    container: 'bigmap',
    position: { latitude: 52.52000, longitude: 13.37000 }, // TODO: could be user's location
    tilt: 30,
    zoom: 16,
    minZoom: 15,
    maxZoom: 20,
});

map.addMapTiles('https://tile-a.openstreetmap.fr/hot/{z}/{x}/{y}.png');

map.addGeoJSONTiles('https://{s}.data.osmbuildings.org/0.2/ph2apjye/tile/{z}/{x}/{y}.json', { fixedZoom: 15 });


map.addGeoJSON({
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        properties: {
            color: 'green',
            roofColor: 'green',
            height: 100,
            minHeight: 0
        },
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                [13.37000, 52.52000],
                [13.37010, 52.52000],
                [13.37010, 52.52010],
                [13.37000, 52.52010],
                [13.37000, 52.52000]
                ]
            ]
        }
    }]
});