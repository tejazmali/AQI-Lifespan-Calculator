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
    const stateCoordinates = {
      "Andhra Pradesh": "16.5417,80.5158",
      "Arunachal Pradesh": "27.0844,93.6053",
      Assam: "26.1433,91.7898",
      Bihar: "25.5941,85.1376",
      "Chhattisgarh": "21.2514,81.6296",
      Goa: "15.4909,73.8278",
      Gujarat: "21.1667,72.8333",
      Haryana: "30.7333,76.7794",
      "Himachal Pradesh": "31.1048,77.1734",
      Jharkhand: "23.3441,85.3096",
      Karnataka: "12.9716,77.5946",
      Kerala: "8.5241,76.9366",
      "Madhya Pradesh": "23.2599,77.4126",
      Maharashtra: "19.0760,72.8777",
      Manipur: "24.8170,93.9368",
      Meghalaya: "25.5788,91.8933",
      Mizoram: "23.7271,92.7176",
      Nagaland: "25.6700,94.1100",
      Odisha: "20.2961,85.8245",
      Punjab: "31.6340,74.8723",
      Rajasthan: "26.9124,75.7873",
      Sikkim: "27.3389,88.6065",
      "Tamil Nadu": "13.0827,80.2707",
      Telangana: "17.3850,78.4867",
      Tripura: "23.8315,91.2868",
      "Uttar Pradesh": "26.8467,80.9462",
      Uttarakhand: "30.3165,78.0322",
      "West Bengal": "22.5726,88.3639",
      Delhi: "28.6139,77.2090",
      Puducherry: "11.9416,79.8083",
      "Jammu and Kashmir": "32.7333,74.8667",
      Ladakh: "34.1526,77.5771",
      Chandigarh: "30.7333,76.7794",
      "Andaman and Nicobar Islands": "11.7401,92.6586",
      "Daman and Diu": "20.1809,73.0169"
    };
    const apiKey = "144f290761e76bb34156a51a004b52e6";
    const standardAQI = 50;

    // Fetch AQI for a given state using its coordinates
    async function fetchStateAQI(state, coordinates) {
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
        return { state, aqi, timestamp: data.list[0].dt };
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

        const promises = Object.entries(stateCoordinates).map(([state, coords]) =>
          fetchStateAQI(state, coords)
        );
        const results = await Promise.all(promises);
        const validResults = results.filter((r) => r.aqi !== null).sort((a, b) => b.aqi - a.aqi);

        aqiTableElem.innerHTML = "";
        validResults.forEach((result, index) => {
          const { status, color } = getAQIStatus(result.aqi);
          const aboveStandard = (result.aqi / standardAQI).toFixed(1);
          const row = document.createElement("tr");
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
    window.addEventListener("load", loadAQIData);

   
    // Tooltip and FusionCharts Map Setup

    function showTooltip(text, x, y) {
      const tooltip = document.getElementById("custom-tooltip");
      if (tooltip) {
        tooltip.innerHTML = text;
        tooltip.style.left = x - tooltip.clientWidth / 2 + "px";
        tooltip.style.top = y - tooltip.clientHeight - 5 + "px";
        tooltip.classList.add("show");
      }
    }
    function hideTooltip() {
      const tooltip = document.getElementById("custom-tooltip");
      if (tooltip) tooltip.classList.remove("show");
    }
    document.addEventListener("mousemove", (e) => {
      const tooltip = document.getElementById("custom-tooltip");
      if (tooltip && tooltip.classList.contains("show")) {
        tooltip.style.left = e.pageX - tooltip.clientWidth / 2 + "px";
        tooltip.style.top = e.pageY - tooltip.clientHeight - 5 + "px";
      }
    });
    FusionCharts.ready(() => {
      new FusionCharts({
        type: "maps/india",
        renderAt: "indian-map",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource: {
          chart: {
            bgColor: "#121212",
            canvasBgColor: "#121212",
            borderColor: "#2f2f2f",
            entityFillColor: "#ffffff",
            entityBorderColor: "#222222",
            showToolTip: "0",
            caption: "",
            subcaption: "",
            showLegend: "0",
            showLabels: "1",
            showBorder: "1",
            showCanvasBorder: "0",
            legendBorderAlpha: "1",
            nullEntityColor: "#888888"
          },
          colorrange: {
            minvalue: "0",
            code: "#ffffff",
            gradient: "0"
          },
          data: []
        },
        events: {
          entityRollOver: (evt, data) => {
            document.getElementById(data.id)?.classList.add("custom-hover");
            showTooltip(data.label, evt.clientX, evt.clientY);
          },
          entityRollOut: (evt, data) => {
            document.getElementById(data.id)?.classList.remove("custom-hover");
            hideTooltip();
          },
          entityClick: (evt, data) => {
            const stateName = data.label;
            if (stateCoordinates[stateName]) {
              const [lat, lon] = stateCoordinates[stateName].split(",");
              window.location.href = `details.html?state=${encodeURIComponent(
                stateName
              )}&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
            } else {
              alert("Coordinates not found for " + stateName);
            }
          }
        }
      }).render();
    });
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
