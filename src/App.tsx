import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Debugger from './pages/Debugger/Debugger'
import Login from './pages/Login/Login'
import React, { useState } from 'react'
import { auth } from './firebase'
import { User } from 'firebase/auth'
import styles from './pages/Debugger/Debugger.module.scss';
import loadingGif from './assets/loading-ripple.gif';
import LoadingScreen from './components/Loading/LoadingScreen'


function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoading(false)
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {isLoading 
      ? <LoadingScreen />
      : <Router>
          <Routes>
            <Route path="/" element={user ? <Navigate replace to="/dashboard" /> : <Login />} />
            <Route path="/dashboard" element={user ? <Debugger /> : <Navigate replace to="/" />} />
          </Routes>
        </Router>
      }
    </>
  );
}

export default App;

