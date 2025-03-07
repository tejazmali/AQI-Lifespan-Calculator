document.addEventListener("DOMContentLoaded", function() {
    // Remove the loader with a smooth fade out
    setTimeout(function() {
      const loader = document.getElementById('loader');
      loader.style.opacity = "0";
      // Wait for the transition to complete before removing from layout
      setTimeout(function() {
        loader.style.display = 'none';
      }, 800); // Match the CSS transition duration
    }, 2000);

    // Animate elements
    const animatedElements = document.querySelectorAll('.animate');
    animatedElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
      el.style.opacity = 1;
    });

    // Parse JSON from query parameter "data"
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');

    if (!dataParam) {
      document.body.innerHTML = "<h1 style='color:red;text-align:center;'>No data found in query string!</h1>";
      return;
    }

    // Decode and parse the data parameter
    const results = JSON.parse(decodeURIComponent(dataParam));
    document.getElementById('stateHeading').innerText = `Air Quality in ${results.stateName}`;

    // Set AQI and update the UI
    const aqiValueEl = document.getElementById('aqiValue');
    const aqiStatusEl = document.getElementById('aqiStatus');
    const aqiCircleEl = document.getElementById('aqiCircle');

    aqiValueEl.textContent = results.aqi;
    const aqi = results.aqi; // Define AQI here

    let colorCode = '';
    let statusText = '';
    if (aqi <= 50) {
      statusText = 'Good';
      colorCode = '#2ecc71';
    } else if (aqi <= 100) {
      statusText = 'Moderate';
      colorCode = '#f1c40f';
    } else if (aqi <= 150) {
      statusText = 'Poor';
      colorCode = '#e67e22';
    } else if (aqi <= 200) {
      statusText = 'Unhealthy';
      colorCode = '#e74c3c';
    } else if (aqi <= 300) {
      statusText = 'Severe';
      colorCode = '#9b59b6';
    } else {
      statusText = 'Hazardous';
      colorCode = '#7f1d1d';
    }
    aqiStatusEl.textContent = statusText;
    aqiCircleEl.style.backgroundColor = colorCode;

    // Update health impact image dynamically based on AQI
    const healthImgEl = document.getElementById('healthImg');
    if (aqi <= 50) {
      healthImgEl.src = "https://www.aqi.in/media/sensor-ranges/aqi-good-level.svg";
    } else if (aqi <= 100) {
      healthImgEl.src = "https://www.aqi.in/media/sensor-ranges/aqi-moderate-level.svg";
    } else if (aqi <= 150) {
      healthImgEl.src = "https://www.aqi.in/media/sensor-ranges/aqi-poor-level.svg";
    } else if (aqi <= 200) {
      healthImgEl.src = "https://www.aqi.in/media/sensor-ranges/aqi-unhealthy-level.svg";
    } else if (aqi <= 300) {
      healthImgEl.src = "https://www.aqi.in/media/sensor-ranges/aqi-severe-level.svg";
    } else {
      healthImgEl.src = "https://www.aqi.in/media/sensor-ranges/aqi-hazardous-level.svg";
    }

    // Update cigarette equivalent values
    document.getElementById('cigsPerDay').innerText = results.cigsPerDay;
    document.getElementById('cigsPerYear').innerText = results.cigsPerYear;

    // Update health impact numbers
    document.getElementById('daysLost').innerText = results.daysLost;
    document.getElementById('yearsLost').innerText = results.yearsLost;

    // Update detailed pollutant values
    document.getElementById('pm25Val').innerText = results.pm25.toFixed(2) + " µg/m³";
    document.getElementById('pm10Val').innerText = results.pm10.toFixed(2) + " µg/m³";
    document.getElementById('no2Val').innerText  = results.no2.toFixed(2)  + " µg/m³";
    document.getElementById('so2Val').innerText  = results.so2.toFixed(2)  + " µg/m³";
    document.getElementById('o3Val').innerText   = results.o3.toFixed(2)   + " µg/m³";
    document.getElementById('coVal').innerText   = results.co.toFixed(2)   + " µg/m³";

    // Create the bar chart for pollutant levels
    const ctx = document.getElementById('pollutantChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['PM2.5', 'PM10', 'NO2', 'SO2', 'O3', 'CO'],
        datasets: [{
          label: 'µg/m³',
          data: [
            results.pm25,
            results.pm10,
            results.no2,
            results.so2,
            results.o3,
            results.co
          ],
          backgroundColor: [
            '#f44336',
            '#ff9800',
            '#ffeb3b',
            '#2196f3',
            '#4caf50',
            '#9c27b0'
          ]
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#ccc' }
          },
          x: {
            ticks: { color: '#ccc' }
          }
        },
        plugins: {
          legend: {
            labels: { color: '#ccc' }
          }
        }
      }
    });
  });