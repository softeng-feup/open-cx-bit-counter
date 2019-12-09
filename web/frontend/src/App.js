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
  let handleKeyChanger = function (newKey) {
    this.adminKey = newKey;
  }
  var adminKeyObject = {
    key: '',
    keyHandler: handleKeyChanger
  };

  adminKeyObject.keyHandler.bind(adminKeyObject);

  return (
    <>
      <Header keyObject={adminKeyObject}/>
      <div className="container main-container">
        <Router>
          <Route path='/'
              render={(props) => <Home {...props} keyObject={adminKeyObject} />}/>
        </Router>
      </div>
      <Footer />
    </>
  );
}
export default App;
