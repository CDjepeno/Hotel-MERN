import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CDLayout from './components/CDLayout';
import { PrivateRouteAll } from './components/PrivateRouteAll';
import { PrivateRouteManager } from './components/PrivateRouteManager';
import AuthContext from './context/AuthContext';
import { About } from './pages/About';
import AddRoom from './pages/AddRoom';
import { Contact } from './pages/Contact';
import Home from './pages/home';
import { PageNotFound } from './pages/PageNotFound';
import { Register } from './pages/Register';
import { Room } from './pages/Room';
import { Rooms } from './pages/Rooms';
import AuthenticationService from './services/authAPI';

const App : React.FC = () => {
  const [isAuthenticatedManager, setIsAuthenticatedManager] = useState(AuthenticationService.isAuthenticatedManager())
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(AuthenticationService.isAuthenticatedUser())

  const contextValue = {
    isAuthenticatedUser,
    setIsAuthenticatedUser,
    isAuthenticatedManager,
    setIsAuthenticatedManager
  }

  return (
    <AuthContext.Provider value={contextValue}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <PrivateRouteAll path='/rooms/:id' component={Room} />
          <PrivateRouteAll path='/rooms' component={Rooms} />
          <Route path='/contact' component={Contact} />
          <Route path='/about' component={About} />
          <PrivateRouteManager path='/addRoom' component={AddRoom} />
          <Route path='/Layout' component={CDLayout} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
