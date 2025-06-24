# OatMeal Project

A full-stack web application with React frontend and Django backend.

## Project Structure

```
oatmeal/
├── frontend/          # React + Vite frontend
├── backend/           # Django backend
├── docker-compose.yml # Docker orchestration
└── README.md         # This file
```

## Prerequisites

- Docker
- Docker Compose

## Getting Started with Docker

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd oatmeal
```

### 2. Build and run with Docker Compose
```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

### 3. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

### 4. Stop the services
```bash
# Stop services
docker-compose down

# Stop services and remove volumes
docker-compose down -v
```

## Development Commands

### View logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs frontend
docker-compose logs backend
```

### Rebuild specific service
```bash
# Rebuild frontend
docker-compose build frontend

# Rebuild backend
docker-compose build backend
```

### Run commands in containers
```bash
# Run Django commands
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py collectstatic

# Install new npm packages
docker-compose exec frontend npm install <package-name>
```

## Services

### Frontend (React + Vite)
- **Port**: 3000
- **Technology**: React 19, Vite, React Router
- **Hot reload**: Enabled in development

### Backend (Django)
- **Port**: 8000
- **Technology**: Django, Django REST Framework
- **Database**: Azure SQL Server
- **CORS**: Enabled for frontend communication

## Environment Variables

The Docker setup uses environment variables defined in the docker-compose.yml file. For production, create appropriate `.env` files or use Docker secrets.

## Database

The application uses Azure SQL Server as configured in the Django settings. Make sure your database is accessible from the Docker containers.

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000 and 8000 are not being used by other applications
2. **Database connection**: Ensure Azure SQL Server allows connections from your Docker host
3. **Volume permissions**: On some systems, you might need to adjust volume permissions

### Reset Everything
```bash
# Stop all containers and remove everything
docker-compose down -v --remove-orphans

# Remove all Docker images for this project
docker system prune -a

# Rebuild from scratch
docker-compose up --build
```

## Production Deployment

For production deployment, modify the docker-compose.yml to:
- Use production builds
- Set proper environment variables
- Configure reverse proxy (nginx)
- Set up SSL certificates
- Use Docker secrets for sensitive data 