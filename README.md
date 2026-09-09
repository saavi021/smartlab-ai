# 🩺 SmartLab AI

An AI-powered full-stack web application that analyzes blood test reports in PDF format and presents laboratory values in a structured, easy-to-understand format.

## 🌐 Live Demo

**Frontend:** https://smartlab-ai.vercel.app

**Backend:** https://smartlab-ai-2.onrender.com

---

## ✨ Features

- 🔐 User Signup & Login
- 🔒 JWT Authentication
- 🔑 Password Hashing with bcrypt
- 📄 Upload Blood Report PDFs
- 📑 PDF Text Extraction
- 🧪 Laboratory Value Parsing
- 📊 Reference Range Comparison
- 💡 AI-generated Explanations
- 🗂️ Report History
- 👀 View Saved Reports
- ☁️ MongoDB Atlas Database
- 📱 Responsive User Interface
- ⏳ Loading & Error Handling

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- JavaScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt
- Multer
- PDF Parsing

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 🏗 System Architecture

```text
                React Frontend (Vercel)
                         │
                         ▼
              Express Backend (Render)
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
 Authentication                  Report Analysis
 (JWT + bcrypt)              (PDF Parser + AI Logic)
          │                             │
          └──────────────┬──────────────┘
                         ▼
                 MongoDB Atlas Database
```

---

## 📂 Project Structure

```
smartlab-ai/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── server.js
│
└── README.md
```

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/saavi021/smartlab-ai.git
cd smartlab-ai
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

Run:

```bash
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Screenshots

Coming soon...

- Home Page
- Login
- Upload Report
- Report Analysis
- Report History

---

## 🔮 Future Improvements

- AI recommendations using an LLM
- Doctor dashboard
- Patient profile management
- Trend analysis across reports
- Email notifications
- Multi-language support

---

## 👩‍💻 Author

**Saavi Singal**

GitHub: https://github.com/saavi021