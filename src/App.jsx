import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";       // <-- Added About Us page import
import ContactUs from "./pages/ContactUs";   // <-- Added Contact Us page import

// Student Pages
import Courses from "./pages/student/Courses";
import MyEnrollments from "./pages/student/MyEnrollments";
import AIAdvisor from "./pages/student/AIAdvisor";

// Instructor Pages
import InstructorDashboard from "./pages/instructor/Dashboard";
import CreateCourse from "./pages/instructor/CreateCourse";
import EditCourse from "./pages/instructor/EditCourse";
import CourseDetails from "./pages/instructor/CourseDetails";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-sm text-slate-600">Loading session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Public Info Pages */}
            <Route path="/about" element={<AboutUs />} />      
            <Route path="/contact" element={<ContactUs />} />   

            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />

            <Route 
              path="/courses" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Courses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-enrollments" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <MyEnrollments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ai-advisor" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <AIAdvisor />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/courses/:id" 
              element={
                <ProtectedRoute allowedRoles={['instructor', 'student']}>
                  <CourseDetails />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['instructor']}>
                  <InstructorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-course" 
              element={
                <ProtectedRoute allowedRoles={['instructor']}>
                  <CreateCourse />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit-course/:id" 
              element={
                <ProtectedRoute allowedRoles={['instructor']}>
                  <EditCourse />
                </ProtectedRoute>
              } 
            />

            <Route
              path="*"
              element={
                <div className="flex h-[calc(100vh-72px)] items-center justify-center px-4 bg-slate-50">
                  <div className="text-center max-w-md bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100">
                    <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">404</h1>
                    <p className="mt-4 text-xl font-bold text-slate-800">Page not found</p>
                    <p className="mt-1.5 text-sm font-medium text-slate-500">Sorry, the page you are looking for doesn't exist or has been moved.</p>
                    <Link
                      to="/"
                      className="mt-8 inline-block rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:scale-105 active:scale-95"
                    >
                      Back to Home
                    </Link>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;