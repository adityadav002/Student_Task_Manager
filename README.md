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

Open index.html using Live Server or browser:
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

(Screenshot showing tasks added successfully)
📸 screenshots/tasks-added.png

✅ API Working (GET & POST Requests)

(Screenshot of API requests in Postman / Browser)
📸 screenshots/api-working.png

✅ Delete Task Feature

(Screenshot showing task deletion working)

📸 screenshots/delete-task.png
Screenshots are embedded in the repository to prove correct project execution.

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

Backend: Node.js, Express.js

Database: SQLite (better-sqlite3)

Tools: Git, Live Server, Postman
