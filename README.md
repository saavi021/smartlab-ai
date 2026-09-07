# SmartLab AI

SmartLab AI is a full-stack web application for analyzing laboratory reports in PDF format and presenting the reported values in a structured, easy-to-understand format.

## Features

- User signup and login
- JWT authentication
- Password hashing
- Protected API routes
- PDF report upload
- PDF text extraction
- Laboratory value parsing
- Reference range comparison
- Simple explanations for reported values
- MongoDB Atlas persistence
- Report history
- View saved reports
- Responsive React interface
- Loading and error states

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- JavaScript

### Backend
- Node.js
- Express.js
- Multer
- PDF parsing
- JWT
- bcrypt

### Database
- MongoDB Atlas
- Mongoose

## Architecture

```text
React Frontend
      |
      v
Express Backend
      |
      +------------------+
      |                  |
      v                  v
Authentication       Report Routes
      |                  |
      v                  v
JWT / bcrypt       PDF Parser / Analysis
                         |
                         v
                      MongoDB