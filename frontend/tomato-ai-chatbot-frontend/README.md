# Tomato AI Chatbot Frontend

React + Vite frontend for the Spring Boot Tomato AI Support backend.

## Backend endpoint expected

POST http://localhost:8080/api/chat

Request:
- Content-Type: text/plain
- Body: user's message

Response:
- Content-Type: text/plain
- Body: AI reply

## Run

```bash
npm install
npm run dev
```

Open the URL shown by Vite, usually:
http://localhost:5173

Make sure the Spring Boot backend is running on port 8080.

If the browser blocks the request because of CORS, add CORS configuration to the Spring Boot backend as described in the chat response.
