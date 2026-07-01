# Semiconductor Product Catalog

A full-stack web application that imports semiconductor product data from a CSV file into a PostgreSQL database and provides an interactive interface for browsing products by category and subcategory.

---

## Features

- Import product data from CSV
- Store data in PostgreSQL (Neon)
- Dynamic relational database using Prisma ORM
- Browse products by category and subcategory
- Search products by part number
- Dynamic specification table
- View datasheet links
- Loading indicator during CSV import

---

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Axios
- Vite

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Neon)
- Multer
- csv-parser

---

## Project Structure

```
.
├── backend
│   ├── prisma
│   ├── src
│   └── package.json
│
├── frontend
│   ├── src
│   └── package.json
│
└── README.md
```

---

## Database Schema

```
Category
   │
   └── SubCategory
            │
            └── Product
                     │
                     └── ProductSpecification
                              │
                              └── Specification
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/RishiSharmapro/SyncPower.git

cd SyncPower
```

---

### Backend

```bash
cd backend

npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_neon_database_url
```

Run migrations

```bash
npx prisma migrate dev
```

Start backend

```bash
npm start
```

---

### Frontend

```bash
cd frontend

npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Run

```bash
npm run dev
```

---

## API Endpoints

### Upload CSV

```
POST /api/v1/upload
```

Upload using multipart/form-data.

Field name:

```
data
```

---

### Get Products

```
GET /api/v1/products
```

Returns the complete product hierarchy:

```
Category
    └── SubCategory
            └── Products
                    └── Specifications
```

---

## Screenshots

### Product Catalog
<img width="1470" height="842" alt="Screenshot 2026-07-01 at 6 35 13 PM" src="https://github.com/user-attachments/assets/92bd40b0-f7f0-426b-949e-ec05374b1b5f" />

---

## Deployment

### Frontend

Vercel

### Backend

Render

### Database

Neon PostgreSQL

---

## Notes

- CSV import may take up to **5 minutes** depending on file size.
- The application displays a loading overlay while the import is in progress.
- Product specifications are rendered dynamically, allowing the application to adapt to different CSV structures without code changes.
