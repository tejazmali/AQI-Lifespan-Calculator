    // Remove the loader with a smooth fade out once content is ready
    document.addEventListener("DOMContentLoaded", function() {
        setTimeout(function() {
          const loader = document.getElementById('loader');
          loader.style.opacity = "0";
          setTimeout(function() {
            loader.style.display = "none";
          }, 800);
        }, 2000);
      });
  
      // Mapping from state names to coordinates (for clicks)
      const stateCoordinates = {
        
          "Andhra Pradesh": "16.5417,80.5158",
          "Arunachal Pradesh": "27.0844,93.6053",
          "Assam": "26.1433,91.7898",
          "Bihar": "25.5941,85.1376",
          "Chhattisgarh": "21.2514,81.6296",
          "Goa": "15.4909,73.8278",
          "Gujarat": "21.1667,72.8333",
          "Haryana": "30.7333,76.7794",
          "Himachal Pradesh": "31.1048,77.1734",
          "Jharkhand": "23.3441,85.3096",
          "Karnataka": "12.9716,77.5946",
          "Kerala": "8.5241,76.9366",
          "Madhya Pradesh": "23.2599,77.4126",
          "Maharashtra": "19.0760,72.8777",
          "Manipur": "24.8170,93.9368",
          "Meghalaya": "25.5788,91.8933",
          "Mizoram": "23.7271,92.7176",
          "Nagaland": "25.6700,94.1100",
          "Odisha": "20.2961,85.8245",
          "Punjab": "31.6340,74.8723",
          "Rajasthan": "26.9124,75.7873",
          "Sikkim": "27.3389,88.6065",
          "Tamil Nadu": "13.0827,80.2707",
          "Telangana": "17.3850,78.4867",
          "Tripura": "23.8315,91.2868",
          "Uttar Pradesh": "26.8467,80.9462",
          "Uttarakhand": "30.3165,78.0322",
          "West Bengal": "22.5726,88.3639",
          "Delhi": "28.6139,77.2090",
          "Puducherry": "11.9416,79.8083",
          "Jammu and Kashmir": "32.7333,74.8667",
          "Ladakh": "34.1526,77.5771",
          "Chandigarh": "30.7333,76.7794",
          "Andaman and Nicobar Islands": "11.7401,92.6586",
          "Daman and Diu": "20.1809,73.0169"
        }
        
  
      function showTooltip(stateName, x, y) {
        const tooltip = document.getElementById('custom-tooltip');
        if (!tooltip) return;
        tooltip.innerHTML = stateName;
        tooltip.classList.add('show');
        const tooltipWidth = tooltip.clientWidth;
        const tooltipHeight = tooltip.clientHeight;
        const offsetY = 5; // gap between cursor and tooltip
        tooltip.style.left = (x - tooltipWidth / 2) + 'px';
        tooltip.style.top = (y - tooltipHeight - offsetY) + 'px';
      }
  
      function hideTooltip() {
        const tooltip = document.getElementById('custom-tooltip');
        if (!tooltip) return;
        tooltip.classList.remove('show');
      }
  
      document.addEventListener('mousemove', function(e) {
        const tooltip = document.getElementById('custom-tooltip');
        if (tooltip && tooltip.classList.contains('show')) {
          const offsetY = 5;
          tooltip.style.left = (e.pageX - tooltip.clientWidth / 2) + 'px';
          tooltip.style.top = (e.pageY - tooltip.clientHeight - offsetY) + 'px';
        }
      });
  
      FusionCharts.ready(function() {
        var indiaMap = new FusionCharts({
          type: "maps/india",
          renderAt: "indian-map",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource: {
            "chart": {
              "bgColor": "#121212",
              "canvasBgColor": "#121212",
              "borderColor": "#2f2f2f",
              "entityFillColor": "#ffffff",
              "entityBorderColor": "#222222",
              "showToolTip": "0",
              "entityFillHoverColor": "ffffff",
              "caption": "",
              "subcaption": "",
              "showLegend": "0",
              "showLabels": "1",
              "showBorder": "1",
              "showCanvasBorder": "0",
              "legendBorderAlpha": "1",
              "nullEntityColor": "#888888"
            },
            "colorrange": {
              "minvalue": "0",
              "code": "#ffffff",
              "gradient": "0"
            },
            "data": []
          },
          events: {
            "entityRollOver": function(evtObj, dataObj) {
              const stateElement = document.getElementById(dataObj.id);
              if (stateElement) {
                stateElement.classList.add("custom-hover");
              }
              showTooltip(dataObj.label, evtObj.clientX, evtObj.clientY);
            },
            "entityRollOut": function(evtObj, dataObj) {
              const stateElement = document.getElementById(dataObj.id);
              if (stateElement) {
                stateElement.classList.remove("custom-hover");
              }
              hideTooltip();
            },
            "entityClick": function(evtObj, dataObj) {
              const stateName = dataObj.label;
              if (stateCoordinates[stateName]) {
                const coords = stateCoordinates[stateName].split(',');
                const lat = coords[0];
                const lon = coords[1];
                window.location.href = `details.html?state=${encodeURIComponent(stateName)}&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
              } else {
                alert("Coordinates not found for " + stateName);
              }
            }
          }
        }).render();
      });