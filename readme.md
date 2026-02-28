# MasterCode 🚀

MasterCode is a high-performance, full-stack competitive programming platform designed to help developers sharpen their algorithmic skills. It features a custom-built IDE, real-time code execution via Judge0, and a comprehensive problem management system.

## ✨ Features

### 💻 Interactive Coding Arena

- **Multi-language Support**: Write and execute solutions in **Python**, **JavaScript**, and **Java**.
- **Real-time Feedback**: Integrated with Judge0 to provide instant results on test cases, including memory usage and execution time.
- **Starter Templates**: Automatically provides boilerplates for different languages.

### 📚 Problem Management

- **Curated Challenges**: Browse problems categorized by difficulty (Easy, Medium, Hard).
- **Personalized Playlists**: Organize favorite problems into custom collections for targeted practice.
- **Admin Dashboard**: Specialized tools for administrators to create, update, and validate new coding challenges with reference solutions.

### 👤 User Experience

- **Detailed Profiles**: Track your "Arena Victories" (solved problems) and execution history.
- **Smart Authentication**: Secure JWT-based authentication with persistent sessions.
- **Themed UI**: Modern, responsive interface with animated light and dark mode support.

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4 & Shadcn UI
- **State/Auth**: React Context API & Server Actions
- **Editor**: Monaco Editor (VS Code core)

### Backend

- **Runtime**: Node.js & Express
- **Database**: PostgreSQL (Managed via Neon DB)
- **ORM**: Prisma 7
- **Execution**: Judge0 API (via RapidAPI)
- **Security**: JWT & Bcrypt.js

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- A PostgreSQL database instance (or a Neon DB account)
- Judge0 API credentials from RapidAPI

### Installation

1. **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/mastercode.git](https://github.com/your-username/mastercode.git)
    cd mastercode
    ```
2. **Backend Setup**

    ```bash
     cd backend
     npm install
    ```

    Create a `.env` file in the `backend` folder:

    ```
    DATABASE_URL="postgresql://..."
    JWT_SECRET="your_secret_key"
    FRONT_END_URL="http://localhost:3000"
    JUDGE0_API_URL=""
    RAPIDAPI_KEY="your_api_key"
    RAPIDAPI_HOST="judge0-extra-ce.p.rapidapi.com"
    ```

    Initialize the database:

    ```bash
    npx prisma generate
    npx prisma migrate dev
    ```

3. **Frontend Setup**

    ```bash
    cd ../frontend
    npm install
    ```

    Create a `.env` file in the `frontend` folder:

    ```
    NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
    ```

4. **Run the Application**
    - Start Backend: npm run dev (inside /backend)

    - Start Frontend: npm run dev (inside /frontend)
