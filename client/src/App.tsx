import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { About } from './pages/About';
import AddRoom from './pages/AddRoom';
import { Contact } from './pages/Contact';
import Home from './pages/home';
import { PageNotFound } from './pages/PageNotFound';
import { Register } from './pages/Register';
import { Room } from './pages/Room';
import { Rooms } from './pages/Rooms';

const App : React.FC = () => {
  const [isAuthenticated]
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/rooms' component={Rooms} />
        <Route path='/rooms/:id' component={Room} />
        <Route path='/contact' component={Contact} />
        <Route path='/about' component={About} />
        <Route path='/addRoom' component={AddRoom} />
        <Route path='/update' component={AddRoom} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
