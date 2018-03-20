import React, { Component } from 'react';
import './App.css';
import './reset.css';
import routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='mainbody'>
          {routes}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
