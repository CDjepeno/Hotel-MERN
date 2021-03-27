
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import Home from './pages/home';
import { Rooms } from './pages/Rooms';

const App : React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/rooms' component={Rooms} />
        <Route path='/contact' component={Contact} />
        <Route path='/about' component={About} />
      </Switch>
    </Router>
  );
}

export default App;
