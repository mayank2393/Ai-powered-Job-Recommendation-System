import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import JobList from "./pages/JobList";
import JobDetailsPage from "./pages/JobDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardSeeker from "./pages/dashboard/Seeker";
import DashboardEmployer from "./pages/dashboard/Employer";
import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import { AIProvider } from "./context/AIContext";

/**
 * Main app component with routing, global providers and layout components.
 * Uses React Router v6 for routing.
 */
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <JobProvider>
          <AIProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow bg-gray-50">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/jobs" element={<JobList />} />
                  <Route path="/jobs/:id" element={<JobDetailsPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dashboard/seeker" element={<DashboardSeeker />} />
                  <Route path="/dashboard/employer" element={<DashboardEmployer />} />
                  <Route path="*" element={<p className="p-6">Page Not Found</p>} />
                </Routes>
              </div>
              <Footer />
            </div>
          </AIProvider>
        </JobProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
