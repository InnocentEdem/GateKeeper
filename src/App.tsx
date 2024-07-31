
import './App.css'

import Layout from './layout/Layout';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './pages/Signup';
import Login from './pages/Login';


function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
