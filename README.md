# LearnHub Frontend

LearnHub is a React-based learning management system frontend for students and instructors. It provides a responsive course discovery experience, authenticated role-based navigation, instructor course management, enrollment tracking, and an AI-powered course and career advisor.

This repository contains the Vite frontend application. It communicates with the LearnHub backend through a shared Axios client and stores the authenticated user session in browser `localStorage`.

## Features

### Public experience

- Responsive LearnHub landing page with role-aware hero content and carousel slides.
- About and Contact pages.
- Login and registration flows with student/instructor role selection.
- Automatic redirect protection for authenticated and unauthenticated routes.
- Responsive navigation bar, profile menu, mobile menu, and footer.

### Student experience

- Browse the available course catalog.
- View course descriptions, categories, instructors, and syllabus content.
- Enroll in courses from the catalog or course details page.
- View current enrollments in the My Learning page.
- Ask the AI Advisor for personalized career paths and course recommendations.
- Open course links returned by the AI Advisor directly from the conversation.
- See remaining AI advisor requests when the backend provides usage information.

### Instructor experience

- Instructor dashboard for courses owned by the signed-in instructor.
- Create and publish courses with a title, category, description, and syllabus/content.
- Edit existing courses.
- Delete courses with confirmation.
- View the students enrolled in each course, including names, email addresses, and enrollment dates.
- Success and error feedback through top-sliding notification banners.

## Tech Stack

- **React 19** for the component-based user interface.
- **Vite 8** for development, bundling, and production builds.
- **Tailwind CSS 4** through `@tailwindcss/vite` for styling.
- **React Router DOM 7** for client-side routing and protected routes.
- **Axios** for HTTP requests to the backend API.
- **Lucide React** for interface icons.
- **ESLint** with React Hooks and React Refresh plugins for code quality checks.

## Requirements

- Node.js and npm.
- A running LearnHub backend for local API requests.

The frontend currently expects the local backend at `http://localhost:5000`. Confirm that the backend is running on that port before testing login, registration, course operations, enrollment, or AI features.

## Installation and Local Development

1. Clone the repository:

	```bash
	git clone <repository-url>
	cd lms-frontend
	```

2. Install dependencies:

	```bash
	npm install
	```

3. Start the Vite development server:

	```bash
	npm run dev
	```

4. Open the local URL printed by Vite, normally `http://localhost:5173`.

The available npm scripts are:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot module replacement. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the project. |

## API Configuration

API configuration is handled automatically in `src/api/axios.js`.

| Build mode | API base URL |
| --- | --- |
| Local development (`npm run dev`) | `http://localhost:5000/api` |
| Production build (`npm run build`) | `https://lms-backend-production-8f33.up.railway.app/api` |

The frontend does not currently read a custom API URL from a `.env` file. Vite’s `import.meta.env.PROD` flag selects the production Railway URL for production builds and the localhost URL during development.

For authenticated requests, the Axios request interceptor reads the `user` object from `localStorage` and sends its JWT as:

```http
Authorization: Bearer <token>
```

The backend must return the authenticated user object, including its token and role, from the login and registration endpoints. The frontend stores that object under the `user` key.

## Application Routes

Routes are declared in `src/App.jsx`.

| Path | Access | Page / purpose |
| --- | --- | --- |
| `/` | Public | Home page with hero carousel, feature highlights, and call to action. |
| `/about` | Public | LearnHub mission, values, and platform highlights. |
| `/contact` | Public | Contact information and client-side validated contact form. |
| `/login` | Guest only | Sign in with email and password. Authenticated users redirect home. |
| `/register` | Guest only | Create a student or instructor account. |
| `/courses` | Student | Browse courses and enroll. |
| `/my-enrollments` | Student | View enrolled courses. |
| `/ai-advisor` | Student | Chat with the AI course and career advisor. |
| `/courses/:id` | Student or instructor | View course details and perform role-appropriate actions. |
| `/dashboard` | Instructor | Manage courses created by the instructor. |
| `/create-course` | Instructor | Publish a new course. |
| `/edit-course/:id` | Instructor | Update an existing course. |
| `/courses/:id/students` | Instructor | View students enrolled in a course. |

`ProtectedRoute` checks authentication and allowed roles before rendering protected pages. Unknown paths render the built-in 404 page.

## Backend API Calls

The frontend uses the Axios base URL described above, so the paths below are relative to `/api`.

### Authentication

| Method | Endpoint | Used by |
| --- | --- | --- |
| `POST` | `/auth/login` | Login page |
| `POST` | `/auth/register` | Registration page |

### Courses and enrollments

| Method | Endpoint | Used by |
| --- | --- | --- |
| `GET` | `/courses` | Course catalog and course details lookup |
| `GET` | `/courses/:id` | Course editing form |
| `POST` | `/courses` | Create course form |
| `PUT` | `/courses/:id` | Edit course form |
| `DELETE` | `/courses/:id` | Instructor dashboard and course details |
| `GET` | `/courses/my-courses` | Instructor dashboard |
| `GET` | `/courses/my-enrollments` | Student course catalog, course details, and My Enrollments |
| `POST` | `/courses/:id/enroll` | Student course catalog and course details |
| `GET` | `/courses/:id/students` | Instructor enrolled-students page |

### AI advisor

| Method | Endpoint | Used by |
| --- | --- | --- |
| `GET` | `/ai/usage` | AI Advisor request-limit display |
| `POST` | `/ai/recommendations` | AI Advisor chat messages |

The AI Advisor reads a recommendation or message field from the response and recognizes course references in the format `(ID: <24-character MongoDB id>)` so they can be rendered as course links.

### Contact form

The Contact page currently validates the form in the browser and simulates a one-second submission delay. The API call to `POST /contact` is present only as commented integration code, so no contact request is currently sent to the backend.

## Project Structure

```text
src/
├── api/
│   └── axios.js              # Axios instance, base URL selection, JWT interceptor
├── assets/                   # Static frontend assets
├── components/               # Shared UI and home page sections
│   └── home/                 # Hero, feature grid, and CTA sections
├── context/
│   └── AuthContext.jsx       # Authentication state, login, logout, persistence
├── pages/                    # Public pages and role-specific workflows
│   ├── instructor/           # Dashboard, CRUD forms, details, enrolled students
│   └── student/              # Courses, enrollments, and AI Advisor
├── App.jsx                   # BrowserRouter, routes, route guards, shell layout
├── App.css                   # Application-level styles
├── index.css                 # Global styles and Tailwind entry point
└── main.jsx                  # React entry point and AuthProvider setup
```

Reusable UI includes `Navbar`, `Footer`, `CourseCard`, `Button`, and `Input`. The `AuthProvider` wraps the application and restores the user from `localStorage` when the app starts.

## Production Build

Build and locally preview the production bundle with:

```bash
npm run build
npm run preview
```

The generated static files are written to `dist/`.

## Deployment on Vercel

1. Push the frontend repository to GitHub, GitLab, or Bitbucket.
2. Import the repository into [Vercel](https://vercel.com/).
3. Keep the framework preset as **Vite**.
4. Use the following build settings unless your Vercel project already defines them:

	- **Install command:** `npm install`
	- **Build command:** `npm run build`
	- **Output directory:** `dist`

5. Deploy the project.

Production builds automatically use the configured Railway backend URL because `import.meta.env.PROD` is true in the Vercel build environment. Ensure the backend allows the deployed Vercel origin through its CORS configuration.

Because this is a browser-routed single-page application, configure Vercel to serve the application entry point for direct navigation to client routes such as `/courses` or `/dashboard` if the deployment returns 404 responses for those paths. The repository currently contains no Vercel-specific rewrite configuration, so this should be checked in the Vercel project settings or added as deployment configuration when required.

## Authentication and Roles

LearnHub supports two roles:

- **Student:** course browsing, enrollment, My Learning, and AI Advisor access.
- **Instructor:** course creation, editing, deletion, and enrolled-student management.

The login and registration responses are stored in `localStorage` as `user`. Logging out removes that value and clears the in-memory authentication state. Route guards redirect unauthenticated users to `/login` and users without the required role to `/`.

## Notes for Contributors

- Keep API paths relative to the Axios instance base URL.
- Preserve the role names `student` and `instructor` when working with route guards and navigation.
- Run `npm run lint` and `npm run build` before opening a pull request.
- Do not commit secrets or tokens to the repository. If API configuration is later made environment-driven, use Vite variables prefixed with `VITE_`.
