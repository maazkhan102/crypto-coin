import './App.css'
import Footer from './components/Footer/Footer'
import Navbar from './components/CustomNavbar/CustomNavbar'
import Home from './pages/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Protected from './components/Protected/Protected'
import Login from './pages/Login/Login';

function App() {
  const isAuth = false;
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route
              path="/"
              exact
              element={<Home />}
            />
            <Route
              path="crypto"
              exact
              element={<div>Crypto Page</div>}
            />
            <Route
              path="blogs"
              exact
              element={
              <Protected isAuth={isAuth}>
              <div>Blogs Page</div>
              </Protected>
              }
            />
            <Route
              path="submit"
              exact
              element={
              <Protected isAuth={isAuth}>
              <div>Submit a blog page</div>
              </Protected>
              }
            />
            <Route
              path="signup"
              exact
              element={<div>Sign Up</div>}
            />
            <Route
              path="/login"
              exact
              element={<Login />}
            />
            <Route
              path="logout"
              exact
              element={<div>Logout</div>}
            />
            <Route
              path="*"
              exact
              element={<div>OOPS! Page Not Found</div>}
            />  
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
