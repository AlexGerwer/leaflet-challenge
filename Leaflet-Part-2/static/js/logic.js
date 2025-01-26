// Import the API key from config.js
import { API_KEY } from './config.js';

// Create the 'basemap' tile layer that will be the background of our map.
let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the map object with center and zoom options.
let map = L.map('map', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Then add the 'basemap' tile layer to the map.
// --This has already been done above with layers: [streets] in map initialization

// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};
// Add a control to the map that will allow the user to change which layers are visible.
// -- Pass our map layers into our layers control and add the layers control to the map.
// -- This incorporates the layer control
// -- fulfilling "Add a control to the map that will allow..."
L.control.layers(baseMaps).addTo(map);

// Make a request that retrieves the earthquake geoJSON data.
// -- fulfilling "Make a request that retrieves..."
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

    // This function returns the style data for each of the earthquakes we plot on
    // the map. Pass the magnitude and depth of the earthquake into two separate functions
    // to calculate the color and radius.
    // -- fulfilling "This function returns the style data..."
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.geometry.coordinates[2]),  // use depth for color
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

    // This function determines the color of the marker based on the depth of the earthquake.
    function getColor(depth) {
        if (depth > 90) { return "#ea2c2c"; } // Red-Orange
        else if (depth > 70) { return "#ea822c"; } // Light Orange 
        else if (depth > 50) { return "#ee9c00"; } // Orange-Yellow
        else if (depth > 30) { return "#eecc00"; } // Yellow 
        else if (depth > 10) { return "#d4ee00"; } // Yellow-Green 
        else { return "#98ee00"; }  // Bright Green 
    }

    // This function determines the radius of the earthquake marker based on its magnitude.
    // -- fulfilling "This function determines..."
    //function getRadius(magnitude) {
    //    return magnitude * 5; // Adjust scaling factor as needed
    //}

    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

    // Add a GeoJSON layer to the map once the file is loaded.
    // -- fulfilling "Add a GeoJSON layer..."
    L.geoJson(data, {
        // Turn each feature into a circleMarker on the map.
        // -- fulfilling "Turn each feature..."
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        // Set the style for each circleMarker using our styleInfo function.
        // -- fulfilling "Set the style..."
        style: styleInfo,
        // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
        // -- fulfilling "Create a popup..."
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2] + "<br>Location: " + feature.properties.place);
        }
        // Add data directly to map in this version per comments
    }).addTo(map);

    // Create a legend control object.
    // --outside of d3.json block
    let legend = L.control({
        position: 'bottomright'
    });

    // Then add all the details for the legend
    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "info legend");
        // Initialize depth intervals and colors for the legend
        div.style.backgroundColor = "white";
        const depths = [-10, 10, 30, 50, 70, 90]; // Depth intervals
        const colors = [                          // Corresponding colors
            "#98ee00",  // Bright Green 
            "#d4ee00",  // Yellow-Green 
            "#eecc00",  // Yellow       
            "#ee9c00",  // Orange-Yellow
            "#ea822c",  // Light Orange 
            "#ea2c2c"   // Red-Orange    
        ];

        // Loop through our depth intervals to generate a label with a colored square for each interval.
        for (var i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '; width: 20px; height: 12px; display: inline-block; border:0px"></i> ' +
                depths[i] + (depths[i + 1] ? ' - ' + depths[i + 1] + '<br>' : '+');
        }
        return div;

    };

    // Finally, add the legend to the map.
    legend.addTo(map);

    // OPTIONAL: Step 2
    // Create a style for the lines.
    let myStyle = {
        color: "#ff7800", // Orange color for the lines
        weight: 2         // Line thickness
    };

    // Define tectonicPlates layer group *OUTSIDE* the d3.json callback
    let tectonicPlates = new L.LayerGroup();

    // Make a request to get our Tectonic Plate geoJSON data.
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
        // Adding our geoJSON data, along with style information, to the tectonicplates
        // layer.
        L.geoJson(plate_data, {
            style: myStyle
  //      }).addTo(map);
        }).addTo(tectonicPlates);

        // Overlay Maps for each group
        let overlayMaps = {
            "Tectonic Plates": tectonicPlates
        };

      // Then add the tectonic_plates layer to the map.
      L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
    });
}); //end of d3.json call
