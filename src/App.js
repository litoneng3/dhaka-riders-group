// At first I am really very very sorry for creating my own repository. I have some problem in the repository that provided by the programming hero team. At the beginning i push my code in that private repository, but when there is a problem with deployment, i tried to solve this problem by deleting the firebase file and mistakenly i deleted the src folder. I created another react project and create another repository. Please consider this . 

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";




import { createContext, useState } from 'react';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import VehicleDetail from './components/VehicleDetail/VehicleDetail';



 export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] =useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/vehicle/:title">
            <VehicleDetail></VehicleDetail>
          </PrivateRoute>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
