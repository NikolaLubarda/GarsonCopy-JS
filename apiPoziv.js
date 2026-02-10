// apiPoziv.js

const meals = ["Chicken", "Pasta", "Burger"];
const cocktails = ["Margarita", "Aperol Spritz", "Mojito"];

const LS_HRANA = "hrana";
const LS_KOKTELI = "kokteli";

async function fetchJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
  return r.json();
}

async function ucitajHranu() {
  const urls = meals.map(
    (meal) =>
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        meal
      )}`
  );

  const results = await Promise.allSettled(urls.map(fetchJson));
  const res = [];

  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      const data = r.value;
      if (data.meals && data.meals.length > 0) res.push(data.meals[0]);
      else console.warn(`Nema rezultata za hranu: ${meals[i]}`);
    } else {
      console.error(`Hrana API greska za ${meals[i]}:`, r.reason);
    }
  });

  localStorage.setItem(LS_HRANA, JSON.stringify(res));
  return res;
}

async function ucitajKoktela() {
  const urls = cocktails.map(
    (c) =>
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        c
      )}`
  );

  const results = await Promise.allSettled(urls.map(fetchJson));
  const res = [];

  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      const data = r.value;
      if (data.drinks && data.drinks.length > 0) res.push(data.drinks[0]);
      else console.warn(`Nema rezultata za koktel: ${cocktails[i]}`);
    } else {
      console.error(`Kokteli API greska za ${cocktails[i]}:`, r.reason);
    }
  });

  localStorage.setItem(LS_KOKTELI, JSON.stringify(res));
  return res;
}

// Glavna init funkcija (poziva se iz narudzba.js)
export async function initApis({ force = false } = {}) {
  const cachedHrana = localStorage.getItem(LS_HRANA);
  const cachedKokteli = localStorage.getItem(LS_KOKTELI);

  const hasCache = cachedHrana && cachedKokteli;

  if (hasCache && !force) {
    return {
      hrana: JSON.parse(cachedHrana),
      kokteli: JSON.parse(cachedKokteli),
      fromCache: true,
    };
  }

  const [hrana, kokteli] = await Promise.all([ucitajHranu(), ucitajKoktela()]);
  return { hrana, kokteli, fromCache: false };
}
