# Leaflet-Challenge

This repository contains two interactive web maps built using Leaflet.js, visualizing earthquake data from the USGS and tectonic plate boundaries. The maps are designed to provide a visual representation of earthquake activity around the world, allowing users to explore the data based on magnitude, depth, and location.

## Leaflet-Part-1: Basic Earthquake Map

This map displays earthquake data from the past 7 days, represented as circle markers on an OpenStreetMap basemap. The size and color of the markers are dynamically determined by the magnitude and depth of each earthquake, respectively.  Users can click on markers for more information about the specific earthquake.  Additionally, a legend is provided to explain the color scale used for depth.

**Key Features:**

* **Dynamic Marker Styling:** Earthquake markers are styled based on depth (color) and magnitude (size).
* **Interactive Popups:** Clicking a marker reveals information about the earthquake's magnitude, depth, and location.
* **Depth-Based Color Legend:** A legend helps interpret the meaning of the marker colors.
* **Basemap Switching:** Users can toggle between the default "Streets" basemap and a "Satellite" view.

## Leaflet-Part-2: Tectonic Plates Overlay

This map builds upon Part 1 by adding tectonic plate boundaries as an overlay. Users can toggle the visibility of the tectonic plates to see the relationship between earthquake activity and plate boundaries. The same earthquake data and marker styling from Part 1 are retained.

**Key Features:**

* **Tectonic Plate Overlay:** Displays tectonic plate boundaries as orange lines.
* **Layer Control:** Users can toggle the visibility of the "Tectonic Plates" overlay.
* **Interactive Popups:** Earthquake marker popups remain functional.
* **Basemap and Overlay Switching:** Users can switch between basemaps and control the visibility of the overlay.


## File Structure
```text
leaflet-challenge/
├── Leaflet-Part-1/
│ ├── favicon.ico
│ ├── index.html
│ ├── static/
│ │ ├── css/
│ │ │ └── style.css
│ │ └── js/
│ │   ├── config.js
│ │   └── logic.js
│ └── Part_1_logic_js_Explanation.md (Explanation of logic.js)
│ └── Part_1_logic_js_Output.txt (Console output of logic.js)
│ └── Python_Local_Http_Server_Set_Up.md (Instructions for running the server)
│ └── Images/
│   ├── 1-Logo.png
│   ├── 2-BasicMap.png
│   ├── 3-Data.png
│   ├── 4-JSON.png
│   └── 5-Advanced.png
├── Leaflet-Part-2/
│ └── ... (Similar structure to Part-1)
├── .gitignore
├── README.md
└── doc_GitBash.pdf

```

## Data Sources

* **Earthquake Data:** USGS GeoJSON Feed (all week summary) - `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson`
* **Tectonic Plate Data:**  `https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json`

## Technologies Used

* **Leaflet.js:** JavaScript library for interactive maps.
* **D3.js:** JavaScript library for data manipulation and visualization (used for fetching earthquake data).
* **HTML, CSS, and JavaScript:**  Standard web technologies.

## Deployment

This project is designed to be deployed as a static website, using GitHub Pages. 

The necessary steps have already been taken to configure the repository for deployment.  A docs folder was created on the `main` branch, the process for doing this can be found in the docs_GitBash.pdf file.   The site is configured to deploy from the docs folder in the `main` branch.

After pushing the folders containing `index.html`, `logic.js`, and `styles.css` to the docs folder on the `main` branch, GitHub Pages automatically builds and deploys the website. The deployment status can be monitored in the "Pages" section of the repository settings.

The website is accessible at: `https://AlexGerwer.github.io/leaflet-challenge/`.

## Setup and Usage

1. **Clone the repository:**  `git clone https://github.com/your-username/Leaflet-Challenge.git`
2. **Navigate to the project directory:** `cd Leaflet-Challenge`
3. **Run a local HTTP server:** (Python 3 recommended) `python3 -m http.server 8000`
4. **Open the maps in your browser:**
   * Part 1: `http://127.0.0.1:8000/Leaflet-Part-1/index.html`
   * Part 2: `http://127.0.0.1:8000/Leaflet-Part-2/index.html`


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License

This project is licensed under the MIT License.
