import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


import Home from "./components/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";



function App() {
  return (
    <>
      <Header />
      <div className="container main-container">
        <Router>
          <Route path="/" component={Home} />
        </Router>
      </div>
      <Footer />
    </>
  );
}
export default App;
