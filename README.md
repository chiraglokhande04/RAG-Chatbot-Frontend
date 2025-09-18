
---

# 📌 **Frontend README (React + SCSS)**


# 📰 RAG-Powered News Chatbot – Frontend


This is the **frontend** React app for the RAG-powered news chatbot.  
It provides a **chat screen UI** for users to interact with the bot.

---

## 🚀 Features
- Chat interface with:
  - Display of past messages
  - Input box for new queries
  - Bot responses (typed-out effect)
  - Reset session button
- SCSS styling for clean UI
- Communicates with backend (REST API)

---

## 🛠️ Tech Stack
- **Frontend Framework**: React (Vite)
- **Styling**: SCSS
- **State Management**: React Hooks
- **API Calls**: Axios

---

## 📂 Project Structure
```
frontend/
src/
components/
ChatScreen.jsx # Main chat UI
Message.jsx # Single message bubble
styles/
chat.scss # SCSS styling
App.jsx
main.jsx
package.json
README.md
```

---

## ⚙️ Setup Instructions

```
### 1. Clone Repository
git clone https://github.com/your-username/rag-news-frontend.git
cd rag-news-frontend

### 2. Install Dependencies
npm install

### 3. Run Frontend
npm run dev
(Frontend will start at http://localhost:5173.)
```
---

## 🔗 Backend Connection
The frontend communicates with the backend API.
const API_URL = "http://localhost:4000/api";

---

## 📹 Demo Workflow
```
User opens React app.
Chat screen loads session ID (from backend).
User types query → frontend sends API request.
Bot response displayed with typed effect.
Reset button clears session.
```
---

## 🚀 Deployment
The frontend of this chatbot is deployed separately here:  
https://rag-chatbot-frontend-mu.vercel.app/
