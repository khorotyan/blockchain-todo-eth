import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tasks from './components/Tasks';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Tasks} />
      </Switch>
    </Router>
  );
};

export default App;