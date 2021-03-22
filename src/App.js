import { createContext, useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Home/Header/Header';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import OrderPage from './Components/OrderPage/OrderPage';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
export const UserContext = createContext();
export const VehicleContext = createContext();

function App() {

  const [selection, setSelection] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <VehicleContext.Provider value={[selection, setSelection]}>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Switch>
            <PrivateRoute path="/destination">
              <OrderPage></OrderPage>
            </PrivateRoute>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </VehicleContext.Provider>
  );
}

export default App;
