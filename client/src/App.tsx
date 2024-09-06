import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './scenes/auth/AuthPage';
import HomePage from './scenes/homePage/HomePage';
import { useAppSelector } from './state/hooks';

function App() {

  const isAuth = Boolean(useAppSelector((state) => state.auth.token));
  const isAdmin = Boolean(useAppSelector((state) => state.auth.isAdmin));

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path='/home' element={isAuth ? <HomePage /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
