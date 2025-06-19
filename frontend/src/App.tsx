import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/signup';
import { SignIn } from './pages/signin';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import ProtectedRoute from './components/ProtectedRoute';
import { MyContent } from './pages/mycontent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mycontent" 
          element={
            <ProtectedRoute>
              <MyContent />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<SignIn/>} />
      </Routes>
    </Router>
  );
}

export default App;