import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

// import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import UploadResume from './pages/UploadResume'
import ResumeAnalysis  from './pages/ResumeAnalysis'
import MockInterview from './pages/MockInterview'
import MyResumes from './pages/MyResumes'
import ResumeBuilder from './pages/ResumeBuilder'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from "./components/Footer";
import Chatbot from './components/Chatbot';

function AppContent() {
  const location = useLocation()
  const isAuthPage = ['/', '/login', '/register'].includes(location.pathname)

  return (
    <>

      <Routes>

        {/* <Route path="/" element={<Home />} /> */}

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/upload-resume" element={
          <ProtectedRoute>
            <UploadResume />
          </ProtectedRoute>
        } />
        <Route path="/resume-analysis" element={
          <ProtectedRoute>
            <ResumeAnalysis />
          </ProtectedRoute>
        } />
        <Route path="/mock-interview" element={
          <ProtectedRoute>
            <MockInterview />
          </ProtectedRoute>
        } />
        <Route path="/my-resumes" element={
          <ProtectedRoute>
            <MyResumes />
          </ProtectedRoute>
        } />
        <Route path="/resume-builder" element={
          <ProtectedRoute>
            <ResumeBuilder />
          </ProtectedRoute>
        } />
      </Routes>
      {!isAuthPage && (
        <>
          <Chatbot />
          <Footer />
        </>
      )}

    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
