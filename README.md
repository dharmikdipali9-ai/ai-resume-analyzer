# AI Resume Analyzer

An AI-powered full-stack Resume Analyzer platform built using React, Django REST Framework, PostgreSQL, and AI-based resume processing tools.

---

## 🚀 Live Demo

- Frontend: https://ai-resume-analyzer-mu-coral.vercel.app/
- Backend: https://ai-resume-analyzer-f7gj.onrender.com/

---

# ✨ Features

- User Authentication (JWT)
- Resume Upload & Management
- AI Resume Analysis
- Resume Builder
- Interview Preparation Bot
- ATS-Friendly Resume Evaluation
- Secure REST APIs
- Responsive UI
- Token Refresh Authentication
- PostgreSQL Database Integration

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Axios
- React Router
- CSS / Bootstrap

## Backend
- Django
- Django REST Framework
- JWT Authentication
- Python

## Database
- PostgreSQL (Neon DB)

## Deployment
- Frontend: Vercel
- Backend: Render
- Database: Neon PostgreSQL

---

# 📂 Project Structure

```text
ai-resume-analyzer/
│
├── backend/
│   ├── ai_engine/
│   ├── interview_bot/
│   ├── resumes/
│   ├── resumes_builder/
│   ├── users/
│   ├── core/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# ⚙️ Environment Variables

## Backend `.env`

```env
SECRET_KEY=your_secret_key

DEBUG=True

DATABASE_URL=your_neon_database_url
```

## Frontend `.env`

```env
VITE_API_URL=https://ai-resume-analyzer-mu-coral.vercel.app/
```

---

# 🔧 Backend Setup

## Clone Repository

```bash
git clone https://github.com/dharmikdipali9-ai/ai-resume-analyzer.git
```

## Navigate to Backend

```bash
cd backend
```

## Create Virtual Environment

```bash
python -m venv venv
```

## Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux/Mac

```bash
source venv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Run Migrations

```bash
python manage.py migrate
```

## Start Backend Server

```bash
python manage.py runserver
```

---

# 🎨 Frontend Setup

## Navigate to Frontend

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

---

# 🌐 API Endpoints

## Authentication

```text
/api/users/register/
/api/users/login/
/api/users/refresh/
```

## Resume APIs

```text
/api/resumes/
/api/ai/
/api/interview/
/api/resume-builder/
```

---

# 🔐 Authentication

This project uses JWT Authentication with:
- Access Tokens
- Refresh Tokens
- Axios Interceptors
- Automatic Token Refresh

---

# 📦 Deployment

## Frontend Deployment
Deployed using:
- Vercel

## Backend Deployment
Deployed using:
- Render

## Database
Hosted on:
- Neon PostgreSQL

---

# 📸 Future Improvements

- Email Notifications
- Admin Dashboard

---

# 👩‍💻 Author

Dipali Dharmik

- GitHub: https://github.com/dharmikdipali9-ai

---

# ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub.
