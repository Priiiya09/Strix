# Strix CMS — Backend Setup Guide

## Folder Structure (Final)

```
STRIX_CODE/
├── index.html          ← Website (frontend)
├── admin.html          ← CMS Admin Panel
├── backend/
│   ├── server.js       ← Main server file  ✅ UPDATED
│   ├── .env            ← MongoDB connection string
│   ├── package.json    ✅ UPDATED
│   ├── models/
│   │   └── Project.js  ← MongoDB schema   ✅ NEW
│   └── routes/
│       └── projectRoutes.js  ← API routes  ✅ NEW
```

---

## Setup Steps

### 1. Install MongoDB (if not installed)
Download from: https://www.mongodb.com/try/download/community
(Keep it running in background)

### 2. Install dependencies
```bash
cd backend
npm install
```

### 3. Start the server
```bash
node server.js
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on http://localhost:5000
```

### 4. Open in browser
- Website:   http://localhost:5000/index.html
- Admin CMS: http://localhost:5000/admin.html

### 5. Seed default projects
In admin.html → click **"Reset Default"** button to load the 3 default projects into MongoDB.

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `Cannot find module './routes/projectRoutes'` | Make sure `routes/projectRoutes.js` exists ✅ |
| `MongoDB connection error` | Make sure MongoDB is running locally |
| `EADDRINUSE port 5000` | Another app using port 5000 — change PORT in `.env` |
| Projects not loading on website | Make sure backend is running before opening website |

---

## Using MongoDB Atlas (Cloud — recommended for live site)

1. Go to https://cloud.mongodb.com → create free account
2. Create a cluster → get connection string
3. Open `backend/.env` and replace:
```
MONGO_URI=mongodb+srv://yourUser:yourPassword@cluster.mongodb.net/strixCMS
```

---

## How CMS Works

1. Open `admin.html` → login → edit any project
2. Change title, description, case study content, upload image
3. Click **Save** → saved to MongoDB
4. Website (`index.html`) automatically shows updated content on next load
