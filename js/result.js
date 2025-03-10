document.addEventListener('DOMContentLoaded', function() {

  const tabButtons = document.querySelectorAll('.health-risk-card .tab-btn');
  const infoTitle = document.querySelector('.health-risk-card .info-panel h2');
  const riskDescription = document.querySelector('.health-risk-card .risk-description');
  const symptomsDescription = document.querySelector('.health-risk-card .symptoms-description');
  const illustrationPanel = document.querySelector('.health-risk-card .illustration');
  const riskIndicator = document.querySelector('.health-risk-card .risk-indicator');
  const dosList = document.querySelector('.health-risk-card .dos ul');
  const dontsList = document.querySelector('.health-risk-card .donts ul');

  // Content data for each tab
  const contentData = {
    asthma: {
      title: "Asthma",
      riskDescription: "Risk of Asthma is <span class='text-highlight'>Mid</span> when AQI is <span class='text-highlight'>Poor (50-150)</span>.",
      symptomsDescription: "Symptoms include severe coughing, difficulty breathing, wheezing, and chest tightness.",
      illustration: `<img src="/img/svgs/disease-asthma.svg" alt="">`,
      riskIndicatorText: `High Chances of Asthma`,
      dos: [
        "Keep your inhaler handy at all times.",
        "Avoid known triggers such as dust and pollen.",
        "Practice breathing exercises regularly."
      ],
      donts: [
        "Avoid exposure to smoke and pollutants.",
        "Do not skip your prescribed medications.",
        "Steer clear of strenuous activities during flare-ups."
      ]
    },
    heart: {
      title: "Heart Issues",
      riskDescription: "Risk of Heart Issues is <span class='text-highlight'>Mid</span> when AQI is <span class='text-highlight'>Poor (50-150)</span>.",
      symptomsDescription: "Symptoms include chest pain, shortness of breath, and irregular heartbeat.",
      illustration: `<img src="/img/svgs/disease-heart.svg" alt="">`,
      riskIndicatorText: `Moderate Chances of Heart Issues`,
      dos: [
        "Maintain a balanced diet low in saturated fats.",
        "Engage in regular moderate exercise.",
        "Monitor your blood pressure regularly."
      ],
      donts: [
        "Avoid smoking or exposure to second-hand smoke.",
        "Do not neglect prescribed heart medications.",
        "Limit intake of salty and fatty foods."
      ]
    },
    allergies: {
      title: "Allergies",
      riskDescription: "Risk of Allergies is <span class='text-highlight'>Mid</span> when AQI is <span class='text-highlight'>Poor (50-150)</span>.",
      symptomsDescription: "Symptoms include sneezing, itchy eyes, runny nose, and congestion.",
      illustration: `<img src="/img/svgs/disease-allergy.svg" alt="">`,
      riskIndicatorText: `Moderate Chances of Allergies`,
      dos: [
        "Keep windows closed during high pollen times.",
        "Use air purifiers indoors.",
        "Take antihistamines if advised by your doctor."
      ],
      donts: [
        "Avoid outdoor activities when pollen is high.",
        "Do not expose yourself to allergens unnecessarily.",
        "Skip using unverified herbal remedies."
      ]
    },
    sinus: {
      title: "Sinus",
      riskDescription: "Risk of Sinus is <span class='text-highlight'>Mid</span> when AQI is <span class='text-highlight'>Poor (50-150)</span>.",
      symptomsDescription: "Symptoms include facial pain, nasal congestion, and headache.",
      illustration: `<img src="/img/svgs/disease-sinus.svg" alt="">`,
      riskIndicatorText: `Elevated Chances of Sinus Issues`,
      dos: [
        "Use saline nasal sprays to clear congestion.",
        "Apply warm compresses to ease pain.",
        "Stay hydrated to help thin mucus."
      ],
      donts: [
        "Avoid cold and dry air.",
        "Do not ignore persistent symptoms.",
        "Avoid overusing decongestant sprays."
      ]
    },
    cold: {
      title: "Cold/Flu",
      riskDescription: "Risk of Cold/Flu is <span class='text-highlight'>Mid</span> when AQI is <span class='text-highlight'>Poor (50-150)</span>.",
      symptomsDescription: "Symptoms include runny nose, sore throat, cough, and fever.",
      illustration: `<img src="/img/svgs/disease-flu.svg" alt="">`,
      riskIndicatorText: `Increased Chances of Cold/Flu`,
      dos: [
        "Rest well and stay hydrated.",
        "Wash your hands frequently.",
        "Use a humidifier to ease breathing."
      ],
      donts: [
        "Avoid close contact with sick individuals.",
        "Do not overexert yourself during illness.",
        "Avoid consuming cold drinks if symptomatic."
      ]
    },
    chronic: {
      title: "Chronic (COPD)",
      riskDescription: "Risk of Chronic (COPD) symptoms is <span class='text-highlight'>Mid</span> when AQI is <span class='text-highlight'>Poor (50-150)</span>.",
      symptomsDescription: "Moderate symptoms include more frequent shortness of breath, persistent cough, increased wheezing, chest tightness, and fatigue.",
      illustration: `<img src="/img/svgs/disease-copd.svg" alt="">`,
      riskIndicatorText: `Mid. Chances of Chronic (COPD)`,
      dos: [
        "Use a humidifier to keep indoor air moist.",
        "Drink herbal teas to soothe respiratory passages.",
        "Follow your medication regime diligently."
      ],
      donts: [
        "Avoid smoking or exposure to smoke.",
        "Do not skip any prescribed medications.",
        "Refrain from strenuous outdoor activities during high pollution."
      ]
    }
  };

  // Function to update the card content based on the selected tab
  function updateContent(tab) {
    const data = contentData[tab];
    if (data) {
      infoTitle.textContent = data.title;
      riskDescription.innerHTML = data.riskDescription;
      symptomsDescription.textContent = data.symptomsDescription;
      illustrationPanel.innerHTML = data.illustration;
      
      // Update Do's list
      dosList.innerHTML = data.dos
        .map(item => `<li>
                        <span class="check-icon">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </span>
                        <span>${item}</span>
                      </li>`)
        .join('');
      
      // Update Don'ts list
      dontsList.innerHTML = data.donts
        .map(item => `<li>
                        <span class="x-icon">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </span>
                        <span>${item}</span>
                      </li>`)
        .join('');
    }
    // After updating the content, update both the risk description and the indicator dynamically
    if (typeof window.updateRiskDescription === 'function') {
      window.updateRiskDescription();
    }
    if (typeof window.updateRiskIndicator === 'function') {
      window.updateRiskIndicator();
    }
  }

  // Helper function to update the text-highlight color based on AQI level
  function updateTextHighlightColor() {
    let color;
    if (window.aqi <= 50) {
      color = '#2ecc71'; // Green for Good
    } else if (window.aqi <= 100) {
      color = '#f1c40f'; // Yellow for Moderate
    } else {
      color = '#ef4444'; // Red for Poor and beyond
    }

    document.querySelectorAll('.text-highlight').forEach(el => {
      el.style.color = color;
    });
  }

  // Function to update the risk description dynamically based on global AQI data
  function updateRiskDescription() {
    const riskDescEl = document.querySelector('.health-risk-card .risk-description');
    const diseaseTitle = document.querySelector('.health-risk-card .info-panel h2').textContent;
    
    const riskMapping = {
      'Good': 'Low',
      'Moderate': 'Moderate',
      'Poor': 'High',
      'Unhealthy': 'Very High',
      'Severe': 'Extreme',
      'Hazardous': 'Critical'
    };
    const dynamicRiskLevel = riskMapping[window.statusText] || 'Mid';
    
    let aqiRange;
    if (window.aqi <= 50) {
      aqiRange = "Good (0-50)";
    } else if (window.aqi <= 100) {
      aqiRange = "Moderate (51-100)";
    } else if (window.aqi <= 150) {
      aqiRange = "Poor (101-150)";
    } else if (window.aqi <= 200) {
      aqiRange = "Unhealthy (151-200)";
    } else if (window.aqi <= 300) {
      aqiRange = "Severe (201-300)";
    } else {
      aqiRange = "Hazardous (301+)";
    }
    
    riskDescEl.innerHTML = `Risk of ${diseaseTitle} is <span class='text-highlight'>${dynamicRiskLevel}</span> when AQI is <span class='text-highlight'>${aqiRange}</span>.`;
    
    // Update the text-highlight color according to AQI level
    updateTextHighlightColor();
  }
  window.updateRiskDescription = updateRiskDescription;

  // Function to update risk indicator dynamically; this syncs the risk level with the active disease
  function updateRiskIndicator() {
    const riskIndicatorEl = document.querySelector('.health-risk-card .risk-indicator');
    const diseaseTitle = document.querySelector('.health-risk-card .info-panel h2').textContent;
  
    const riskMapping = {
      'Good': 'Low',
      'Moderate': 'Moderate',
      'Poor': 'High',
      'Unhealthy': 'Very High',
      'Severe': 'Extreme',
      'Hazardous': 'Critical'
    };
    const dynamicIndicatorLevel = riskMapping[window.statusText] || 'Mid';
  
    // Determine the background color based on the current AQI value
    let indicatorBgColor;
    if (window.aqi <= 50) {
      indicatorBgColor = '#2ecc71'; // Green for Good
    } else if (window.aqi <= 100) {
      indicatorBgColor = '#ffcc23'; // Yellow for Moderate
    } else {
      indicatorBgColor = '#ef4444'; // Red for Poor and beyond
    }
  
    // Update the risk indicator's inner HTML and background color
    riskIndicatorEl.innerHTML = ` ${dynamicIndicatorLevel} chances of ${diseaseTitle}`;
    riskIndicatorEl.style.backgroundColor = indicatorBgColor;
  }
  
  window.updateRiskIndicator = updateRiskIndicator;

  // Updated function: Remove old duplicate and merge both advisory updates
  function updateSolutionAdvisory() {
    // Update advisory for elements that indicate the level (e.g., p with id "advisable" or class "advisable")
    const advisText = window.aqi > 100 ? 'Must' : 'Advisable';
    document.querySelectorAll('.solution-tab .solution-text p, .solution-tab .solution-text p')
      .forEach(el => {
        el.textContent = advisText;
      });
    
    // Update advisory for elements that indicate action (e.g., p with id "turn-off")
    const turnText = window.aqi > 100 ? 'Turn On' : 'Turn Off';
    document.querySelectorAll('.solution-tab .solution-text p.turn-off')
      .forEach(el => {
        el.textContent = turnText;
      });
  }

  // Define updateBackgroundColorAndRange so it has access to the correct window.aqi
  function updateBackgroundColorAndRange() {
    let aqiRange;
    let bgColor;

    if (window.aqi <= 50) {
      aqiRange = "Good (0-50)";
      bgColor = "#c7fed8"; // Green
    } else if (window.aqi <= 100) {
      aqiRange = "Moderate (51-100)";
      bgColor = "#fef3c7"; // Yellow
    } else {
      aqiRange = "Poor (101+)";
      bgColor = "#fec7c7"; // Red
    }

    // Update the background color of all elements with class "illustrationbg"
    const elements = document.querySelectorAll('.illustrationbg');
    elements.forEach(element => {
      element.style.backgroundColor = bgColor;
    });

    console.log("Current AQI Range: " + aqiRange);
  }

  // Initialize with default active tab content ("asthma")
  updateContent('asthma');

  // Set the "asthma" tab button as active
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-tab') === 'asthma') {
      btn.classList.add('active');
    }
  });

  // Add click event listeners to health-risk card tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const tabName = this.getAttribute('data-tab');
      updateContent(tabName);
    });
  });

  // Remove the loader with a smooth fade out
  setTimeout(function() {
    const loader = document.getElementById('loader');
    loader.style.opacity = "0";
    setTimeout(function() {
      loader.style.display = 'none';
    }, 800);
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

  const results = JSON.parse(decodeURIComponent(dataParam));
  document.getElementById('stateHeading').innerText = `Air Quality in ${results.stateName}`;

  // Set AQI and update UI elements
  const aqiValueEl = document.getElementById('aqiValue');
  const aqiStatusEl = document.getElementById('aqiStatus');
  const aqiCircleEl = document.getElementById('aqiCircle');

  aqiValueEl.textContent = results.aqi;
  const aqi = results.aqi; 

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
    healthImgEl.src = "/img/svgs/aqi-good-level.svg";
  } else if (aqi <= 100) {
    healthImgEl.src = "/img/svgs/aqi-moderate-level.svg";
  } else if (aqi <= 150) {
    healthImgEl.src = "/img/svgs/aqi-poor-level.svg";
  } else if (aqi <= 200) {
    healthImgEl.src = "/img/svgs/aqi-unhealthy-level.svg";
  } else if (aqi <= 300) {
    healthImgEl.src = "/img/svgs/aqi-severe-level.svg";
  } else {
    healthImgEl.src = "/img/svgs/aqi-hazardous-level.svg";
  }

  document.getElementById('cigsPerDay').innerText = results.cigsPerDay;
  document.getElementById('cigsPerYear').innerText = results.cigsPerYear;
  document.getElementById('daysLost').innerText = results.daysLost;
  document.getElementById('yearsLost').innerText = results.yearsLost;

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

  // Save AQI and statusText globally and update both risk description and indicator
  window.aqi = aqi;
  window.statusText = statusText;
  window.updateRiskDescription();
  window.updateRiskIndicator();

  // Update the solution advisory text ("Must"/"Advisable" and "Turn On"/"Turn Off") based on AQI
  updateSolutionAdvisory();

  /* 
     Solution Tabs Functionality
  */
  const solutionTabs = document.querySelectorAll('.solution-tab');
  const messageEl = document.getElementById('solution-message');
  const linkEl = document.querySelector('.solution-link');

  const solutionsData = {
    'air-purifier': {
      message: 'Running an air purifier with a HEPA filter helps remove PM2.5 and other pollutants.',
      linkText: 'View Air Purifiers',
      linkHref: '#'
    },
    'car-filter': {
      message: 'Use recirculation mode and maintain a clean cabin filter to reduce intake of polluted air.',
      linkText: 'Learn More About Car Filters',
      linkHref: '#'
    },
    'n95-mask': {
      message: 'Must wear a mask to shield yourself from pollutant exposure.',
      linkText: 'Get a N95 Mask',
      linkHref: '#'
    },
    'stay-indoor': {
      message: 'Limit outdoor activities when pollution is high. Keep windows and doors closed.',
      linkText: 'Tips to Improve Indoor Air',
      linkHref: '#'
    }
  };

  solutionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      solutionTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabKey = tab.getAttribute('data-tab');
      const { message, linkText, linkHref } = solutionsData[tabKey];

      messageEl.textContent = message;
      linkEl.textContent = linkText;
      linkEl.setAttribute('href', linkHref);
    });
  });

  // Call updateBackgroundColorAndRange AFTER window.aqi has been set
  updateBackgroundColorAndRange();
});
