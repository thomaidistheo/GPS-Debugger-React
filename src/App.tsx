import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Debugger from './pages/Debugger/Debugger'
import Login from './pages/Login/Login'
import React from 'react'
import { auth } from './firebase'
import { User } from 'firebase/auth'


function App() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate replace to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={user ? <Debugger /> : <Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

