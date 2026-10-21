# Task Manager

A modern, responsive full-stack task management application designed to help users organize tasks, manage projects, track progress, and stay on top of upcoming deadlines.

Built with **React, TypeScript, Spring Boot, and PostgreSQL**, Task Manager provides a streamlined productivity experience across desktop, tablet, and mobile devices.

## Live Demo

**Application:** [https://app.task-manager.top](https://app.task-manager.top)

> **Note:** The backend is currently hosted on Render's free tier. The first request may take longer due to server inactivity.

## Features

### Authentication & Account Management

- User registration and login
- Secure authentication with refresh tokens
- Remember Me functionality
- Password recovery and reset
- Account profile management
- User-specific access to tasks and projects

### Task Management

- Create, view, edit, duplicate, complete, and delete tasks
- Assign tasks to projects
- Set priorities, statuses, and due dates
- Search and filter tasks
- Track overdue tasks
- Paginated task listings

### Project Management

- Create, view, edit, and delete projects
- Organize tasks by project
- Track project completion progress
- Monitor project deadlines and status

### Dashboard

- Task statistics and completion overview
- Project progress tracking
- Recent tasks
- Upcoming deadlines
- Responsive dashboard widgets

### User Experience

- Responsive layouts for desktop, tablet, and mobile
- Light and dark mode
- Multilingual support: English, Filipino, and Japanese
- Skeleton loading states
- Toast notifications

## Tech Stack

| Category             | Technologies            |
| -------------------- | ----------------------- |
| Frontend             | React, TypeScript, Vite |
| Styling              | Tailwind CSS            |
| Routing              | React Router            |
| HTTP Client          | Axios                   |
| Internationalization | react-i18next           |
| Backend              | Java, Spring Boot       |
| Security             | Spring Security         |
| Database             | PostgreSQL (Neon)       |
| Media Storage        | Cloudinary              |
| Email Service        | Resend                  |
| Frontend Deployment  | Vercel                  |
| Backend Deployment   | Render                  |

## Architecture

Task Manager follows a **client-server architecture**, with independently deployed frontend and backend services.

### Frontend

- Component-based architecture using React
- Reusable UI components
- Custom hooks for state management and API operations
- Dedicated API service modules
- Feature-based component organization

### Backend

- Layered architecture using Spring Boot
- REST controllers for HTTP requests
- Service layer for business logic
- Repository layer for database operations
- DTOs for request and response handling
- Spring Security for authentication and authorization

## Security

- Protected routes and authenticated API requests
- Refresh token handling
- User-specific authorization for tasks and projects
- Backend request validation
- API request and response encryption

## Future Improvements

- Additional productivity features
- Improved accessibility and user experience
- Performance optimizations
- Expanded testing coverage

## Version

**Current Version:** `1.3.1`

## About

Task Manager is a full-stack portfolio project developed to demonstrate modern frontend development, backend API design, authentication and authorization, database management, and responsive user interface design.
