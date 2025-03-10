// Remove the loader with a smooth fade out once content is ready
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
    const loader = document.getElementById('loader');
    loader.style.opacity = "0";
    setTimeout(function() {
      loader.style.display = "none";
    }, 800);
  }, 2000);

  document.getElementById("calculateBtn").addEventListener("click", function() {
    let span = this.querySelector("span");
    span.textContent = "Loading...";

    // Simulate a delay (e.g., an API call or calculation process)
    setTimeout(() => {
        span.textContent = "Calculate Impact"; // Restore the original text
    }, 10000); // Change back after 3 seconds
});

  // Get query parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const stateName = urlParams.get('state') || "Unknown State";
  const lat = urlParams.get('lat');
  const lon = urlParams.get('lon');

  document.getElementById('stateHeading').innerText = stateName;

  document.getElementById('calculateBtn').addEventListener('click', function() {
    const age = parseFloat(document.getElementById('ageInput').value);
    const yearsLived = parseFloat(document.getElementById('yearsLived').value);

    if (isNaN(age) || age < 0) {
      alert("Please enter a valid age.");
      return;
    }
    if (isNaN(yearsLived) || yearsLived < 0) {
      alert("Please enter valid years for living in the city.");
      return;
    }
    if (!lat || !lon) {
      alert("Coordinates not found!");
      return;
    }

    const apiKey = '144f290761e76bb34156a51a004b52e6';
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        const comp = data.list[0].components;
        const pm25 = comp.pm2_5;
        const pm10 = comp.pm10;
        const no2 = comp.no2;
        const so2 = comp.so2;
        const o3  = comp.o3;
        const co  = comp.co;

        // Calculate AQI for PM2.5 (simplified version)
        let aqi_pm25 = 0;
        if (pm25 <= 12.0) {
          aqi_pm25 = (50 / 12.0) * pm25;
        } else if (pm25 <= 35.4) {
          aqi_pm25 = ((100 - 51) / (35.4 - 12.1)) * (pm25 - 12.1) + 51;
        } else if (pm25 <= 55.4) {
          aqi_pm25 = ((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101;
        } else if (pm25 <= 150.4) {
          aqi_pm25 = ((200 - 151) / (150.4 - 55.5)) * (pm25 - 55.5) + 151;
        } else if (pm25 <= 250.4) {
          aqi_pm25 = ((300 - 201) / (250.4 - 150.5)) * (pm25 - 150.5) + 201;
        } else {
          aqi_pm25 = pm25;
        }

        // Calculate AQI for PM10 (simplified version)
        let aqi_pm10 = 0;
        if (pm10 <= 54) {
          aqi_pm10 = (50 / 54) * pm10;
        } else if (pm10 <= 154) {
          aqi_pm10 = ((100 - 51) / (154 - 55)) * (pm10 - 55) + 51;
        } else if (pm10 <= 254) {
          aqi_pm10 = ((150 - 101) / (254 - 155)) * (pm10 - 155) + 101;
        } else if (pm10 <= 354) {
          aqi_pm10 = ((200 - 151) / (354 - 255)) * (pm10 - 255) + 151;
        } else {
          aqi_pm10 = pm10;
        }

        // Overall AQI is the maximum of the two
        const overallAQI = Math.round(Math.max(aqi_pm25, aqi_pm10));

        // Cigarette equivalence: 1 cigarette per 22 µg/m³ of PM2.5 exposure
        let cigsPerDay = (pm25 / 22).toFixed(2);
        let cigsPerYear = Math.round(cigsPerDay * 365);

        // If overall AQI is less than 50, set cigarette counts to zero and update the animation
        if (overallAQI < 50) {
          cigsPerDay = "0.00";
          cigsPerYear = "0";
         
        }

        // New life expectancy reduction calculation:
        // ΔLE (years) = (PM2.5 - PM_ref) × (0.98 / 10) × (yearsLived / 70)
        // PM_ref is the reference concentration (here, 10 µg/m³)
        const PM_ref = 10;
        let estimatedLELoss = pm25 > PM_ref ? (pm25 - PM_ref) * (0.98 / 10) * (yearsLived / 70) : 0;
        let estimatedLELossDays = (estimatedLELoss * 365).toFixed(0);

        let aqiStatus = "Good";
        if (overallAQI > 50 && overallAQI <= 100) aqiStatus = "Moderate";
        else if (overallAQI > 100 && overallAQI <= 150) aqiStatus = "Unhealthy for Sensitive Groups";
        else if (overallAQI > 150 && overallAQI <= 200) aqiStatus = "Unhealthy";
        else if (overallAQI > 200 && overallAQI <= 300) aqiStatus = "Very Unhealthy";
        else if (overallAQI > 300) aqiStatus = "Hazardous";

        const results = {
          stateName: stateName,
          aqi: overallAQI,
          aqiStatus: aqiStatus,
          cigsPerDay: cigsPerDay,
          cigsPerYear: cigsPerYear,
          pm25: pm25,
          pm10: pm10,
          no2: no2,
          so2: so2,
          o3: o3,
          co: co,
          daysLost: estimatedLELossDays,
          yearsLost: estimatedLELoss.toFixed(2),
          rawData: data
        };

        const queryString = encodeURIComponent(JSON.stringify(results));
        window.location.href = `results.html?data=${queryString}`;
      })
      .catch(error => {
        alert("Error: " + error.message);
      });
  });
});
