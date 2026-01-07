const meals = ["Chicken", "Pasta", "Burger"];

async function ucitavanjeHrane() {
  const res = [];

  for (let meal of meals) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        res.push(data.meals[0]);
      } else {
        console.warn(`Nema rezultata za: ${meal}`);
      }
    } catch (err) {
      console.error("API greska", err);
    }
  }
  localStorage.setItem("hrana", JSON.stringify(res));
  console.log("sacuvano:", res);
}

ucitavanjeHrane();
