document.getElementById('mealForm').addEventListener('submit', generateMealPlan);

function generateMealPlan(event) {
  event.preventDefault();

  const age = Number(document.getElementById('age').value);
  const weight = Number(document.getElementById('weight').value);
  const height = Number(document.getElementById('height').value);
  const gender = document.getElementById('gender').value;
  const activityLevel = Number(document.getElementById('activityLevel').value);
  const numOfMeals = Number(document.getElementById('numOfMeals').value);
  const dietPreference = document.getElementById('dietPreference').value;
  const healthSpec = document.getElementById('healthSpec').value;

  // Calculate BMR
  let bmr;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  const calories = Math.round(bmr * activityLevel);

  // Edamam API credentials
  const APP_ID = "e947ca61";       // Replace with your Recipe API App ID
  const APP_KEY = "2091292881158d603a7a3cfda4f00c6f";     // Replace with your Recipe API App Key
  const USER_EMAIL = "22eg105p01@anurag.edu.in"; // Replace with your Edamam login email

  // CORS Proxy to avoid browser block
  const proxy = "https://corsproxy.io/?";
  const apiUrl = `${proxy}https://api.edamam.com/api/recipes/v2?type=public&q=${dietPreference}&app_id=${APP_ID}&app_key=${APP_KEY}&health=${healthSpec}&random=true`;

  fetch(apiUrl, {
    headers: {
      "Edamam-Account-User": USER_EMAIL
    }
  })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (data.hits && data.hits.length > 0) {
        displayMealPlan(data.hits, numOfMeals);
      } else {
        document.getElementById('mealPlanDisplay').innerHTML = "<p>No meals found. Try different preferences.</p>";
      }
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById('mealPlanDisplay').innerHTML = `<p>⚠️ ${error.message}</p>`;
    });
}

function displayMealPlan(meals, numOfMeals) {
  const mealPlanDisplay = document.getElementById('mealPlanDisplay');
  mealPlanDisplay.innerHTML = '';

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const headerRow = document.createElement('tr');
  days.forEach(day => {
    const th = document.createElement('th');
    th.textContent = day;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  for (let i = 0; i < numOfMeals; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const mealIndex = i * 7 + j;
      const cell = document.createElement('td');

      if (meals[mealIndex]) {
        const meal = meals[mealIndex].recipe;
        cell.innerHTML = `
          <h3>${meal.label}</h3>
          <img src="${meal.image}" alt="${meal.label}" style="width:100%; max-width:200px;">
          <p><a href="${meal.url}" target="_blank">View Recipe</a></p>
        `;
      } else {
        cell.textContent = "—";
      }
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  mealPlanDisplay.appendChild(table);
}
