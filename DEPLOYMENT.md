# Deployment Guide

## 1. Backend Deployment (Render.com)
1.  **Create a New Web Service**: Connect your GitHub repository.
2.  **Root Directory**: Set to `backend`.
3.  **Build Command**: `npm install && npm run build`
4.  **Start Command**: `npm start`
5.  **Environment Variables**:
    *   `NODE_ENV`: `production`
    *   `MONGODB_URI`: Your production MongoDB Atlas Connection String.
    *   `JWT_SECRET`: A strong random string.
    *   `JWT_EXPIRES_IN`: `30d`

## 2. Frontend Deployment (Vercel)
1.  **Import Project**: Select your repository on Vercel Dashboard.
2.  **Root Directory**: Set to `frontend`.
3.  **Build Command**: `npm run build` (Default)
4.  **Output Directory**: `dist` (Default)
5.  **Environment Variables**:
    *   `VITE_API_URL`: The URL of your deployed Backend (e.g., `https://your-backend.onrender.com/api`)
    *   **Note**: Do not add a trailing slash if not needed, but ensure it matches the format `.../api` if that is where your endpoints live.

## 3. Verify Deployment
1.  Open your Vercel URL.
2.  Register a new user (this verifies API connection and Database write).
3.  Check the "Network" tab in DevTools if you see connection errors.
