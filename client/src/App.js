import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Landing, MainPage, Profile, Register, Error } from './pages'

import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
