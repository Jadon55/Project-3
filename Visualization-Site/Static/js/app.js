// collect data from the API
let elements = [];
d3.json("All-Presaved.json").then(data =>{
    data.forEach(element => {
        elements.push(element);
    });
    console.log(elements.length);
});





// create map
var map = L.map('map').setView([-43.529011, 172.641516], 13);

// Add Stadia Alidade Smooth Dark tile layer
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors'
}).addTo(map);




// pie graph
let p_data = [{
    labels: ["2001", "2002", "2003", "2004", "2005"],
    values: [10,20,30,40,50],
    type: 'pie'
}];

let p_layout = {
    title: `Pie Chart for {year}`
};

Plotly.newPlot('other', p_data, p_layout);
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
let b_data = [{
    y: [10,20,30,40,50],
    x: ["2001", "2002", "2003", "2004", "2005"],
    type: 'bar'
}];
let b_layout = {
    title: 'Fatalities By Year',
    xaxis: {
        title: 'Year',
        tickvals: ["2001", "2002", "2003", "2004", "2005"]
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