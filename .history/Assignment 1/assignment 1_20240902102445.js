/* 5. In this assignment we will work with the Restaurant API to build upon the previous lab's restaurant assignment (Assignment 2). Extend the previous restaurant assignment by integrating the Restaurant API and enhancing the app to display the current day's menu for selected restaurants.

Begin by revisiting your previous restaurant assignment code.
Modify the app to fetch restaurant data using a single AJAX call to the Restaurant API endpoint. Replace the previous hard-coded array of restaurants.
Implement the necessary logic to display the retrieved restaurant data in your app.
When a user clicks on a restaurant, make another AJAX call to fetch the current day's menu for the selected restaurant from the API.
Enhance the modal functionality to show both the restaurant details (name, address, etc.) and the current day's menu.
Ensure that the modal is populated with the relevant information when a user clicks on a restaurant.
Implement error handling for the AJAX calls, displaying appropriate messages if data retrieval fails.
Test the app thoroughly to ensure that restaurant data and menus are displayed accurately.
Make effective use of CSS for styling and layout.
10p
*/

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
            const menu = await fetchData(`${apiURL}/api/v1/restaurants/daily/${restaurant._id}/fi`);

            // Build the menu's HTML
            let menuHTML = '';
            menu.items.forEach((item) => {
              menuHTML += `<li>${item.name}, ${item.price}€, ${item.allergies.join(', ')}</li>`;
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
                  ${menuHTML}
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
