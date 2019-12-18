import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MdState from './context/md/MdState';
import AuthState from './context/auth/AuthState';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';

const mainAppStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '100vh',
  maxWidth: '100vw'
};

const App = () => {
  return (
    <AuthState>
      <MdState>
        <Router>
          <div className="App" style={mainAppStyle}>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home}  />
              <Route exact path="/register" component={Register}  />
            </Switch>
          </div>
        </Router>
      </MdState>
    </AuthState>
  );
};

export default App;
