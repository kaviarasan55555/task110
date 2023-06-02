function fetchCountryData() {
    return new Promise((resolve, reject) => {
      fetch('https://restcountries.com/v2/all')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch country data');
          }
          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  function createCountryCard(country) {
    const card = document.createElement('div');
    card.className = 'card';
  
    const flag = document.createElement('img');
    flag.src = country.flags.svg;
    flag.alt = `${country.name} Flag`;
    flag.className = 'card-img-top';
    card.appendChild(flag);
  
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
  
    const countryCode = document.createElement('h2');
    countryCode.textContent = country.alpha2Code;
    countryCode.className = 'card-title';
    cardBody.appendChild(countryCode);
  
    const capitalCity = document.createElement('p');
    capitalCity.textContent = `Capital: ${country.capital}`;
    capitalCity.className = 'card-text';
    cardBody.appendChild(capitalCity);
  
    card.appendChild(cardBody);
  
    return card;
  }
  
  function displayCountryData(countryData) {
    const countryContainer = document.getElementById('countryContainer');
    countryContainer.innerHTML = '';
  
    countryData.forEach(country => {
      const card = createCountryCard(country);
      countryContainer.appendChild(card);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    fetchCountryData()
      .then(data => {
        displayCountryData(data);
      })
      .catch(error => {
        const countryContainer = document.getElementById('countryContainer');
        countryContainer.innerHTML = `<p>${error.message}</p>`;
      });
  });
  
  