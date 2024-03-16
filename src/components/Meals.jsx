import { useState, useEffect } from "react";

import MealItem from "./MealItem.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch(BACKEND_URL + "/meals");

      if (!response.ok) {
        // ...
      }

      const meals = await response.json();
      setLoadedMeals(meals);
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
