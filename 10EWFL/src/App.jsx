import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/SignIn/SignIn';
import RegistrationForm from './components/SignUp/SignUp';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import AboutUs from './components/Aboutus/Aboutus';
import RecycleCenter from './components/Recycle/Recycle';
import Smartphone from './components/Phone/Phone';
import Laptop from './components/Pc/Pc';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<Login />} />
          <Route path="/SignUp" element={<RegistrationForm />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/recycle" element={<RecycleCenter />}>
          <Route path="/recycle/smartphone" element={<Smartphone />} />
          <Route path="/recycle/laptop" element={<Laptop />} />
          </Route>
          {/* Define other routes here */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
