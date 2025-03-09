# DataChecks ap
 
# Bloggi - Simple Blogging Website

Bloggi is a modern blogging platform built with FastAPI and SQLAlchemy for the backend API and React.js for the frontend user interface.

## Features

- User authentication and authorization
- Create, read, update, and delete blog posts
- Comment system
- Rich text editor for creating content
- Responsive design for all devices

## Project Structure

```
bloggi/
├── Server/         # FastAPI backend
└── client/         # React.js frontend
```

## Backend Setup (FastAPI + SQLAlchemy)

### Prerequisites

- Python 3.8+
- PostgreSQL (or your preferred database)

### Installation

1. Clone the repository:
```bash
git clone [https://github.com/yourusername/bloggi.git](https://github.com/jaswindersingh97/DataChecks-ap.git)
cd server
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Add .env file for server containing:
```
# Add the files database.py, config.py, and auth.py in env
DATABASE_URL=your database connection string
SECRET_KEY=your_secret_key_here
CLOUDINARY_CLOUD_NAME=Your cloudinary cloud name
CLOUDINARY_API_KEY=Your cloudinary api key
CLOUDINARY_API_SECRET=Your cloudinary secret
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

5. Initialize the database:
```bash
python scripts/init_db.py
```

6. Start the server:
```bash
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000. API documentation is available at http://localhost:8000/docs.

## Frontend Setup (React.js)

### Prerequisites

- Node.js 14+
- npm or yarn

### Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Add .env file for client containing:
```
# Add the files api.js, auth.js, and config.js in env
REACT_APP_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm start
```

The client will be available at http://localhost:5173.

## Database Migrations

When you need to update the database schema:

```bash
cd server
alembic revision --autogenerate -m "Description of changes"
alembic upgrade head
```

## API Endpoints

- `POST /users/register` - Register a new user
- `POST /users/login` - User login
- `GET /posts` - List all posts
- `GET /posts/{id}` - Get a specific post
- `POST /posts` - Create a new post
- `PUT /posts/{id}` - Update a post
- `DELETE /posts/{id}` - Delete a post
