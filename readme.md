# MasterCode

MasterCode is a high-performance, full-stack competitive programming platform designed to help developers sharpen their algorithmic skills. It features a custom-built IDE, real-time code execution via Judge0, and a comprehensive problem management system optimized with a Redis caching layer.

**🔗 [Live Demo](https://mastercode.mohitchamolla.site)**

---

![Project Preview](/frontend/public/home.png)

---

## ✨ Features

### 💻 Interactive Coding Arena

- **Multi-language Support**: Write and execute solutions in **Python**, **JavaScript**, and **Java**.
- **Real-time Feedback**: Integrated with Judge0 to provide instant results on test cases, including memory usage and execution time.
- **Starter Templates**: Automatically provides boilerplates for different languages.

### 📚 Problem Management

- **Curated Challenges**: Browse problems categorized by difficulty (Easy, Medium, Hard).
- **Admin Dashboard**: Specialized tools for administrators to create, update, and validate new coding challenges with reference solutions.
- **Performance Caching**: Problem lists are cached in Redis to ensure page loads fast and significantly reduced database strain.

### 👤 User Experience

- **Detailed Profiles**: Track your "Arena Victories" (solved problems) and execution history.
- **Smart Authentication**: Secure JWT-based authentication with persistent sessions.
- **Themed UI**: Modern, responsive interface with animated light and dark mode support.

---

## 📸 Screenshots

|                Coding Arena                 |                  Problem List                  |                 Profile                  |
| :-----------------------------------------: | :--------------------------------------------: | :--------------------------------------: |
| ![Arena](/frontend/public/coding-arena.png) | ![Problems](/frontend/public/problem-list.png) | ![Profile](/frontend/public/profile.png) |

---

## 🚀 Architecture Optimizations

To handle high traffic and frequent reloads, MasterCode implements the **Cache-Aside (Lazy Loading)** pattern:

- **Intelligent Reads**: The `getAllProblems` endpoint first queries **Redis**. On a cache miss, it fetches from **PostgreSQL**, populates Redis with a 1-hour TTL, and returns the result.
- **Write-Through Invalidation**: When an administrator creates, updates, or deletes a problem, the system automatically triggers a `redis.del("problems:all")`. This ensures users see fresh content immediately while maintaining maximum read performance.

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4 & Shadcn UI
- **Editor**: Monaco Editor (VS Code core)

### Backend

- **Runtime**: Node.js & Express
- **Caching**: **Redis (ioredis)**
- **Database**: PostgreSQL (Managed via Neon DB)
- **ORM**: Prisma 7
- **Execution**: Judge0 API (via RapidAPI)
- **Security**: JWT & Bcrypt.js

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- A PostgreSQL database instance
- **Redis Server** (Local instance or Upstash)
- Judge0 API credentials from RapidAPI

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/chamollamohit/mastercode
    cd mastercode
    ```

2. **Backend Setup**

    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` folder:

    ```env
    DATABASE_URL="postgresql://..."
    JWT_SECRET="your_secret_key"
    FRONT_END_URL="http://localhost:3000"
    REDIS_URL="your_redis_url"
    JUDGE0_API_URL=""
    RAPIDAPI_KEY="your_api_key"
    RAPIDAPI_HOST=""
    ```

    Initialize the database:

    ```bash
    npx prisma generate
    npx prisma db push
    ```

3. **Frontend Setup**

    ```bash
    cd ../frontend
    npm install
    ```

    Create a `.env` file in the `frontend` folder:

    ```env
    NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
    ```

4. **Run the Application**
    - **Start Redis**: Ensure `redis-server` is running locally.
    - **Start Backend**: `npm run dev` (inside `/backend`)
    - **Start Frontend**: `npm run dev` (inside `/frontend`)
