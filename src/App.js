import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/alert/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';

import TodoState from './context/todo/TodoState';
import AlertState from './context/alert/AlertState';

const App = () => {
  return (
    <AlertState>
      <TodoState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </TodoState>
    </AlertState>
  );
}

export default App;
