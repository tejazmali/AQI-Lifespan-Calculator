

document.addEventListener("DOMContentLoaded", function() {
    // Load header
    fetch('/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            initializeMenuToggle(); // Ensure toggle works after loading
        });

});


document.addEventListener("DOMContentLoaded", function() {
    // Load header
    fetch('/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
            initializeMenuToggle(); // Ensure toggle works after loading
        });

});



