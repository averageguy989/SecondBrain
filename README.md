# Second Brain - A Content Management and Curation Platform

Welcome to **Second Brain**, a full-stack web application designed to help you save, organize, and manage your digital content. Whether it's articles, videos, podcasts, or tutorials, this platform provides a centralized place to curate your personal knowledge base.

![Dashboard Preview]
Check out te website
https://second-brain-54wn.vercel.app/ <!-- It's a good idea to add a screenshot of your app here! -->

---

## ✨ Key Features

- **User Authentication**: Secure sign-up, sign-in, and sign-out functionality using JWT.
- **Content Creation**: A rich form to create new content, including a title, link, type, and tags.
- **Content Dashboard**: A paginated, responsive dashboard that displays all public content in a clean, two-column grid.
- **Personal Content Page**: A dedicated page (`/mycontent`) for users to view, manage, edit, and delete their own content.
- **Tag-Based Search**: A powerful search bar on the dashboard to instantly filter content by one or more tags.
- **Public/Private Visibility**: Users can choose to make their content public (visible to everyone) or private (visible only to them).
- **Profile Management**: A profile page where users can view and update their information.

---

## 🛠️ Tech Stack

This project is a full-stack application built with a modern technology stack.

-   **Frontend**:
    -   **React**: A JavaScript library for building user interfaces.
    -   **TypeScript**: Adds static typing to JavaScript to improve code quality and maintainability.
    -   **React Router**: For declarative routing and navigation within the application.
    -   **Axios**: A promise-based HTTP client for making API requests to the backend.
    -   **CSS**: Custom CSS for modern, responsive styling.

-   **Backend**:
    -   **Node.js**: A JavaScript runtime for building the server-side application.
    -   **Express.js** (or similar framework): A minimal and flexible Node.js web application framework.
    -   **Prisma**: A next-generation ORM for Node.js and TypeScript.
    -   **SQLite**: Used as the database for development.

---

## 📂 Project Structure

The repository is organized into two main directories:

```
/
├── backend/      # Contains the Node.js, Express, and Prisma backend
└── frontend/      # Contains the React and TypeScript frontend
```

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

Make sure you have the following installed on your system:

-   [Node.js](https://nodejs.org/en/) (v16 or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Set up the Backend:**
    ```bash
    cd backend
    npm install
    ```
    - Create a `.env` file in the `backend` directory and add your environment variables.
    ```env
    DATABASE_URL="file:./dev.db"
    ACCESS_SECRET="development"
    REFRESH_SECRET="webdevelopment"
    NODE_ENV = "development"
    PORT=5000
    ```
    - Initialize the Prisma database:
    ```bash
    npx prisma migrate dev --name init
    ```

3.  **Set up the Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```
    - Create a `.env` file in the `frontend` directory and add the backend API URL.
    ```env
    REACT_APP_API_URL=http://localhost:3000/api/auth
    ```
    *(Note: If you are not using Vite, you may need to name the variable `REACT_APP_API_URL`)*

---

## ▶️ Running the Application

To run the application, you'll need to start both the backend and frontend servers in separate terminal windows.

1.  **Start the Backend Server:**
    - Navigate to the `backend` directory:
    ```bash
    cd backend
    npm run dev
    ```
    The backend server should now be running on `http://localhost:5000`.

2.  **Start the Frontend Server:**
    - Navigate to the `frontend` directory:
    ```bash
    cd frontend
    npm run dev
    ```
    The frontend development server will start, and you can access the application at `http://localhost:3000` (or another port if 3000 is in use). 