document.getElementById('search-btn').addEventListener('click', async () => {
    const countryName = document.getElementById('country-input').value.trim();
    if (countryName) {
        // Show loading indicator
        showLoadingIndicator(true);

        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
            if (!response.ok) throw new Error('Country not found');
            const countryData = await response.json();

            // Store data in localStorage
            localStorage.setItem('lastSearchedCountry', JSON.stringify(countryData[0]));

            // Display country info
            displayCountryInfo(countryData[0]);

            // Hide loading indicator
            showLoadingIndicator(false);
        } catch (error) {
            document.getElementById('country-info').innerHTML = 'Error fetching data: ' + error.message;
            showLoadingIndicator(false);
        }
    } else {
        document.getElementById('country-info').innerHTML = 'Please enter a country name.';
    }
});

// Display data from localStorage when the page is refreshed
window.onload = () => {
    const savedData = localStorage.getItem('lastSearchedCountry');
    if (savedData) {
        displayCountryInfo(JSON.parse(savedData));
    }
};

function displayCountryInfo(country) {
    const countryInfoDiv = document.getElementById('country-info');
    countryInfoDiv.innerHTML = `
        <h3>${country.name.common}</h3>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Sub Region:</strong>${country.subregion}</p>
    `;
}

// Function to show/hide loading indicator
function showLoadingIndicator(show) {
    const loadingIndicator = document.getElementById('loading');
    if (show) {
        loadingIndicator.style.display = 'block';
    } else {
        loadingIndicator.style.display = 'none';
    }
}
