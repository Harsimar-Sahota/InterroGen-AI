# 🎯 InterroGen AI
### AI-Powered Interview Preparation Platform (MERN + Gemini)

**InterroGen AI** is a full-stack interview preparation platform designed to help candidates prepare smarter — not harder — using AI-generated interview questions, answers, and concept explanations tailored to their **job role and experience level**.

Unlike static question banks, InterroGen adapts to the user’s background and learning pace, making interview preparation **structured, interactive, and personalized**.

---

##  Highlights

- AI-generated interview questions & answers using **Google Gemini**
- JWT-based authentication with protected routes
- Role-based interview sessions (role + experience driven)
- Pin & organize important questions for focused revision
- On-demand AI explanations to understand *why* an answer works
- MongoDB-backed persistence for sessions and notes
- Clean, responsive UI built with **React + TailwindCSS**

> This project emphasizes **learning experience design**, **AI integration**, and **real-world backend workflows**.

---

## 🌐 Live Application

🔗 Live URL: https://www.interrogenai.dev/

🔐 Demo Access  
You can log in using the demo account below or create your own account to explore all features.

Email: demo@interrogenai.dev  
Password: demo123

---

## 🖼️ Screenshots

(to be added soon!!!)

- Landing Page  
- Dashboard (Sessions Overview)  
- Interview Q&A View  
- AI Concept Explanation Panel  

---

## 🧠 Problem This Project Solves

Most interview preparation platforms are:

- Static  
- Generic  
- Overwhelming  

**InterroGen AI** solves this by:

- Generating **role-specific interview questions**
- Letting users **expand answers only when needed**
- Encouraging **active learning instead of memorization**
- Keeping preparation organized across multiple sessions

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React (Vite), TailwindCSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| AI Engine | Google Gemini API |
| Authentication | JWT + bcrypt |
| State Management | React Context API |
| Testing | Jest |
| Configuration | dotenv |

---

## ✨ Core Features

### 🔐 Authentication
- Secure signup & login
- JWT-protected APIs
- Profile image upload support

### 🎯 Interview Sessions
- Create sessions by role & experience
- Fetch, revisit, and delete sessions
- Persistent MongoDB storage

### 🧠 AI-Powered Learning
- Generate interview questions & answers
- Expand explanations on demand
- Learn *why* an answer is correct

### 📌 Organization Tools
- Pin important questions
- Accordion-based learning UI
- Clean, distraction-free experience

---

## 🏗️ Architecture Overview

Client (React + Vite)
- Authentication
- Session management
- Interview Q&A interface
- AI explanation requests

Backend (Node + Express)
- Auth APIs (JWT)
- Session APIs
- Question APIs
- AI generation APIs

Database (MongoDB)
- Users
- Sessions
- Questions

---

## 📂 Project Structure

```text
InterroGen-AI/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   └── interview-prep-ai/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── context/
│       │   ├── utils/
│       │   └── App.jsx
│       ├── public/
│       └── vite.config.js
│
├── .env.example
└── README.md
```
## ⚙️ Local Setup

### Backend Setup

Go to the backend folder and install dependencies:

cd backend
npm install
npm run dev

Create a .env file inside the backend folder with the following values:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=8000

---

### Frontend Setup

Go to the frontend folder and install dependencies:

cd frontend/interview-prep-ai
npm install
npm run dev

The application runs at:

http://localhost:5173

Note: The port may vary if another app is already using 5173.

---

## 🧪 Testing

Backend unit tests are written using Jest.

Covered areas include:
- Authentication logic
- Utility functions
- API behavior validation

Run tests using:

cd backend
npm run test

---

## 📈 Future Improvements (Planned)

The following items are planned design improvements and are not yet implemented:

- Rate limiting on AI endpoints
- Background job queues for heavy AI calls
- Caching frequently accessed sessions
- Dockerized deployment setup
- CI/CD pipeline integration

---

## 🔐 Security Practices

This project follows standard backend security practices:
- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Environment-based secrets
- No credentials committed to the repository

---
## 💡 Inspiration

Inspired by **Y Combinator’s RFS** (Request for Startups) focusing on **Vertical SaaS and AI tools for real-world workflows**.

This project aligns with the idea of building practical, focused AI products that help users solve real problems efficiently rather than generic, one-size-fits-all solutions.
---
## 👨‍💻 Author

Harsimar Preet Singh Sahota  
Full-Stack Developer — MERN + AI  

GitHub: https://github.com/Harsimar-Sahota  
LinkedIn: https://linkedin.com/in/Harsimar-Sahota  
#This project is undder construction, it will be updated soon.
---

## 🪪 License

This project is open-source under the MIT License.
