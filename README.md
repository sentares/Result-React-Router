# React Router App – Rick and Morty Universe!

A simple multi-page React application built with **React**, **TypeScript**, **Vite**, and **React Router v6+**.
## 🚀 Features

- 🧭 Navigation across **Characters**, **Locations**, and **Episodes**
- 📋 Lists with clickable items to view detailed pages
- 🔍 Sorting by creation date (ASC/DESC) via query params
- 🧭 Persistent navigation panel across all pages
- ❌ 404 Not Found page
- 🧱 Private Routes
- 🔐 Authentication 

## Private Routes
- Any routes wrapped with `<PrivateRouter>` require the user to be authenticated.
- If the user is not authenticated, they are redirected to `/login`.
- After login, the user is redirected back to the originally requested page.

## 📁 Pages Overview

### 🏠 Home Page
- Contains a welcome message
- Includes a navigation panel to all categories
- Navigation is persistent across all pages

### 📦 Category Page (Characters, Locations, Episodes)
- Displays a list of items from the selected category
- Items are clickable and lead to their detailed view
- Includes sorting by `created` date (ascending/descending) using query parameters (`?sort=createdASC|createdDESC`)

### 🔍 Detail Page
- Displays full details of the selected item
- Accessed via `/characters/:id`, `/locations/:id`, `/episodes/:id`

### ❌ 404 Page
- A custom Not Found page is shown for unmatched routes
- You can choose to redirect back to the homepage or display a message

### 🚪 Login Page
- The login form requires **email** and **password** input fields
- Email and password inputs are validated on the client side:
  - Email format validation
  - Password minimum length (6 characters)
- Upon successful login, a token is generated

---

## 🔧 Technologies Used

- [React 19](https://react.dev/)
- [React Router v6](https://reactrouter.com/)
- [Vite](https://vitejs.dev/) – Fast frontend build tool
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- ESLint with recommended rules and plugins

---

## 📦 Project Setup

### Install dependencies

```bash
pnpm install
# or
yarn install
# or
npm install
```

## 🚀 Run development server

```bash
npm run dev
