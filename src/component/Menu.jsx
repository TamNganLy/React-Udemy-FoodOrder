import { useEffect, useState } from "react";
import Meal from "./Meal";

export default function Menu() {
  const [meals, setMeals] = useState();

  useEffect(() => {
    async function loadMeals() {
      const response = await fetch("http://localhost:3000/meals");
      const meals = await response.json();
      setMeals(meals);
    }

    loadMeals();
  }, []);

  return (
    <div>
      {meals && (
        <ul id="meals">
          {meals.map((meal) => (
            <Meal key = {meal.id} meal = {meal} />
          ))}
        </ul>
      )}
    </div>
  );
}
