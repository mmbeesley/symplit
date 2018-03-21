import React, { Component } from 'react';
import './App.css';
import './reset.css';
import routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="belowHeader">
          <NavBar />
          <div className="rightNav">
            <div className='mainbody'>
              {routes}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
