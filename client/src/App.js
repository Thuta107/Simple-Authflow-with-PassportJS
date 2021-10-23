import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom"
import './App.css';

// Components
import Home from './auth/home'
import Login from './auth/login'
import Private from './auth/private'
import SignUp from './auth/signup'
import { ProvideAuth } from "./auth/auth";
import Logout from "./auth/logout";
import ForgotPassword from "./auth/forgotPassword";
import ResetPassword from "./auth/resetPassword";


function App() {
  return (
    <ProvideAuth>
      <Router>
        <ul>
          <li> <Link to="/login"> Login </Link> </li>
          <li> <Link to="/signup"> Register </Link> </li>
          <li> <Link to="/"> Home </Link> </li>
          <li> <Link to="/private"> Private </Link> </li>
          <li> <Link to="/logout"> Logout </Link> </li>
        </ul>
        <Switch>
          <Route path="/login"> <Login /> </Route>
          <Route path="/signup"> <SignUp /> </Route>
          <Route path="/private"> <Private /> </Route>
          <Route path="/logout"> <Logout /> </Route>
          <Route path="/forgot"> <ForgotPassword /> </Route>
          <Route path="/reset/:userId/:token"> <ResetPassword /> </Route>
          <Route exact path="/"> <Home /> </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
