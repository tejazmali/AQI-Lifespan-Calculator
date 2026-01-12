document.addEventListener("DOMContentLoaded", () => {

  /* ==========================
     GLOBALS
  ========================== */

  let currentMap = null;
const stateMapIds = {
  "Andhra Pradesh": "maps/andhrapradesh",
  "Arunachal Pradesh": "maps/arunachalpradesh",
  Assam: "maps/assam",
  Bihar: "maps/bihar",
  Chhattisgarh: "maps/chhattisgarh",
  Goa: "maps/goa",
  Gujarat: "maps/gujarat",
  Haryana: "maps/haryana",
  "Himachal Pradesh": "maps/himachalpradesh",
  Jharkhand: "maps/jharkhand",
  Karnataka: "maps/karnataka",
  Kerala: "maps/kerala",
  "Madhya Pradesh": "maps/madhyapradesh",
  Maharashtra: "maps/maharashtra",
  Manipur: "maps/manipur",
  Meghalaya: "maps/meghalaya",
  Mizoram: "maps/mizoram",
  Nagaland: "maps/nagaland",
  Odisha: "maps/odisha",
  Punjab: "maps/punjab",
  Rajasthan: "maps/rajasthan",
  Sikkim: "maps/sikkim",
  "Tamil Nadu": "maps/tamilnadu",
  Telangana: "maps/telangana",
  Tripura: "maps/tripura",
  "Uttar Pradesh": "maps/uttarpradesh",
  Uttarakhand: "maps/uttarakhand",
  "West Bengal": "maps/westbengal",

  // Union Territories
  Delhi: "maps/delhi",
  Chandigarh: "maps/chandigarh",
  Puducherry: "maps/puducherry",
  Ladakh: "maps/ladakh",
  "Jammu and Kashmir": "maps/jammuandkashmir",
  "Andaman and Nicobar Islands": "maps/andamanandnicobar",
  "Dadra and Nagar Haveli and Daman and Diu": "maps/dnhdd"
};


const stateCoordinates = {
  "Andhra Pradesh": "16.5062,80.6480",        // Vijayawada
  "Arunachal Pradesh": "27.0844,93.6053",    // Itanagar
  Assam: "26.1445,91.7362",                  // Guwahati
  Bihar: "25.5941,85.1376",                  // Patna
  Chhattisgarh: "21.2514,81.6296",            // Raipur
  Goa: "15.4909,73.8278",                     // Panaji
  Gujarat: "23.0225,72.5714",                 // Ahmedabad
  Haryana: "28.4595,77.0266",                 // Gurugram
  "Himachal Pradesh": "31.1048,77.1734",      // Shimla
  Jharkhand: "23.3441,85.3096",                // Ranchi
  Karnataka: "12.9716,77.5946",                // Bengaluru
  Kerala: "8.5241,76.9366",                    // Thiruvananthapuram
  "Madhya Pradesh": "23.2599,77.4126",        // Bhopal
  Maharashtra: "19.0760,72.8777",              // Mumbai
  Manipur: "24.8170,93.9368",                  // Imphal
  Meghalaya: "25.5788,91.8933",                // Shillong
  Mizoram: "23.7271,92.7176",                  // Aizawl
  Nagaland: "25.6700,94.1100",                 // Kohima
  Odisha: "20.2961,85.8245",                   // Bhubaneswar
  Punjab: "31.6340,74.8723",                   // Amritsar
  Rajasthan: "26.9124,75.7873",                // Jaipur
  Sikkim: "27.3389,88.6065",                   // Gangtok
  "Tamil Nadu": "13.0827,80.2707",             // Chennai
  Telangana: "17.3850,78.4867",                // Hyderabad
  Tripura: "23.8315,91.2868",                  // Agartala
  "Uttar Pradesh": "26.8467,80.9462",          // Lucknow
  Uttarakhand: "30.3165,78.0322",              // Dehradun
  "West Bengal": "22.5726,88.3639",            // Kolkata

  // Union Territories
  Delhi: "28.6139,77.2090",
  Chandigarh: "30.7333,76.7794",
  Puducherry: "11.9416,79.8083",
  Ladakh: "34.1526,77.5771",                   // Leh
  "Jammu and Kashmir": "34.0837,74.7973",      // Srinagar
  "Andaman and Nicobar Islands": "11.7401,92.6586",
  "Dadra and Nagar Haveli and Daman and Diu": "20.3974,72.8328"
};


  /* ==========================
     TOOLTIP
  ========================== */

  function showTooltip(text, x, y) {
    const tooltip = document.getElementById("custom-tooltip");
    tooltip.textContent = text;
    tooltip.style.left = x + "px";
    tooltip.style.top = y - 30 + "px";
    tooltip.classList.add("show");
  }

  function hideTooltip() {
    document.getElementById("custom-tooltip").classList.remove("show");
  }

  /* ==========================
     MAP RENDERERS
  ========================== */

  function renderIndiaMap() {
    document.getElementById("backToIndia").style.display = "none";

    if (currentMap) currentMap.dispose();

    currentMap = new FusionCharts({
      type: "maps/india",
      renderAt: "indian-map",
      width: "100%",
      height: "520",
      dataFormat: "json",
      dataSource: {
        chart: {
          bgColor: "#121212",
          entityFillColor: "#1f2937",
          entityBorderColor: "#374151",
          hoverColor: "#22c55e",
        showLabels: "0",
  showToolTip: "1",
  showHoverEffect: "1",
  useHoverColor: "1"
        },
        data: []
      },
      events: {
        entityRollOver: (e, d) => showTooltip(d.label, e.clientX, e.clientY),
        entityRollOut: hideTooltip,
        entityClick: (_, data) => {
          if (stateMapIds[data.label]) {
            renderStateMap(data.label);
          }
        }
      }
    });

    currentMap.render();
  }

  function renderStateMap(stateName) {
    document.getElementById("backToIndia").style.display = "inline-block";

    if (currentMap) currentMap.dispose();

    currentMap = new FusionCharts({
      type: stateMapIds[stateName],
      renderAt: "indian-map",
      width: "100%",
      height: "520",
      dataFormat: "json",
      dataSource: {
    chart: {
  bgColor: "#121212",
  entityFillColor: "#111827",
  entityBorderColor: "#374151",
  hoverColor: "#3b82f6",

  showToolTip: "1",
  showHoverEffect: "0",
  useHoverColor: "1",
  showLabels: "1"
}
,
        data: []
      },
      events: {
        entityRollOver: (e, d) => showTooltip(d.label, e.clientX, e.clientY),
        entityRollOut: hideTooltip,
        entityClick: (_, data) => {
          const city = data.label;
          const [lat, lon] = stateCoordinates[stateName].split(",");
          window.location.href =
            `details.html?state=${encodeURIComponent(city)}&lat=${lat}&lon=${lon}`;
        }
      }
    });

    currentMap.render();
  }

  /* ==========================
     BACK BUTTON
  ========================== */

  document.getElementById("backToIndia").addEventListener("click", renderIndiaMap);

  /* ==========================
     INIT
  ========================== */

  FusionCharts.ready(renderIndiaMap);

  /* ==========================
     LOADER
  ========================== */

  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 800);
  }, 2000);



  const aqiTableElem = document.getElementById("aqi-data");
  if (aqiTableElem) {
    const cityData = [
      { city: "Mumbai", state: "Maharashtra", coords: "19.0760,72.8777" },
      { city: "Delhi", state: "Delhi", coords: "28.6139,77.2090" },
      { city: "Bangalore", state: "Karnataka", coords: "12.9716,77.5946" },
      { city: "Hyderabad", state: "Telangana", coords: "17.3850,78.4867" },
      { city: "Ahmedabad", state: "Gujarat", coords: "23.0225,72.5714" },
      { city: "Chennai", state: "Tamil Nadu", coords: "13.0827,80.2707" },
      { city: "Kolkata", state: "West Bengal", coords: "22.5726,88.3639" },
      { city: "Surat", state: "Gujarat", coords: "21.1702,72.8311" },
      { city: "Pune", state: "Maharashtra", coords: "18.5204,73.8567" },
      { city: "Jaipur", state: "Rajasthan", coords: "26.9124,75.7873" },
      { city: "Lucknow", state: "Uttar Pradesh", coords: "26.8467,80.9462" },
      { city: "Kanpur", state: "Uttar Pradesh", coords: "26.4499,80.3319" },
      { city: "Nagpur", state: "Maharashtra", coords: "21.1458,79.0882" },
      { city: "Indore", state: "Madhya Pradesh", coords: "22.7196,75.8577" },
      { city: "Thane", state: "Maharashtra", coords: "19.2183,72.9781" },
      { city: "Bhopal", state: "Madhya Pradesh", coords: "23.2599,77.4126" },
      { city: "Visakhapatnam", state: "Andhra Pradesh", coords: "17.6868,83.2185" },
      { city: "Pimpri-Chinchwad", state: "Maharashtra", coords: "18.6298,73.7997" },
      { city: "Patna", state: "Bihar", coords: "25.5941,85.1376" },
      { city: "Vadodara", state: "Gujarat", coords: "22.3072,73.1812" },
      { city: "Ghaziabad", state: "Uttar Pradesh", coords: "28.6692,77.4538" },
      { city: "Ludhiana", state: "Punjab", coords: "30.9010,75.8573" },
      { city: "Agra", state: "Uttar Pradesh", coords: "27.1767,78.0081" },
      { city: "Nashik", state: "Maharashtra", coords: "19.9975,73.7898" },
      { city: "Faridabad", state: "Haryana", coords: "28.4089,77.3178" },
      { city: "Meerut", state: "Uttar Pradesh", coords: "28.9845,77.7064" },
      { city: "Rajkot", state: "Gujarat", coords: "22.3039,70.8022" },
      { city: "Kalyan-Dombivli", state: "Maharashtra", coords: "19.2403,73.1305" },
      { city: "Vasai-Virar", state: "Maharashtra", coords: "19.3919,72.8397" },
      { city: "Varanasi", state: "Uttar Pradesh", coords: "25.3176,82.9739" },
      { city: "Srinagar", state: "Jammu and Kashmir", coords: "34.0837,74.7973" },
      { city: "Aurangabad", state: "Maharashtra", coords: "19.8762,75.3433" },
      { city: "Dhanbad", state: "Jharkhand", coords: "23.7957,86.4304" },
      { city: "Amritsar", state: "Punjab", coords: "31.6340,74.8723" },
      { city: "Navi Mumbai", state: "Maharashtra", coords: "19.0330,73.0297" },
      { city: "Allahabad", state: "Uttar Pradesh", coords: "25.4358,81.8463" },
      { city: "Howrah", state: "West Bengal", coords: "22.5958,88.2636" },
      { city: "Ranchi", state: "Jharkhand", coords: "23.3441,85.3096" },
      { city: "Gwalior", state: "Madhya Pradesh", coords: "26.2183,78.1828" },
      { city: "Jabalpur", state: "Madhya Pradesh", coords: "23.1815,79.9864" },
      { city: "Coimbatore", state: "Tamil Nadu", coords: "11.0168,76.9558" },
      { city: "Vijayawada", state: "Andhra Pradesh", coords: "16.5062,80.6480" },
      { city: "Jodhpur", state: "Rajasthan", coords: "26.2389,73.0243" },
      { city: "Madurai", state: "Tamil Nadu", coords: "9.9252,78.1198" },
      { city: "Raipur", state: "Chhattisgarh", coords: "21.2514,81.6296" },
      { city: "Kota", state: "Rajasthan", coords: "25.2138,75.8648" },
      { city: "Guwahati", state: "Assam", coords: "26.1445,91.7362" },
      { city: "Chandigarh", state: "Chandigarh", coords: "30.7333,76.7794" },
      { city: "Solapur", state: "Maharashtra", coords: "17.6599,75.9064" },
      { city: "Hubballi-Dharwad", state: "Karnataka", coords: "15.3647,75.1240" }
    ];

    // Populate State Dropdown
    const filterStateSelect = document.getElementById("filterStateSelect");
    const stateSelect = document.getElementById("stateSelect");
    
    if (filterStateSelect && stateSelect) {
        const states = [...new Set(cityData.map(item => item.state))].sort();
        states.forEach(state => {
            const option = document.createElement("option");
            option.value = state;
            option.textContent = state;
            filterStateSelect.appendChild(option);
        });

        // Function to populate cities based on selected state
        function populateCities(selectedState) {
            stateSelect.innerHTML = '<option value="" disabled selected>Select a City</option>';
            const filteredCities = selectedState 
                ? cityData.filter(item => item.state === selectedState)
                : cityData;
            
            filteredCities.sort((a, b) => a.city.localeCompare(b.city)).forEach(item => {
                const option = document.createElement("option");
                option.value = item.city;
                option.textContent = item.city;
                stateSelect.appendChild(option);
            });
        }

        // Initial population
        populateCities("");

        // Event Listeners
        filterStateSelect.addEventListener("change", (e) => {
            const selectedState = e.target.value;
            populateCities(selectedState);
            filterAQITable(selectedState);
        });

        stateSelect.addEventListener("change", (e) => {
            const cityName = e.target.value;
            const cityInfo = cityData.find(item => item.city === cityName);
            if (cityInfo) {
                const [lat, lon] = cityInfo.coords.split(",");
                window.location.href = `details.html?state=${encodeURIComponent(cityName)}&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
            }
        });
    }
    const apiKey = "144f290761e76bb34156a51a004b52e6";
    const standardAQI = 50;

    // Fetch AQI for a given state using its coordinates
    // Fetch AQI for a given state using its coordinates
    async function fetchStateAQI(city, coordinates, state) {
      const [lat, lon] = coordinates.split(",");
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        const { pm2_5: pm25, pm10 } = data.list[0].components;
        const aqi = Math.round(
          Math.max(calculateAQI(pm25, "pm25"), calculateAQI(pm10, "pm10"))
        );
        return { state: city, aqi, timestamp: data.list[0].dt, stateName: state };
      } catch (error) {
        console.error(`Error fetching data for ${state}:`, error);
        return { state, aqi: null, error: error.message };
      }
    }

    // Load and render AQI data for all states
    async function loadAQIData() {
      try {
        document.getElementById("loading").style.display = "block";
        document.getElementById("aqi-table").style.display = "none";
        document.getElementById("error").style.display = "none";

        const promises = cityData.map(item =>
          fetchStateAQI(item.city, item.coords, item.state)
        );
        const results = await Promise.all(promises);
        const validResults = results.filter((r) => r.aqi !== null).sort((a, b) => b.aqi - a.aqi);

        aqiTableElem.innerHTML = "";
        validResults.forEach((result, index) => {
          const { status, color } = getAQIStatus(result.aqi);
          const aboveStandard = (result.aqi / standardAQI).toFixed(1);
          const row = document.createElement("tr");
          row.setAttribute("data-state", result.stateName); // Add data attribute for filtering
          row.innerHTML = `
            <td class="rank-cell">${index + 1}.</td>
            <td>${result.state}</td>
            <td class="aqi-cell">
              <div class="aqi-gauge">
                ${createGaugeSVG(result.aqi, color)}
                <div class="aqi-value">${result.aqi}</div>
              </div>
            </td>
            <td class="status-cell">
              <span class="status ${status.toLowerCase()}">${status}</span>
            </td>
            <td>
              <span class="standard-value ${status.toLowerCase()}">${aboveStandard}x</span> above Standard
            </td>`;
          aqiTableElem.appendChild(row);
        });

        document.getElementById("loading").style.display = "none";
        document.getElementById("aqi-table").style.display = "table";
        document.getElementById("last-updated").textContent =
          "Last updated: " + new Date().toLocaleString();

        const errors = results.filter((r) => r.aqi === null);
        if (errors.length) {
          const errorDiv = document.getElementById("error");
          errorDiv.textContent = `Failed to load data for ${errors.length} states. Please try again later.`;
          errorDiv.style.display = "block";
        }
      } catch (error) {
        console.error("Error loading AQI data:", error);
        document.getElementById("loading").style.display = "none";
        const errorDiv = document.getElementById("error");
        errorDiv.textContent = `Failed to load AQI data: ${error.message}`;
        errorDiv.style.display = "block";
      }
    }

    // Filter AQI Table based on selected state
    function filterAQITable(selectedState) {
        const rows = document.querySelectorAll("#aqi-data tr");
        rows.forEach(row => {
            const rowState = row.getAttribute("data-state");
            if (!selectedState || rowState === selectedState) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }
    window.addEventListener("load", loadAQIData);

   
  }
});


// Calculate AQI for PM2.5 and PM10 using breakpoint formulas
function calculateAQI(value, type) {
  if (type === "pm25") {
    if (value <= 12.0) return (50 / 12.0) * value;
    else if (value <= 35.4) return ((100 - 51) / (35.4 - 12.1)) * (value - 12.1) + 51;
    else if (value <= 55.4) return ((150 - 101) / (55.4 - 35.5)) * (value - 35.5) + 101;
    else if (value <= 150.4) return ((200 - 151) / (150.4 - 55.5)) * (value - 55.5) + 151;
    else if (value <= 250.4) return ((300 - 201) / (250.4 - 150.5)) * (value - 150.5) + 201;
    else return value;
  } else if (type === "pm10") {
    if (value <= 54) return (50 / 54) * value;
    else if (value <= 154) return ((100 - 51) / (154 - 55)) * (value - 55) + 51;
    else if (value <= 254) return ((150 - 101) / (254 - 155)) * (value - 155) + 101;
    else if (value <= 354) return ((200 - 151) / (354 - 255)) * (value - 255) + 151;
    else return value;
  }
  return value;
}

// Returns AQI status label and color based on the AQI value.
function getAQIStatus(aqi) {
  if (aqi > 300) return { status: "Hazardous", color: "#ff5252" };
  if (aqi > 200) return { status: "Severe", color: "#b967ff" };
  if (aqi > 150) return { status: "Unhealthy", color: "#ff7b7b" };
  if (aqi > 50) return { status: "Moderate", color: "#ffb74d" };
  return { status: "Good", color: "#66bb6a" };
}

// Generates an SVG gauge for visualizing the AQI value.
function createGaugeSVG(aqi, color) {
  const radius = 40;
  const strokeWidth = 8;
  const normalizedAQI = Math.min(aqi, 500) / 500;
  const angle = normalizedAQI * 180;
  const startAngle = -90;
  const endAngle = startAngle + angle;
  const endRad = (endAngle * Math.PI) / 180;
  const x = radius + radius * Math.cos(endRad);
  const y = radius + radius * Math.sin(endRad);
  const largeArcFlag = angle > 180 ? 1 : 0;
  const path = `M ${radius} ${strokeWidth / 2} A ${radius - strokeWidth / 2} ${
    radius - strokeWidth / 2
  } 0 ${largeArcFlag} 1 ${x} ${y}`;

  return `
    <svg width="80" height="40" viewBox="0 0 80 40">
      <path d="M ${radius} ${strokeWidth / 2} A ${radius - strokeWidth / 2} ${
    radius - strokeWidth / 2
  } 0 0 1 ${radius * 2 - strokeWidth / 2} ${radius}" 
            stroke="#333" stroke-width="${strokeWidth}" fill="none" />
      <path d="${path}" stroke="${color}" stroke-width="${strokeWidth}" fill="none" stroke-linecap="round" />
    </svg>
  `;
}

