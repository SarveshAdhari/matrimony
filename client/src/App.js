import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Landing, Register, Error, ProtectedRoutes } from './pages'
import { MainPage, Profile, SharedLayout } from './pages/dashboard';

import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <SharedLayout />
          </ProtectedRoutes>
        }>
          <Route path="profile" element={<Profile />} />
          <Route path="main" element={<MainPage />} />
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
