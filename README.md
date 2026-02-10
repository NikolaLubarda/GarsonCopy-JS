# GarsonCopy-JS (Mini POS / Restaurant Tables App)

A small JavaScript app that simulates a restaurant waiter workflow:
choose a waiter → choose a table → create an order → save (open table) → mark as paid.

It uses **localStorage** for persistence and fetches menu items from two public APIs.

## Features

- **Waiter selection**
  - Each waiter has **separate storage** (orders and table statuses don’t mix).
- **Tables overview**
  - **Gray** = free
  - **Orange** = open (saved order)
  - **Green** = paid
- **Order page (POS layout)**
  - Tabs: **Drinks / Food / Cocktails**
  - Add items with note + quantity
  - Side bill with total + remove item
- **Save / Paid logic**
  - **Save** keeps the table **open** (orange)
  - **Paid** closes the table and stores paid total (green)
- **Menu search**
  - Search/filter items inside the active tab
- **Receipt**
  - **Copy receipt** to clipboard
  - **Print receipt** (print mode shows only the bill)
- **API integration + caching**
  - Food: TheMealDB
  - Cocktails: TheCocktailDB
  - Results cached in localStorage

## Tech Stack

- HTML / CSS / Vanilla JavaScript
- localStorage for persistence
- Fetch API for external requests

## How to Run (Local)

Just open `index.html` in the browser (or use Live Server).

Recommended:
- VS Code → Live Server extension
- Open `index.html`

## App Flow

1. Choose a waiter on the home page
2. Pick a table
3. Add items (drinks/food/cocktails)
4. Click **Save** to keep the table open (orange)
5. Click **Paid** to close the table (green)

## Notes

- Data is stored in localStorage under a waiter namespace (example: `k:Mina:5`).
- This project is focused on UI logic and state handling without a backend.


## Author

Nikola Lubarda
