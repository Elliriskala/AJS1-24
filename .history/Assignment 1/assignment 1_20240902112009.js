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
          const name = document.createElement('td');
          name.innerText = restaurant.name;

          const address = document.createElement('td');
          address.innerText = restaurant.address;

          const row = document.createElement('tr');

          row.addEventListener('click', async () => {
            // fetch menu data
            // eslint-disable-next-line no-undef
            const menu = await fetchData(`${apiURL}/api/v1/restaurants/daily/${restaurant._id}/en`);

            // Build the menu's HTML
            let menuHTML = '';
            menu.courses.forEach((item) => {
              menuHTML += `<li>Course: ${item.name}, Price: ${item.price || 'No price available'}, <br><i> Allergens:</i> ${item.diets || 'No allergens listed'}</li>`;
            });

          const highlights = document.querySelectorAll('.highlight');
          for (const highligted of highlights) {
            highligted.classList.remove('highlight');
          }
          row.classList.add('highlight');
          modal.showModal();
          const restaurantHTML = `
              <header>
                <h3>${restaurant.name}</h3>
                <p>${restaurant.company}</p>
              </header>
              <address>
                  ${restaurant.address}<br>
                  ${restaurant.postalCode} ${restaurant.city}<br>
                  ${restaurant.phone}<br>
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

          row.append(name, address);
          target.append(row);
    }
  }
}

listRestaurants();
