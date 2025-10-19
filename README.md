# Meal Plan Generator

A **dynamic web application** that generates a personalized weekly meal plan based on user inputs such as age, weight, height, gender, activity level, diet preference, and health restrictions. It uses the **Edamam Recipe Search API (v2)** to fetch recipes and display them in an interactive table.

---

## Features

- Calculate personalized daily calorie requirements using **BMR and activity level**.
- Supports multiple meal plans per day (2, 3, or 5 meals).
- Selectable **diet preferences**: Balanced, Low-Carb, Low-Fat.
- Selectable **health specifications**: Vegan, Vegetarian, Alcohol-Free, Peanut-Free.
- Displays meals in a **week-view table** with:
  - Recipe name
  - Image
  - Link to full recipe
- Responsive, user-friendly interface with **dark theme**.
- Works with modern browsers using **Live Server**.
## Technologies Used

- **HTML5** – Structure and layout
- **CSS3** – Styling and responsive design
- **JavaScript (ES6)** – Form handling, API requests, and dynamic content
- **Edamam Recipe Search API (v2)** – Fetching real-time recipes

---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/meal-plan-generator.git
   cd meal-plan-generator
2.Open the project using Live Server (VS Code extension recommended).

3.Get your Edamam API credentials:

Sign up at Edamam Developer

Create an app with Recipe Search API (v2)

Copy your App ID, App Key, and User Email.

4.Update script.js with your credentials:

const APP_ID = "YOUR_APP_ID";
const APP_KEY = "YOUR_APP_KEY";
const USER_EMAIL = "your_email@example.com";


5.Run the application:

Open index.html via Live Server.

Fill in the form and click Generate Meal Plan.

Your personalized meal plan will appear below the form.
