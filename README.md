# 📝 Task Manager App

A simple, scalable task management application built with **React**, **TypeScript**, and **Node.js**, and deployed using **Zoho Catalyst**. The app allows users to create, view, update, and delete tasks, with optional enhancements such as filtering, searching and multi-user.

---

## 🚀 Live Demo

[Access the Live Application Here](https://task-manager-app-60043319872.development.catalystserverless.in/app/)  

---

## 📦 Tech Stack

- **Frontend:** React + TypeScript
- **Backend:** Node.js (Express)
- **Database:** Zoho Catalyst Data Store / ZCQL
- **Hosting & Serverless:** Zoho Catalyst
- **API Requests:** Axios

---

## 📌 Features

- Create, view, update, and delete tasks
- Tasks have title, description, and status (pending/completed)
- Form validation and error feedback
- Responsive UI with intuitive UX
- RESTful API with full CRUD operations
- Deployed frontend and backend using Zoho Catalyst

### ✅ Bonus Features (if implemented)

- Filter tasks by status (completed/pending)
- Search tasks by title
- Multi-user support via Catalyst Authentication.

---

## 🛠 Project Setup Instructions

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Zoho Catalyst CLI (`npm install -g catalyst-cli`)
- Zoho Catalyst account

### 1. Clone the Repository

```bash
git clone https://github.com/PRAVEEN-hub2001/Task-Manager-App-Reudan-International.git
cd Task-Manager-App-Reudan-International
```

### 2. Set Up the Frontend

```bash
cd task-manager-app
npm install
```

### 3. Set Up the Backend

```bash
cd ../functions/taskapi
npm install
```

### 4. Configure and Deploy to Zoho Catalyst

#### 1.Log in to Zoho Catalyst CLI:

```bash
catalyst login
```
#### 2.Initialize the project (if not already initialized):

```bash
catalyst init
```
#### 3.Deploy backend and frontend:

```bash
catalyst deploy
```
### 5. Set Up Catalyst Data Store

Create a Data Store table named Tasks with the following fields:
| Field Name  | Data Type  | Required | Default Value |
| ----------- | ---------- | -------- | ------------- |
| title       | Text       | Yes      | -             |
| description | Text       | No       | -             |
| status      | Text       | No       | `pending`     |
| user_id     | Bigint     | Yes      | -             |

---

## 🔧 API Endpoints (Backend)

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| GET    | `/tasks`       | Fetch all tasks          |
| POST   | `/tasks`       | Create a new task        |
| PUT    | `/tasks/:id`   | Update an existing task  |
| DELETE | `/tasks/:id`   | Delete a task            |

---

### 🧪 Development Scripts

#### Frontend (React)

```bash
cd task-manager-app
npm start
```
#### Backend (Catalyst Local Serve)

```bash
cd functions/taskManager
catalyst serve
```
