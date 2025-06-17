Project Overview
A full-stack web application built with React (frontend) and FastAPI (backend) using MySQL for data storage.
Project Structure
OatMeal/

├── backend/             # FastAPI backend

├── frontend/            # React frontend

├── README.md
Requirements
- Node.js (v18+ recommended)
- Python 3.9+
- pip (Python package manager)
- MySQL or MySQL Workbench
- Git
First-Time Setup (Mac & Windows)
1. Clone the Repository
```bash
git clone https://github.com/RakeshEletii/OatMeal.git
cd OatMeal
```
Frontend Setup (React)
**macOS / Linux:**
```bash
cd frontend
npm install
npm run dev
```

**Windows (PowerShell):**
```powershell
cd frontend
npm install
npm run dev
```
Backend Setup (FastAPI)
**macOS / Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework mssql-django django-cors-headers
python manage.py migrate    
python manage.py runserver  
```

**Windows (PowerShell):**
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install django djangorestframework mssql-django django-cors-headers
python manage.py migrate    
python manage.py runserver  
```
Regular Usage (After Initial Setup)
**Frontend:**
```bash
cd frontend
npm run dev
```

**Backend (macOS / Linux):**
```bash
cd backend
source venv/bin/activate
python manage.py runserver  
```

**Backend (Windows):**
```powershell
cd backend
.\venv\Scripts\activate
python manage.py runserver  
```
Environment Variables
If required, create a `.env` file inside `backend/` and/or `frontend/` with values like:

```
# Example .env
DATABASE_URL=mysql://username:password@localhost:3306/dbname
SECRET_KEY=your_secret_key
```
API Testing
You can test API endpoints at:

http://127.0.0.1:8000/docs   # Swagger UI
Contribution Guide
1. Fork the repo
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit (`git commit -m "Your message"`)
5. Push (`git push origin feature-name`)
6. Create a Pull Request
# OatMeal
