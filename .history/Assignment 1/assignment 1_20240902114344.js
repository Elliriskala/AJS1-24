/* 1. In this assignment, your objective is to finalize the restaurant app by incorporating modular components, arrow functions, special operators, and applying destructuring where appropriate. You'll be enhancing the existing codebase to create a more organized, maintainable, and efficient application. */

'use strict';

const target = document.querySelector('tbody');
const modal = document.querySelector('dialog');
const info = document.querySelector('#info');
const closeModal = document.querySelector('#close-modal');

closeModal.addEventListener('click', () => {
  modal.close();
});

const apiURL = 'https://media1.edu.metropolia.fi/restaurant';

// Fetching restaurant data
const listRestaurants = async () => {
  // fecthData.js
  // eslint-disable-next-line no-undef
  const restaurants = await fetchData(apiURL + '/api/v1/restaurants');

  restaurants.sort((a, b) => a.name.localeCompare(b.name));
  console.log(restaurants);

  for (const restaurant of restaurants) {
    if (restaurant) {
          const {name, address, _id, company, postalCode, city, phone} = restaurant;
          const restaurantName = document.createElement('td');
          name.innerText = name;

          const restaurantAddress = document.createElement('td');
          address.innerText = address;

          const row = document.createElement('tr');

          row.addEventListener('click', async () => {
            // fetch menu data
            // eslint-disable-next-line no-undef
            const menu = await fetchData(`${apiURL}/api/v1/restaurants/daily/${_id}/en`);

            // Build the menu's HTML
            let menuHTML = '';
            for (const course of menu.courses) {
              const {name, price, diets} = course;
              menuHTML += `<li>
                            <h4>Course: ${name}</h4>
                              <p><i>Price: </i>${price || 'No price available'}</p>
                              <p><i>Allergens: </i> ${diets || 'No allergens listed'}</p>
                            </li>
                          `;
            };

          const highlights = document.querySelectorAll('.highlight');
          for (const highligted of highlights) {
            highligted.classList.remove('highlight');
          }
          row.classList.add('highlight');
          modal.showModal();
          const restaurantHTML = `
              <header>
                <h3>${name}</h3>
                <p>${company}</p>
              </header>
              <address>
                  ${address}<br>
                  ${postalCode} ${city}<br>
                  ${phone}<br>
              </address>
              <div>
                <h3>Today's Menu</h3>
                <ul>
                  ${menuHTML || 'No menu available today'}
                </ul>
              </div>
            `;

          info.innerHTML = '';
          info.insertAdjacentHTML('beforeend', restaurantHTML);
        });

          row.append(restaurantName, restaurantAddress);
          target.append(row);
    }
  }
}

listRestaurants();
