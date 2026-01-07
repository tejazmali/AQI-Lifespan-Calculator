document.addEventListener("DOMContentLoaded", () => {

  // Loader fade-out
  
  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(() => (loader.style.display = "none"), 800);
  }, 2000);


  // Details Page: AQI Calculation

  const calcBtn = document.getElementById("calculateBtn");
  if (calcBtn) {
    const params = new URLSearchParams(window.location.search);
    const stateName = params.get("state") || "Unknown State";
    const lat = params.get("lat");
    const lon = params.get("lon");
    document.getElementById("stateHeading").innerText = stateName;

    calcBtn.addEventListener("click", () => {
      const age = parseFloat(document.getElementById("ageInput").value);
      const yearsLived = parseFloat(document.getElementById("yearsLived").value);

      if (isNaN(age) || age < 0 || isNaN(yearsLived) || yearsLived < 0) {
        return alert("Please enter valid age and years lived.");
      }
      if (!lat || !lon) return alert("Coordinates not found!");

      const apiKey = "144f290761e76bb34156a51a004b52e6";
      const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error("Network response not ok");
          return response.json();
        })
        .then((data) => {
          const comp = data.list[0].components;
          const pm25 = comp.pm2_5;
          const pm10 = comp.pm10;

          // Calculate AQI for both PM2.5 and PM10 using helper function
          const aqi_pm25 = calculateAQI(pm25, "pm25");
          const aqi_pm10 = calculateAQI(pm10, "pm10");

          const overallAQI = Math.round(Math.max(aqi_pm25, aqi_pm10));

          // Additional values (if needed) can be added to results
          const results = {
            stateName,
            aqi: overallAQI,
            pm25,
            pm10,
            rawData: data
          };

          window.location.href =
            "results.html?data=" + encodeURIComponent(JSON.stringify(results));
        })
        .catch((error) => alert("Error: " + error.message));
    });
  }
  // Dashboard Page: AQI Data & Map

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
              ${createAQIVisual(result.aqi, color, status)}
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

// Creates a semi-circular gauge with color-coded AQI visualization
function createAQIVisual(aqi, color, status) {
  // Determine color based on AQI ranges
  let gaugeColor;
  if (aqi < 50) {
    gaugeColor = '#4ade80'; // Bright green
  } else if (aqi < 100) {
    gaugeColor = '#22c55e'; // Dark green
  } else if (aqi < 150) {
    gaugeColor = '#fbbf24'; // Yellow
  } else {
    gaugeColor = '#ef4444'; // Red
  }
  
  const radius = 30;
  const strokeWidth = 6;
  const normalizedAQI = Math.min(aqi, 500) / 500;
  const angle = normalizedAQI * 180; // Semi-circle (180 degrees)
  
  // Center positioned so arc forms U-shape at bottom
  const centerX = 40;
  const centerY = 10;
  
  // Start from bottom-left (180°) and sweep clockwise to fill the arc
  // In SVG, angles: 180° = left, 90° = top, 0° = right
  const startAngle = 180; // Bottom-left
  const endAngle = 0; // Bottom-right
  
  // Calculate the actual end angle based on AQI percentage
  const currentEndAngle = startAngle - angle; // Sweep from 180° towards 0°
  
  // Convert to radians
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (currentEndAngle * Math.PI) / 180;
  
  // Calculate start and end points
  const x1 = centerX + radius * Math.cos(startRad);
  const y1 = centerY - radius * Math.sin(startRad);
  
  const x2 = centerX + radius * Math.cos(endRad);
  const y2 = centerY - radius * Math.sin(endRad);
  
  // Background arc end point (full semi-circle)
  const bgEndRad = (endAngle * Math.PI) / 180;
  const bgX2 = centerX + radius * Math.cos(bgEndRad);
  const bgY2 = centerY - radius * Math.sin(bgEndRad);
  
  const largeArcFlag = angle > 180 ? 1 : 0;
  
  // Create the arc paths
  const arcPath = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  const backgroundPath = `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${bgX2} ${bgY2}`;
  
  return `
    <div class="aqi-visual">
      <svg width="80" height="50" viewBox="0 0 70 40" style="overflow: visible;">
        <!-- Background arc (gray) -->
        <path 
          d="${backgroundPath}" 
          stroke="rgba(71, 85, 105, 0.2)" 
          stroke-width="${strokeWidth}" 
          fill="none" 
          stroke-linecap="round" />
        
        <!-- Colored progress arc -->
        <path 
          d="${arcPath}" 
          stroke="${gaugeColor}" 
          stroke-width="${strokeWidth}" 
          fill="none" 
          stroke-linecap="round"
          style="
            filter: drop-shadow(0 0 6px ${gaugeColor}80);
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            animation: drawGauge 1s ease-out forwards;
          " />
      </svg>
      
      <div class="aqi-number" style="color: ${gaugeColor};">
        ${aqi}
      </div>
      
      <style>
        @keyframes drawGauge {
          to {
            stroke-dashoffset: 0;
          }
        }
      </style>
    </div>
  `;
}
